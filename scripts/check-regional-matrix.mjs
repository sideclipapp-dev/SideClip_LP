import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { JSDOM } from "jsdom";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const regionalSource = await readFile(path.join(repoRoot, "regional-pricing.js"), "utf8");
const appSource = await readFile(path.join(repoRoot, "app.js"), "utf8");
const markets = {
  jp: {
    currency: "JPY",
    prices: {
      pro_monthly: { amount_minor: 300, currency: "JPY" },
      pro_yearly: { amount_minor: 2400, currency: "JPY" },
      ultra_monthly: { amount_minor: 480, currency: "JPY" },
      ultra_yearly: { amount_minor: 3600, currency: "JPY" }
    }
  },
  global: {
    currency: "USD",
    prices: {
      pro_monthly: { amount_minor: 299, currency: "USD" },
      pro_yearly: { amount_minor: 2399, currency: "USD" },
      ultra_monthly: { amount_minor: 499, currency: "USD" },
      ultra_yearly: { amount_minor: 3999, currency: "USD" }
    }
  }
};

const cases = [];
for (const lang of ["en", "ja"]) {
  for (const market of ["global", "jp"]) {
    for (const viewport of ["desktop", "mobile"]) cases.push({ lang, market, viewport });
  }
}

function expectedMonthly(lang, market, plan) {
  const values = plan === "pro" ? { global: "$2.99", jp: "¥300" } : { global: "$4.99", jp: "¥480" };
  if (market === "global" || lang === "ja") return values[market];
  return plan === "pro" ? "JPY 300" : "JPY 480";
}

async function settle(window) {
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  await window.SideClipRegionalPricing.apply();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
}

async function createDom(file, url, testCase, includeApp, options = {}) {
  const html = await readFile(path.join(repoRoot, file), "utf8");
  const dom = new JSDOM(html, { url, runScripts: "outside-only", pretendToBeVisual: true });
  const { window } = dom;
  Object.defineProperty(window, "innerWidth", { configurable: true, value: testCase.viewport === "mobile" ? 390 : 1440 });
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0);
  if (options.cache) window.localStorage.setItem("sideclip_lp_billing_market_v1", JSON.stringify(options.cache));
  if (options.legacyPreference) window.localStorage.setItem("sideclip_lp_billing_market_preference_v1", options.legacyPreference);
  window.fetch = options.fetchReject
    ? async () => { throw new Error("simulated billing API failure"); }
    : async () => ({
      ok: true,
      json: async () => ({
        billing_market: testCase.market,
        billing_currency: markets[testCase.market].currency,
        billing_country_source: "cloudflare",
        prices: markets[testCase.market].prices
      })
    });
  window.gtag = () => {};
  if (includeApp) {
    window.__SIDECLIP_PRERENDER__ = true;
    window.eval(appSource);
  }
  window.eval(regionalSource);
  const pendingAtStart = window.document.documentElement.classList.contains("pricing-region-pending");
  window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true }));
  await settle(window);
  return { dom, pendingAtStart };
}

function assertNoCurrencySwitch(document, label) {
  const controls = document.querySelector("[data-regional-currency-switch]");
  if (controls) throw new Error(`${label}: users must not be able to switch billing currency.`);
}

function assertRegionalOffers(offers, label) {
  if (!Array.isArray(offers) || offers.length !== 6) {
    throw new Error(`${label}: expected six region-qualified structured offers.`);
  }
  const yenOffers = offers.filter((offer) => offer.priceCurrency === "JPY");
  const dollarOffers = offers.filter((offer) => offer.priceCurrency === "USD");
  if (yenOffers.length !== 3 || dollarOffers.length !== 3) {
    throw new Error(`${label}: structured offers must contain three JPY and three USD plans.`);
  }
  if (!yenOffers.every((offer) => offer.eligibleRegion?.name === "JP")) {
    throw new Error(`${label}: JPY offers are not restricted to Japan.`);
  }
  if (!dollarOffers.every((offer) => offer.ineligibleRegion?.name === "JP")) {
    throw new Error(`${label}: USD offers do not exclude Japan.`);
  }
}

function assertResolvedUi(window, label, pendingAtStart) {
  if (!pendingAtStart) throw new Error(`${label}: pricing skeleton was not active before region resolution.`);
  if (window.document.documentElement.classList.contains("pricing-region-pending")) {
    throw new Error(`${label}: pricing skeleton remained after region resolution.`);
  }
  const busyRegion = window.document.querySelector('[data-regional-pricing-region][aria-busy="true"]');
  if (busyRegion) throw new Error(`${label}: resolved pricing region is still marked busy.`);
}

