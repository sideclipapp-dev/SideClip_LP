import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checks = [
  {
    file: "index.html",
    lang: "en",
    required: ["Three steps. Ready to paste.", "Download free for Mac", "Plans &amp; pricing", "data-sideclip-structured-data=\"software\"", "/download/", "image/avif"]
  },
  {
    file: "en/index.html",
    lang: "en",
    required: ["Three steps. Ready to paste.", "Download free for Mac", "Plans &amp; pricing", "data-sideclip-structured-data=\"faq\"", "/download/", "image/webp"]
  },
  {
    file: "ja/index.html",
    lang: "ja",
    required: ["コピー履歴を、", "Macで無料ダウンロード", "料金プラン", "data-sideclip-structured-data=\"software\"", "/download/", "image/avif"]
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
  if (!html.includes('name="twitter:card" content="summary_large_image"')) {
    throw new Error(`${check.file} does not use a large social card.`);
  }
  for (const text of check.required) {
    if (!html.includes(text)) {
      throw new Error(`${check.file} is missing prerendered text: ${text}`);
    }
  }
}

const planAssetVersion = "20260801-conversion-seo";
for (const file of ["plans/index.html", "ja/plans/index.html", "en/plans/index.html"]) {
  const html = await readFile(path.join(repoRoot, file), "utf8");
  for (const script of ["plans-enhance-20260702-order.js", "plans-i18n.js"]) {
    if (!html.includes(`${script}?v=${planAssetVersion}`)) {
      throw new Error(`${file} does not load ${script} with the current asset version.`);
    }
  }
}

const downloadHtml = await readFile(path.join(repoRoot, "download/index.html"), "utf8");
if (!downloadHtml.includes("SideClip-latest-arm64.dmg") || !downloadHtml.includes("noindex,follow")) {
  throw new Error("download/index.html is missing the installer target or redirect-page metadata.");
}

console.log("Static English and Japanese landing content, structured data, and responsive media are present.");
