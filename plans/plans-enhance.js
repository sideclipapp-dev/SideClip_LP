(function () {
  const ENHANCE_STYLE_ID = "sideclip-plan-enhance-style";
  const CHECK_ICON =
    '<svg class="mt-0.5 h-4 w-4 shrink-0 text-sc-primary" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  function ensureStyles() {
    if (document.getElementById(ENHANCE_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = ENHANCE_STYLE_ID;
    style.textContent = `
      .plans-top-return-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: 16px;
        border: 1px solid rgba(45, 154, 255, 0.28);
        border-radius: 999px;
        background: rgba(45, 154, 255, 0.08);
        color: #087eff;
        font-size: 13px;
        font-weight: 800;
        line-height: 1;
        padding: 9px 13px;
        text-decoration: none;
        white-space: nowrap;
        transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
      }

      .plans-top-return-link:hover {
        background: rgba(45, 154, 255, 0.13);
        border-color: rgba(45, 154, 255, 0.45);
        transform: translateY(-1px);
      }

      @media (max-width: 560px) {
        .plans-top-return-link {
          margin-left: 8px;
          padding: 8px 10px;
          font-size: 12px;
        }
      }

      @media (max-width: 420px) {
        .plans-top-return-link {
          font-size: 0;
          padding: 8px 9px;
        }

        .plans-top-return-link::before {
          content: "LPへ";
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function addTopReturnLink() {
    const headerInner = document.querySelector("header > div");
    if (!headerInner || headerInner.querySelector(".plans-top-return-link")) return;

    const link = document.createElement("a");
    link.href = "/";
    link.className = "plans-top-return-link";
    link.textContent = "LPトップへ戻る";
    link.setAttribute("aria-label", "SideClipのLPトップへ戻る");

    const divider = headerInner.querySelector("span.pointer-events-none");
    headerInner.insertBefore(link, divider || null);
  }

  function addUltraConvenienceBullet() {
    const ultraCard = Array.from(document.querySelectorAll("article")).find((article) => {
      const title = article.querySelector("h3");
      return title && title.textContent.trim() === "Ultra";
    });
    if (!ultraCard || ultraCard.textContent.includes("その他 便利機能")) return;

    const list = ultraCard.querySelector("ul");
    if (!list) return;

    const item = document.createElement("li");
    item.className = "flex gap-2 text-sm text-sc-text";
    item.innerHTML = `${CHECK_ICON}<span>その他 便利機能</span>`;
    list.appendChild(item);
  }

  function replaceText(root, from, to) {
    if (!root || !root.textContent || !root.textContent.includes(from)) return;

    const walker = document.createTreeWalker(root, 4);
    const textNodes = [];
    let node = walker.nextNode();
    while (node) {
      textNodes.push(node);
      node = walker.nextNode();
    }

    textNodes.forEach((textNode) => {
      if (textNode.nodeValue && textNode.nodeValue.includes(from)) {
        textNode.nodeValue = textNode.nodeValue.split(from).join(to);
      }
    });
  }

  function updatePlanWording() {
    const proCard = Array.from(document.querySelectorAll("article")).find((article) => {
      const title = article.querySelector("h3");
      return title && title.textContent.trim() === "Pro";
    });
    replaceText(proCard, "自動翻訳", "コピーして翻訳");

    const differenceSection = document.getElementById("difference-heading")?.closest("section");
    replaceText(differenceSection, "自動翻訳", "コピーして翻訳");
  }

  function findComparisonBody() {
    const heading = document.getElementById("comparison-heading");
    const section = heading ? heading.closest("section") : null;
    return section ? section.querySelector("tbody") : null;
  }

  function tableCell(tagName, text, isLastCell) {
    const cell = document.createElement(tagName);
    cell.className = [
      "whitespace-pre-line",
      isLastCell ? "" : "border-r border-black/8",
      "px-4 py-4 align-top leading-relaxed text-sc-text",
      tagName === "th" ? "font-bold" : "",
      isLastCell && tagName === "td" ? "font-medium" : "",
    ]
      .filter(Boolean)
      .join(" ");
    cell.textContent = text;
    return cell;
  }

  function addComparisonRow(tbody, row, afterRow) {
    const tr = document.createElement("tr");
    tr.className = "border-b border-black/8 last:border-b-0 even:bg-sc-surface/45";
    tr.appendChild(tableCell("th", row.feature, false));
    tr.appendChild(tableCell("td", row.free, false));
    tr.appendChild(tableCell("td", row.pro, false));
    tr.appendChild(tableCell("td", row.ultra, true));

    if (afterRow && afterRow.nextSibling) {
      tbody.insertBefore(tr, afterRow.nextSibling);
    } else {
      tbody.appendChild(tr);
    }
    return tr;
  }

  function firstCellText(row) {
    const cell = row && row.children ? row.children[0] : null;
    return cell ? cell.textContent.trim() : "";
  }

  function updateExistingRows(tbody) {
    Array.from(tbody.querySelectorAll("tr")).forEach((row) => {
      const label = firstCellText(row);
      const cells = row.children;

      if ((label === "コピー時の自動翻訳" || label === "翻訳機能") && cells.length >= 4) {
        cells[0].textContent = "コピーして翻訳";
        cells[2].textContent =
          "コピーしたテキストを指定の言語に翻訳して新規カードを生成\nmacOS 15以降のMac純正翻訳機能が必要";
        cells[3].textContent = "←";
      }

      if (label === "画像内テキスト" && cells.length >= 4) {
        cells[0].textContent = "画像内テキスト表示";
      }
    });
  }

  function moveTranslateRowAfterTodo(tbody) {
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const todoRow = rows.find((row) => firstCellText(row) === "Todo管理");
    const translateRow = rows.find((row) => firstCellText(row) === "コピーして翻訳");
    if (!todoRow || !translateRow || translateRow.previousElementSibling === todoRow) return;

    if (todoRow.nextSibling) {
      tbody.insertBefore(translateRow, todoRow.nextSibling);
    } else {
      tbody.appendChild(translateRow);
    }
  }

  function addComparisonRows() {
    const tbody = findComparisonBody();
    if (!tbody) return;

    updateExistingRows(tbody);
    moveTranslateRowAfterTodo(tbody);

    if (!tbody.textContent.includes("画像内テキスト抽出")) {
      const rows = Array.from(tbody.querySelectorAll("tr"));
      const afterRow =
        rows.find((row) => firstCellText(row) === "画像内テキスト表示") || rows[rows.length - 1];
      addComparisonRow(
        tbody,
        {
          feature: "画像内テキスト抽出",
          free: "-",
          pro: "-",
          ultra: "画像をコピーすると、画像内テキストを抽出して新規テキストカードを生成",
        },
        afterRow,
      );
    }
  }

  function enhancePlansPage() {
    ensureStyles();
    addTopReturnLink();
    addUltraConvenienceBullet();
    updatePlanWording();
    addComparisonRows();
  }

  function startEnhancement() {
    enhancePlansPage();

    let mutationCount = 0;
    const observer = new MutationObserver(() => {
      mutationCount += 1;
      enhancePlansPage();
      if (mutationCount > 40) observer.disconnect();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 5000);
  }

  function scheduleEnhancement() {
    window.setTimeout(startEnhancement, 1200);
  }

  if (document.readyState === "complete") {
    scheduleEnhancement();
  } else {
    window.addEventListener("load", scheduleEnhancement, { once: true });
  }
})();
