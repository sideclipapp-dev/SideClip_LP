(function () {
  "use strict";

  const BILLING_MARKET_URL = "https://sideclip-billing.sideclip-app.workers.dev/api/billing-market?client=sideclip-lp";
  const CACHE_KEY = "sideclip_lp_billing_market_v1";
  const LEGACY_PREFERENCE_KEY = "sideclip_lp_billing_market_preference_v1";
  const PENDING_STYLE_ID = "sideclip-regional-pricing-pending-style";
  const CACHE_TTL_MS = 60 * 60 * 1000;
  const CATALOGS = {
    jp: {
      market: "jp",
      currency: "JPY",
      prices: { pro_monthly: 300, pro_yearly: 2400, ultra_monthly: 480, ultra_yearly: 3600 }
    },
    global: {
      market: "global",
      currency: "USD",
      prices: { pro_monthly: 2.99, pro_yearly: 23.99, ultra_monthly: 4.99, ultra_yearly: 39.99 }
    }
  };

  let catalog = null;
  let resolvePromise = null;
  let observerQueued = false;
  let trackedMarket = "";
  let structuredMarket = "";
  let resolutionSource = "pending";

  document.documentElement.classList.add("pricing-region-pending");

  function ensurePendingStyles() {
    if (document.getElementById(PENDING_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = PENDING_STYLE_ID;
    style.textContent = `
      @keyframes sideclip-price-pending { from { background-position: 100% 0; } to { background-position: -100% 0; } }
      html.pricing-region-pending .ja-pricing__price,
      html.pricing-region-pending .ja-pricing__daily:not(.ja-pricing__daily--empty),
      html.pricing-region-pending .faq__plan-price,
      html.pricing-region-pending [data-plan-tier] span.text-3xl,
      html.pricing-region-pending [data-plan-tier] > p.text-sc-primary,
      html.pricing-region-pending table tbody tr:first-child td {
        position: relative;
        color: transparent !important;
        text-shadow: none !important;
      }
      html.pricing-region-pending .ja-pricing__price *,
      html.pricing-region-pending .ja-pricing__daily *,
      html.pricing-region-pending [data-plan-tier] span.text-3xl * {
        color: transparent !important;
      }
      html.pricing-region-pending .ja-pricing__price::after,
      html.pricing-region-pending .ja-pricing__daily:not(.ja-pricing__daily--empty)::after,
      html.pricing-region-pending .faq__plan-price::after,
      html.pricing-region-pending [data-plan-tier] span.text-3xl::after,
      html.pricing-region-pending [data-plan-tier] > p.text-sc-primary::after,
      html.pricing-region-pending table tbody tr:first-child td::after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: min(82%, 9rem);
        height: .78em;
        border-radius: 5px;
        background: linear-gradient(90deg, #edf1f5 20%, #f8fafc 45%, #edf1f5 70%);
        background-size: 220% 100%;
        transform: translateY(-50%);
        animation: sideclip-price-pending 1.15s linear infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        html.pricing-region-pending .ja-pricing__price::after,
        html.pricing-region-pending .ja-pricing__daily:not(.ja-pricing__daily--empty)::after,
        html.pricing-region-pending .faq__plan-price::after,
        html.pricing-region-pending [data-plan-tier] span.text-3xl::after,
        html.pricing-region-pending [data-plan-tier] > p.text-sc-primary::after,
        html.pricing-region-pending table tbody tr:first-child td::after { animation: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function clearLegacyPreference() {
    try {
      window.localStorage.removeItem(LEGACY_PREFERENCE_KEY);
    } catch (_) {
      /* Ignore storage restrictions; the legacy preference is no longer read. */
    }
  }

  ensurePendingStyles();
  clearLegacyPreference();

  function pageLanguage() {
    return String(document.documentElement.lang || "en").toLowerCase().startsWith("ja") ? "ja" : "en";
  }

  function localOverride() {
    if (!/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) return "";
    const requested = new URLSearchParams(window.location.search).get("billing_market");
    return requested === "jp" || requested === "global" ? requested : "";
  }

  function fallbackMarket() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Tokyo" ? "jp" : "global";
    } catch (_) {
      return "global";
    }
  }

  function readCache(allowStale = false) {
    try {
      const value = JSON.parse(window.localStorage.getItem(CACHE_KEY) || "null");
      if (!value || (!allowStale && Date.now() - Number(value.savedAt || 0) > CACHE_TTL_MS)) return null;
      const base = value.market === "global" ? CATALOGS.global : CATALOGS.jp;
      return value.catalog && value.catalog.currency === base.currency
        ? { market: base.market, currency: base.currency, prices: { ...base.prices, ...value.catalog.prices } }
        : base;
    } catch (_) {
      return null;
    }
  }

  function writeCache(resolvedCatalog) {
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify({
        market: resolvedCatalog.market,
        catalog: resolvedCatalog,
        savedAt: Date.now()
      }));
    } catch (_) {
      /* Pricing still works when local storage is unavailable. */
    }
  }

  function catalogFromResponse(data) {
    const market = data && data.billing_market === "global" && data.billing_currency === "USD" ? "global" : "jp";
    const base = CATALOGS[market];
    const divisor = base.currency === "USD" ? 100 : 1;
    const prices = {};

    Object.keys(base.prices).forEach((key) => {
      const item = data && data.prices && data.prices[key];
      const amountMinor = Number(item && item.amount_minor);
      prices[key] = item && item.currency === base.currency && Number.isFinite(amountMinor) && amountMinor > 0
        ? amountMinor / divisor
        : base.prices[key];
    });
    return { market, currency: base.currency, prices };
  }

  async function resolveCatalog() {
    if (catalog) return catalog;
    if (resolvePromise) return resolvePromise;

    resolvePromise = (async () => {
      const override = localOverride();
      if (override) {
        resolutionSource = "local_override";
        writeCache(CATALOGS[override]);
        return CATALOGS[override];
      }
      const cached = readCache();
      if (cached) {
        resolutionSource = "cache_fresh";
        return cached;
      }

      try {
        const response = await fetch(BILLING_MARKET_URL, {
          method: "GET",
          mode: "cors",
          credentials: "omit",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error(`Billing market request failed: ${response.status}`);
        const data = await response.json();
        const resolved = catalogFromResponse(data);
        const apiSource = String(data?.billing_country_source || "").replace(/[^a-z0-9_-]/gi, "").toLowerCase();
        resolutionSource = apiSource ? `api_${apiSource}` : "api";
        writeCache(resolved);
        return resolved;
      } catch (_) {
        const stale = readCache(true);
        if (stale) {
          resolutionSource = "cache_stale";
          return stale;
        }
        resolutionSource = "timezone_fallback";
        return CATALOGS[fallbackMarket()];
      }
    })();

    catalog = await resolvePromise;
    return catalog;
  }

  function yen(value) {
    return `¥${Math.round(value).toLocaleString("ja-JP")}`;
  }

  function usd(value) {
    return `$${Number(value).toFixed(2)}`;
  }

  function money(value, lang) {
    if (catalog.currency === "USD") return usd(value);
    return lang === "ja" ? yen(value) : `JPY ${Math.round(value).toLocaleString("en-US")}`;
  }

  function monthlyEquivalent(plan) {
    return catalog.prices[`${plan}_yearly`] / 12;
  }

  function dailyEquivalent(plan) {
    return catalog.prices[`${plan}_yearly`] / 365;
  }

  function dailyText(plan, lang) {
    if (catalog.currency === "JPY") {
      return lang === "ja"
        ? `1日あたり約${yen(dailyEquivalent(plan))}※`
        : `about ${money(dailyEquivalent(plan), lang)}/day*`;
    }
    return lang === "ja"
      ? `1日あたり約${usd(dailyEquivalent(plan))}※`
      : `about ${usd(dailyEquivalent(plan))}/day*`;
  }

  function monthlyEquivalentText(plan, lang) {
    if (catalog.currency === "JPY") {
      return lang === "ja"
        ? `月あたり${yen(monthlyEquivalent(plan))}`
        : `${money(monthlyEquivalent(plan), lang)}/month`;
    }
    return lang === "ja"
      ? `月あたり約${usd(monthlyEquivalent(plan))}`
      : `about ${usd(monthlyEquivalent(plan))}/month`;
  }

  function setHtml(element, value) {
    if (!element) return;
    element.dataset.regionalPrice = "";
    if (element.innerHTML !== value) element.innerHTML = value;
  }

  function setText(element, value) {
    if (!element) return;
    element.dataset.regionalPrice = "";
    if (element.textContent !== value) element.textContent = value;
  }

  function marketNotice(lang) {
    if (catalog.currency === "JPY") {
      return lang === "ja"
        ? "日本からのアクセスには日本円（JPY）価格を表示しています。最終的な通貨と金額はSideClipアプリ内でご確認ください。"
        : "Prices for access from Japan are shown in Japanese yen (JPY). Confirm the final currency and amount in the SideClip app.";
    }
    return lang === "ja"
      ? "日本以外からのアクセスには米ドル（USD）価格を表示しています。最終的な通貨と金額はSideClipアプリ内でご確認ください。"
      : "Prices for access outside Japan are shown in US dollars (USD). Confirm the final currency and amount in the SideClip app.";
  }

  function landingMonthly(plan, lang) {
    const amount = money(catalog.prices[`${plan}_monthly`], lang);
    return lang === "ja" ? `${amount}<span>/月</span>` : `${amount}<span>/month</span>`;
  }

  function landingAnnual(plan, lang) {
    const annual = money(catalog.prices[`${plan}_yearly`], lang);
    const details = `${monthlyEquivalentText(plan, lang)}・${dailyText(plan, lang)}`;
    return lang === "ja"
      ? `年額プラン ${annual}<span>${details}</span>`
      : `Annual plan ${annual}<span>${details.replace("・", " · ")}</span>`;
  }

  function updateFaq(lang) {
    document.querySelectorAll(".faq__plan").forEach((planBlock) => {
      const name = planBlock.querySelector("dt")?.textContent.toLowerCase() || "";
      const plan = name.includes("ultra") ? "ultra" : name.includes("pro") ? "pro" : "";
      if (!plan) return;

      const monthly = money(catalog.prices[`${plan}_monthly`], lang);
      const yearly = money(catalog.prices[`${plan}_yearly`], lang);
      setHtml(
        planBlock.querySelector(".faq__plan-price"),
        lang === "ja"
          ? `月額プラン：${monthly}<br />年額プラン：${yearly}`
          : `Monthly plan: ${monthly}<br />Annual plan: ${yearly}`,
      );

      const dd = planBlock.querySelector("dd");
      const trailingText = dd && Array.from(dd.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (trailingText) {
        const detail = lang === "ja"
          ? `年額プランなら${dailyText(plan, lang).replace("※", "")}です。`
          : `The annual plan works out to ${dailyText(plan, lang).replace("*", "")}.`;
        if (trailingText.nodeValue.trim() !== detail) trailingText.nodeValue = `\n                          ${detail}\n                        `;
        dd.dataset.regionalPrice = "";
      }
    });
  }

  function updateLanding(lang) {
    const cards = document.querySelectorAll(".ja-pricing__card");
    if (cards.length < 3) return;

    setText(cards[0].querySelector(".ja-pricing__price"), lang === "ja" ? (catalog.currency === "USD" ? "$0" : "¥0") : (catalog.currency === "USD" ? "$0" : "JPY 0"));
    setHtml(cards[1].querySelector(".ja-pricing__price"), landingMonthly("pro", lang));
    setHtml(cards[1].querySelector(".ja-pricing__daily"), landingAnnual("pro", lang));
    setHtml(cards[2].querySelector(".ja-pricing__price"), landingMonthly("ultra", lang));
    setHtml(cards[2].querySelector(".ja-pricing__daily"), landingAnnual("ultra", lang));

    const note = document.querySelector(".ja-pricing__billing-note");
    if (note) {
      const calculation = lang === "ja"
        ? "※日額は年額料金÷365日の目安です。請求は年額です。"
        : "*Daily prices are annual prices divided by 365. Annual plans are billed yearly.";
      const faqGuide = lang === "ja" ? "料金の詳細はFAQをご覧ください。" : "See the FAQ for pricing details.";
      setHtml(note, `<span>${calculation}</span><span>${faqGuide} ${marketNotice(lang)}</span>`);
    }
    updateFaq(lang);
  }

  function findPlanCard(section, name) {
    return Array.from(section?.querySelectorAll("article") || []).find((article) => article.querySelector("h3")?.textContent.trim() === name);
  }

  function planCardMonthly(plan, lang) {
    const amount = money(catalog.prices[`${plan}_monthly`], lang);
    return lang === "en" ? amount : `${amount}/月`;
  }

  function planCardAnnual(plan, lang) {
    const annual = money(catalog.prices[`${plan}_yearly`], lang);
    const monthly = monthlyEquivalentText(plan, lang);
    return lang === "ja" ? `年額 ${annual}（${monthly}）` : `${annual}/year (${monthly})`;
  }

  function updatePlansPage(lang) {
    const pricingSection = document.getElementById("pricing-heading")?.closest("section");
    if (!pricingSection) return;

    const freeCard = findPlanCard(pricingSection, "Free");
    setText(freeCard?.querySelector("span.text-3xl"), lang === "ja" ? (catalog.currency === "USD" ? "$0" : "¥0") : (catalog.currency === "USD" ? "$0" : "JPY 0"));
    const freeAnnualLine = Array.from(freeCard?.querySelectorAll("p") || []).find((element) => element.className.includes("text-sc-primary") && /(?:年額|year|JPY|\$)/i.test(element.textContent));
    setText(
      freeAnnualLine,
      lang === "ja"
        ? (catalog.currency === "USD" ? "年額 $0" : "年額 ¥0")
        : (catalog.currency === "USD" ? "$0/year" : "JPY 0/year")
    );

    ["pro", "ultra"].forEach((plan) => {
      const card = findPlanCard(pricingSection, plan === "pro" ? "Pro" : "Ultra");
      if (!card) return;
      const priceWrap = Array.from(card.querySelectorAll("div")).find((element) => element.querySelector(":scope > span.text-3xl"));
      setText(priceWrap?.querySelector(":scope > span.text-3xl"), planCardMonthly(plan, lang));
      const annualLine = Array.from(card.querySelectorAll("p")).find((element) => element.className.includes("text-sc-primary") && /(?:年額|year|JPY|\$)/i.test(element.textContent));
      setText(annualLine, planCardAnnual(plan, lang));
    });

    let notice = pricingSection.querySelector("[data-regional-market-notice]");
    if (!notice) {
      notice = document.createElement("p");
      notice.dataset.regionalMarketNotice = "";
      notice.style.margin = "12px 0 0";
      notice.style.color = "#6e6e73";
      notice.style.fontSize = "12px";
      notice.style.lineHeight = "1.6";
      pricingSection.querySelector(".mx-auto")?.appendChild(notice);
    }
    setText(notice, marketNotice(lang));

    const priceRow = Array.from(document.querySelectorAll("table tbody tr")).find((row) => {
      const label = row.querySelector("th")?.textContent.trim().toLowerCase();
      return label === "料金" || label === "price";
    });
    if (priceRow) {
      const cells = priceRow.querySelectorAll("td");
      const proMonthly = money(catalog.prices.pro_monthly, lang);
      const proYearly = money(catalog.prices.pro_yearly, lang);
      const ultraMonthly = money(catalog.prices.ultra_monthly, lang);
      const ultraYearly = money(catalog.prices.ultra_yearly, lang);
      setText(cells[0], catalog.currency === "USD" ? "$0" : lang === "ja" ? "¥0" : "JPY 0");
      setText(cells[1], lang === "ja" ? `${proMonthly}/月\n${proYearly}/年` : `${proMonthly}/month\n${proYearly}/year`);
      setText(cells[2], lang === "ja" ? `${ultraMonthly}/月\n${ultraYearly}/年` : `${ultraMonthly}/month\n${ultraYearly}/year`);
    }
  }

  function trackMarket() {
    if (!catalog || trackedMarket === catalog.market || typeof window.gtag !== "function") return;
    window.gtag("event", "pricing_market_view", {
      billing_market: catalog.market,
      billing_currency: catalog.currency,
      pricing_resolution_source: resolutionSource,
      page_path: window.location.pathname,
      transport_type: "beacon"
    });
    window.gtag("set", { billing_market: catalog.market, billing_currency: catalog.currency });
    window.gtag("set", "user_properties", { billing_market: catalog.market, billing_currency: catalog.currency });
    trackedMarket = catalog.market;
  }

  function apply() {
    if (!catalog) return resolveCatalog().then(apply);
    const lang = pageLanguage();
    document.documentElement.dataset.billingMarket = catalog.market;
    updateLanding(lang);
    updatePlansPage(lang);
    const nextStructuredMarket = `${lang}:${catalog.market}`;
    if (structuredMarket !== nextStructuredMarket) {
      window.SideClipLandingPrerender?.syncStructuredData?.(document.querySelector("#root"));
      structuredMarket = nextStructuredMarket;
    }
    document.documentElement.classList.remove("pricing-region-pending");
    document.querySelectorAll("[data-regional-pricing-region]").forEach((region) => region.setAttribute("aria-busy", "false"));
    trackMarket();
  }

  window.SideClipRegionalPricing = {
    apply,
    getMarket: () => catalog?.market || null,
    getResolutionSource: () => resolutionSource
  };

  function activate() {
    const landingPricing = document.querySelector(".ja-pricing");
    const plansPricing = document.getElementById("pricing-heading")?.closest("section");
    [landingPricing, plansPricing].filter(Boolean).forEach((region) => {
      region.dataset.regionalPricingRegion = "";
      region.setAttribute("aria-busy", "true");
    });
    apply();
    const observer = new MutationObserver(() => {
      if (observerQueued) return;
      observerQueued = true;
      window.requestAnimationFrame(() => {
        observerQueued = false;
        apply();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 7000);
  }

  function start() {
    activate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
