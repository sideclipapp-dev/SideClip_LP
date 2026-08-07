import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checks = [
  {
    file: "index.html",
    lang: "en",
    required: ["Connect once.", "Then paste in three steps.", "Download free for Mac", "Signed and notarized by Apple", "Jump to a feature", "Continue on your Mac", "Plans &amp; pricing", "data-sideclip-structured-data=\"software\"", "/download/", "image/avif"]
  },
  {
    file: "en/index.html",
    lang: "en",
    required: ["Connect once.", "Then paste in three steps.", "Download free for Mac", "Signed and notarized by Apple", "Jump to a feature", "Continue on your Mac", "Plans &amp; pricing", "data-sideclip-structured-data=\"faq\"", "/download/", "image/webp"]
  },
  {
    file: "ja/index.html",
    lang: "ja",
    required: ["コピー履歴を、", "Macで無料ダウンロード", "Apple署名・公証済み", "見たい機能から再生", "Macでダウンロードを続ける", "料金プラン", "data-sideclip-structured-data=\"software\"", "/download/", "image/avif"]
  }
];

for (const check of checks) {
  const html = await readFile(path.join(repoRoot, check.file), "utf8");
  if (!html.includes(`lang="${check.lang}"`)) {
    throw new Error(`${check.file} has the wrong document language.`);
  }
  if (!html.includes('id="root" data-static-landing=""')) {
    throw new Error(`${check.file} does not contain the prerendered landing root.`);
  }
  if (!html.includes('/regional-pricing.js')) {
    throw new Error(`${check.file} does not load regional pricing.`);
  }
  if (!html.includes("classList.add('pricing-region-pending')") || !html.includes("classList.remove('pricing-region-pending')")) {
    throw new Error(`${check.file} does not protect regional pricing from a currency flash.`);
  }
  if (!html.includes('name="twitter:card" content="summary_large_image"')) {
    throw new Error(`${check.file} does not use a large social card.`);
  }
  if (!html.includes("var COOKIE_CONSENT_BANNER_ENABLED = false;")) {
    throw new Error(`${check.file} must keep the analytics consent banner disabled.`);
  }
  for (const text of check.required) {
    if (!html.includes(text)) {
      throw new Error(`${check.file} is missing prerendered text: ${text}`);
    }
  }
}

const siteAnalytics = await readFile(path.join(repoRoot, "site-analytics.js"), "utf8");
if (!siteAnalytics.includes('analytics_storage: "granted"')) {
  throw new Error("site-analytics.js must enable analytics without a consent prompt.");
}
if (siteAnalytics.includes("data-site-analytics-consent") || siteAnalytics.includes("showConsentBanner")) {
  throw new Error("site-analytics.js must not create an analytics consent prompt.");
}

for (const file of ["index.html", "en/index.html"]) {
  const html = await readFile(path.join(repoRoot, file), "utf8");
  if (html.includes("JPY 300") || html.includes("JPY 480") || html.includes("¥300/月") || html.includes("¥480/月")) {
    throw new Error(`${file} contains a static Japanese-yen paid price.`);
  }
  if (!html.includes("$2.99") || !html.includes("$4.99")) {
    throw new Error(`${file} is missing static USD display prices.`);
  }
  for (const marker of ['"priceCurrency":"USD"', '"priceCurrency":"JPY"', '"eligibleRegion"', '"ineligibleRegion"']) {
    if (!html.includes(marker)) throw new Error(`${file} is missing region-qualified structured pricing: ${marker}`);
  }
}

const planAssetVersion = "20260801-global-review";
for (const file of ["plans/index.html", "ja/plans/index.html", "en/plans/index.html"]) {
  const html = await readFile(path.join(repoRoot, file), "utf8");
  for (const script of ["plans-enhance-20260702-order.js", "plans-i18n.js"]) {
    if (!html.includes(`${script}?v=${planAssetVersion}`)) {
      throw new Error(`${file} does not load ${script} with the current asset version.`);
    }
  }
  if (html.includes('script src="/_next/') || html.includes("self.__next_f")) {
    throw new Error(`${file} still contains the Next.js hydration runtime.`);
  }
  for (const marker of ['data-sideclip-structured-data="plans"', '"priceCurrency":"USD"', '"priceCurrency":"JPY"', '"eligibleRegion"', '"ineligibleRegion"']) {
    if (!html.includes(marker)) throw new Error(`${file} is missing region-qualified plan structured data: ${marker}`);
  }
}

for (const file of ["plans/index.html", "en/plans/index.html"]) {
  const html = await readFile(path.join(repoRoot, file), "utf8");
  if (!html.includes('lang="en"') || !html.includes("Plans and recommendations") || !html.includes("$2.99") || !html.includes("$4.99")) {
    throw new Error(`${file} is missing static English plan content or USD prices.`);
  }
  if (html.includes("JPY 300") || html.includes("¥300/月")) {
    throw new Error(`${file} contains a static Japanese-yen paid price.`);
  }
}

const japanesePlans = await readFile(path.join(repoRoot, "ja/plans/index.html"), "utf8");
if (!japanesePlans.includes('lang="ja"') || !japanesePlans.includes("料金とおすすめ") || !japanesePlans.includes("¥300")) {
  throw new Error("ja/plans/index.html is missing static Japanese plan content or JPY prices.");
}

const downloadHtml = await readFile(path.join(repoRoot, "download/index.html"), "utf8");
if (!downloadHtml.includes("SideClip-latest-arm64.dmg") || !downloadHtml.includes("noindex,follow")) {
  throw new Error("download/index.html is missing the installer target or redirect-page metadata.");
}
for (const marker of [
  "G-D3JVLNHHMQ",
  'analytics_storage: "granted"',
  'gtag("event", "download_redirect"',
  "download_source",
  "event_callback: redirectToInstaller",
]) {
  if (!downloadHtml.includes(marker)) {
    throw new Error(`download/index.html is missing canonical redirect tracking: ${marker}`);
  }
}

const appJs = await readFile(path.join(repoRoot, "app.js"), "utf8");
for (const marker of [
  'downloadUrl.searchParams.set("source", "lp")',
  'downloadUrl.searchParams.set("cta_id", trackingData.ctaId)',
  'downloadUrl.searchParams.set("section", trackingData.section)',
  'trackAnalyticsEvent("mobile_download_bridge_open"',
  'trackAnalyticsEvent("mobile_download_share"',
  'trackAnalyticsEvent("mobile_download_copy"',
  'trackAnalyticsEvent("concept_video_chapter"',
]) {
  if (!appJs.includes(marker)) {
    throw new Error(`app.js is missing download redirect attribution: ${marker}`);
  }
}

console.log("Static English and Japanese landing content, structured data, and responsive media are present.");
