import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { JSDOM } from "jsdom";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appSource = await readFile(path.join(repoRoot, "app.js"), "utf8");
const i18nSource = await readFile(path.join(repoRoot, "site-i18n.js"), "utf8");
const markerStart = "<!-- landing-static:start -->";
const markerEnd = "<!-- landing-static:end -->";
const checkOnly = process.argv.includes("--check");

const pages = [
  { file: "index.html", url: "https://sideclip.app/" },
  { file: "en/index.html", url: "https://sideclip.app/en/" },
  { file: "ja/index.html", url: "https://sideclip.app/ja/" }
];

function replaceStaticLanding(html, rootHtml) {
  const start = html.indexOf(markerStart);
  const end = html.indexOf(markerEnd);
  if (start < 0 || end < 0 || end <= start) {
    const emptyRoot = '<div id="root"></div>';
    if (html.includes(emptyRoot)) {
      return html.replace(emptyRoot, `${markerStart}\n    ${rootHtml}\n    ${markerEnd}`);
    }
    throw new Error("Static landing markers are missing or out of order.");
  }

  const before = html.slice(0, start + markerStart.length);
  const after = html.slice(end);
  return `${before}\n    ${rootHtml}\n    ${after}`;
}

for (const page of pages) {
  const filePath = path.join(repoRoot, page.file);
  const sourceHtml = await readFile(filePath, "utf8");
  const dom = new JSDOM(sourceHtml, {
    url: page.url,
    runScripts: "outside-only"
  });

  dom.window.__SIDECLIP_PRERENDER__ = true;
  dom.window.eval(i18nSource);
  dom.window.eval(appSource);

  const root = dom.window.document.querySelector("#root");
  const renderer = dom.window.SideClipLandingPrerender;
  if (!root || !renderer?.render) {
    throw new Error(`Unable to prerender ${page.file}.`);
  }

  root.innerHTML = renderer.render();
  root.dataset.staticLanding = "";
  dom.window.SideClipI18n?.applyPageTranslations?.("landing");
  renderer.syncStructuredData?.(root);
  root.querySelectorAll("[data-language-bound]").forEach((element) => {
    element.removeAttribute("data-language-bound");
  });

  const staticRootHtml = root.outerHTML.replace(/[ \t]+$/gm, "");
  const nextHtml = replaceStaticLanding(sourceHtml, staticRootHtml);
  if (nextHtml !== sourceHtml) {
    if (checkOnly) {
      throw new Error(`${page.file} is out of date. Run npm run prerender.`);
    }
    await writeFile(filePath, nextHtml, "utf8");
  }

  dom.window.close();
}
