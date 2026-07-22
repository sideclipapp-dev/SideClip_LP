import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checks = [
  {
    file: "index.html",
    lang: "en",
    required: ["Copy. See it. Tap. Paste.", "Download free for Mac", "Plans &amp; pricing"]
  },
  {
    file: "ja/index.html",
    lang: "ja",
    required: ["コピー。表示。タップ。ペースト。", "Macで無料ダウンロード", "料金プラン"]
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
  for (const text of check.required) {
    if (!html.includes(text)) {
      throw new Error(`${check.file} is missing prerendered text: ${text}`);
    }
  }
}

console.log("Static English and Japanese landing content is present.");
