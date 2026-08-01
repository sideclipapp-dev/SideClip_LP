import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { JSDOM } from "jsdom";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const enhanceSource = await readFile(path.join(repoRoot, "plans/plans-enhance-20260702-order.js"), "utf8");
const i18nSource = await readFile(path.join(repoRoot, "plans/plans-i18n.js"), "utf8");
const checkOnly = process.argv.includes("--check");

const pages = [
  { file: "plans/index.html", url: "https://sideclip.app/plans/", lang: "en" },
  { file: "en/plans/index.html", url: "https://sideclip.app/en/plans/", lang: "en" },
  { file: "ja/plans/index.html", url: "https://sideclip.app/ja/plans/", lang: "ja" }
];

function removeNextRuntime(document) {
  document.querySelectorAll('link[rel="preload"][as="script"]').forEach((element) => element.remove());
  document.querySelectorAll("script").forEach((script) => {
    const src = script.getAttribute("src") || "";
    const text = script.textContent || "";
    if (src.startsWith("/_next/") || text.includes("self.__next_f") || text.includes("self.__next_f=")) {
      script.remove();
    }
  });
  document.querySelectorAll("body > div[hidden]").forEach((element) => element.remove());
}

function prepareRuntime(window) {
  window.setTimeout = (callback) => {
    callback();
    return 0;
  };
  window.clearTimeout = () => {};
  window.requestAnimationFrame = (callback) => {
    callback();
    return 0;
  };
  window.cancelAnimationFrame = () => {};
}

function regionalOffer(name, price, priceCurrency, description, market, url) {
  const offer = {
    "@type": "Offer",
    name: `${name} (${market === "jp" ? "Japan" : "Outside Japan"})`,
    price: String(price),
    priceCurrency,
    description,
    url,
    availability: "https://schema.org/InStock"
  };
  if (market === "jp") {
    offer.eligibleRegion = { "@type": "Country", name: "JP" };
  } else {
    offer.ineligibleRegion = { "@type": "Country", name: "JP" };
  }
  return offer;
}

function syncPlansStructuredData(document, page) {
  document.querySelectorAll('script[data-sideclip-structured-data="plans"]').forEach((script) => script.remove());
  const isJapanese = page.lang === "ja";
  const data = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: isJapanese ? "SideClip プランと料金" : "SideClip plans and pricing",
    url: page.url,
    inLanguage: page.lang,
    itemListElement: [
      regionalOffer("SideClip Free", 0, "JPY", isJapanese ? "無料" : "Free forever", "jp", page.url),
      regionalOffer("SideClip Pro", 300, "JPY", isJapanese ? "月額プラン" : "Monthly subscription", "jp", page.url),
      regionalOffer("SideClip Ultra", 480, "JPY", isJapanese ? "月額プラン" : "Monthly subscription", "jp", page.url),
      regionalOffer("SideClip Free", 0, "USD", isJapanese ? "無料" : "Free forever", "global", page.url),
      regionalOffer("SideClip Pro", 2.99, "USD", isJapanese ? "月額プラン" : "Monthly subscription", "global", page.url),
      regionalOffer("SideClip Ultra", 4.99, "USD", isJapanese ? "月額プラン" : "Monthly subscription", "global", page.url)
    ]
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.sideclipStructuredData = "plans";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

for (const page of pages) {
  const filePath = path.join(repoRoot, page.file);
  const sourceHtml = await readFile(filePath, "utf8");
  const dom = new JSDOM(sourceHtml, {
    url: page.url,
    runScripts: "outside-only"
  });

  prepareRuntime(dom.window);
  dom.window.document.querySelectorAll('script[src^="/site-analytics.js"], script[src^="/regional-pricing.js"]').forEach((element) => element.remove());
  dom.window.document.getElementById("sideclip-plans-i18n-style")?.remove();
  dom.window.eval(enhanceSource);
  dom.window.dispatchEvent(new dom.window.Event("load"));
  dom.window.eval(i18nSource);
  dom.window.document.dispatchEvent(new dom.window.Event("DOMContentLoaded", { bubbles: true }));

  const { document } = dom.window;
  document.documentElement.lang = page.lang;
  document.querySelector(".plans-language-suggestion")?.remove();
  document.documentElement.classList.remove("plans-language-suggestion-open");
  document.querySelectorAll("[data-language-bound]").forEach((element) => element.removeAttribute("data-language-bound"));
  document.querySelectorAll("[data-language-suggestion-inert]").forEach((element) => {
    element.inert = false;
    element.removeAttribute("data-language-suggestion-inert");
  });
  removeNextRuntime(document);
  syncPlansStructuredData(document, page);

  const nextHtml = `<!DOCTYPE html>${document.documentElement.outerHTML}`;
  if (nextHtml !== sourceHtml) {
    if (checkOnly) {
      throw new Error(`${page.file} is out of date. Run npm run prerender:plans.`);
    }
    await writeFile(filePath, nextHtml, "utf8");
  }

  dom.window.close();
}