function assertLanding(document, testCase) {
  const label = `landing ${testCase.lang}/${testCase.market}/${testCase.viewport}`;
  const cards = document.querySelectorAll(".ja-pricing__card");
  if (cards.length < 3) throw new Error(`${label}: plan cards are missing.`);
  const pro = cards[1].querySelector(".ja-pricing__price")?.textContent || "";
  const ultra = cards[2].querySelector(".ja-pricing__price")?.textContent || "";
  if (!pro.includes(expectedMonthly(testCase.lang, testCase.market, "pro"))) throw new Error(`${label}: wrong Pro price: ${pro}`);
  if (!ultra.includes(expectedMonthly(testCase.lang, testCase.market, "ultra"))) throw new Error(`${label}: wrong Ultra price: ${ultra}`);
  assertNoCurrencySwitch(document, label);

  const software = JSON.parse(document.querySelector('[data-sideclip-structured-data="software"]')?.textContent || "null");
  assertRegionalOffers(software?.offers, label);
}

function assertPlans(document, testCase) {
  const label = `plans ${testCase.lang}/${testCase.market}/${testCase.viewport}`;
  const section = document.getElementById("pricing-heading")?.closest("section");
  const cards = Array.from(section?.querySelectorAll("article") || []);
  const pro = cards.find((card) => card.querySelector("h3")?.textContent.trim() === "Pro");
  const ultra = cards.find((card) => card.querySelector("h3")?.textContent.trim() === "Ultra");
  const proText = pro?.querySelector("span.text-3xl")?.textContent || "";
  const ultraText = ultra?.querySelector("span.text-3xl")?.textContent || "";
  if (!proText.includes(expectedMonthly(testCase.lang, testCase.market, "pro"))) throw new Error(`${label}: wrong Pro price: ${proText}`);
  if (!ultraText.includes(expectedMonthly(testCase.lang, testCase.market, "ultra"))) throw new Error(`${label}: wrong Ultra price: ${ultraText}`);
  assertNoCurrencySwitch(document, label);

  const priceRow = Array.from(document.querySelectorAll("table tbody tr")).find((row) => /^(料金|price)$/i.test(row.querySelector("th")?.textContent.trim() || ""));
  const rowText = priceRow?.textContent || "";
  if (!rowText.includes(expectedMonthly(testCase.lang, testCase.market, "pro"))) throw new Error(`${label}: comparison table has the wrong currency.`);

  const catalog = JSON.parse(document.querySelector('[data-sideclip-structured-data="plans"]')?.textContent || "null");
  assertRegionalOffers(catalog?.itemListElement, label);
}

for (const testCase of cases) {
  const landingFile = testCase.lang === "ja" ? "ja/index.html" : "index.html";
  const landingPath = testCase.lang === "ja" ? "/ja/" : "/";
  const landingResult = await createDom(landingFile, `https://sideclip.app${landingPath}`, testCase, true, { legacyPreference: "jp" });
  assertLanding(landingResult.dom.window.document, testCase);
  assertResolvedUi(landingResult.dom.window, `landing ${testCase.lang}/${testCase.market}/${testCase.viewport}`, landingResult.pendingAtStart);
  if (landingResult.dom.window.SideClipRegionalPricing.getResolutionSource() !== "api_cloudflare") {
    throw new Error("Landing pricing did not record the Cloudflare API resolution source.");
  }
  if (landingResult.dom.window.localStorage.getItem("sideclip_lp_billing_market_preference_v1") !== null) {
    throw new Error("Legacy billing-market preference was not removed.");
  }
  landingResult.dom.window.close();

  const plansFile = testCase.lang === "ja" ? "ja/plans/index.html" : "plans/index.html";
  const plansPath = testCase.lang === "ja" ? "/ja/plans/" : "/plans/";
  const plansResult = await createDom(plansFile, `https://sideclip.app${plansPath}`, testCase, false);
  assertPlans(plansResult.dom.window.document, testCase);
  assertResolvedUi(plansResult.dom.window, `plans ${testCase.lang}/${testCase.market}/${testCase.viewport}`, plansResult.pendingAtStart);
  plansResult.dom.window.close();
}

const cachedGlobal = {
  market: "global",
  catalog: {
    market: "global",
    currency: "USD",
    prices: { pro_monthly: 2.99, pro_yearly: 23.99, ultra_monthly: 4.99, ultra_yearly: 39.99 }
  }
};

for (const scenario of [
  { name: "fresh cache", savedAt: Date.now() - 30 * 60 * 1000, source: "cache_fresh" },
  { name: "stale cache", savedAt: Date.now() - 2 * 60 * 60 * 1000, source: "cache_stale" }
]) {
  const result = await createDom("index.html", "https://sideclip.app/", { lang: "en", market: "global", viewport: "desktop" }, true, {
    fetchReject: true,
    cache: { ...cachedGlobal, savedAt: scenario.savedAt }
  });
  if (result.dom.window.SideClipRegionalPricing.getResolutionSource() !== scenario.source) {
    throw new Error(`${scenario.name}: wrong resolution source.`);
  }
  result.dom.window.close();
}

const fallbackResult = await createDom("index.html", "https://sideclip.app/", { lang: "en", market: "global", viewport: "desktop" }, true, { fetchReject: true });
if (fallbackResult.dom.window.SideClipRegionalPricing.getResolutionSource() !== "timezone_fallback") {
  throw new Error("API failure without cache did not use the timezone fallback.");
}
fallbackResult.dom.window.close();

console.log(`Regional pricing matrix passed: ${cases.length} language/market/viewport combinations across landing and plans pages.`);
