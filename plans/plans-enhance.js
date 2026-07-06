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
        border: 1px solid rgba(29, 29, 31, 0.1);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.84);
        color: #1d1d1f;
        font-size: 11.8px;
        font-weight: 700;
        line-height: 1.35;
        padding: 7px 14px;
        box-shadow: none;
        text-decoration: none;
        white-space: nowrap;
        -webkit-backdrop-filter: blur(18px) saturate(1.3);
        backdrop-filter: blur(18px) saturate(1.3);
        transition: color 160ms ease, border-color 160ms ease;
      }

      .plans-top-return-link:hover {
        color: #0071e3;
        border-color: rgba(0, 113, 227, 0.24);
      }

      @media (max-width: 560px) {
        .plans-top-return-link {
          margin-left: 8px;
          padding: 7px 12px;
        }
      }

      @media (max-width: 420px) {
        .plans-top-return-link::before {
          content: none;
        }
      }

      .plans-pricing-summary {
        min-height: 8.25rem !important;
        white-space: pre-line;
      }

      .plans-free-year-placeholder {
        visibility: hidden;
      }

      @media (max-width: 1023px) {
        .plans-free-year-placeholder {
          display: none !important;
        }

        .plans-pricing-summary {
          min-height: 0 !important;
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
    link.textContent = "トップへ戻る";
    link.setAttribute("aria-label", "SideClipトップへ戻る");

    const divider = headerInner.querySelector("span.pointer-events-none");
    headerInner.insertBefore(link, divider || null);
  }

  function findPlanCard(planName) {
    return Array.from(document.querySelectorAll("article")).find((article) => {
      const title = article.querySelector("h3");
      return title && title.textContent.trim() === planName;
    });
  }

  function addPlanBullet(card, text, afterText) {
    if (!card || card.textContent.includes(text)) return;

    const list = card.querySelector("ul");
    if (!list) return;

    const item = document.createElement("li");
    item.className = "flex gap-2 text-sm text-sc-text";
    item.innerHTML = `${CHECK_ICON}<span>${text}</span>`;

    const afterItem = afterText
      ? Array.from(list.children).find((child) => child.textContent.includes(afterText))
      : null;
    if (afterItem && afterItem.nextSibling) {
      list.insertBefore(item, afterItem.nextSibling);
    } else {
      list.appendChild(item);
    }
  }

  function addQuickPasteBullets() {
    const quickPasteText = "クイックペースト（最新1〜9をショートカットでペースト）";
    addPlanBullet(findPlanCard("Pro"), quickPasteText, "画像トリミング");
  }

  function addUltraConvenienceBullet() {
    const ultraCard = findPlanCard("Ultra");
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

  function movePlanBulletBefore(card, movingText, targetText) {
    const list = card ? card.querySelector("ul") : null;
    if (!list) return;

    const items = Array.from(list.children);
    const movingItem = items.find((item) => item.textContent.includes(movingText));
    const targetItem = items.find((item) => item.textContent.includes(targetText));
    if (!movingItem || !targetItem || movingItem.nextElementSibling === targetItem) return;

    list.insertBefore(movingItem, targetItem);
  }

  function removePlanBullet(card, text) {
    const list = card ? card.querySelector("ul") : null;
    if (!list) return;

    Array.from(list.children).forEach((item) => {
      if (item.textContent.includes(text)) item.remove();
    });
  }

  function updatePlanSummary(card, currentTexts, nextText) {
    if (!card) return;

    const summary = Array.from(card.querySelectorAll("p")).find((paragraph) =>
      currentTexts.some((text) => paragraph.textContent.includes(text)),
    );
    if (!summary) return;

    summary.textContent = nextText;
    summary.classList.add("plans-pricing-summary");
  }

  function ensureFreeYearPlaceholder(card) {
    if (!card || card.querySelector(".plans-free-year-placeholder")) return;

    const priceBlock = Array.from(card.children).find((child) =>
      child.textContent.includes("¥0"),
    );
    const placeholder = document.createElement("p");
    placeholder.className = "plans-free-year-placeholder mt-2 text-sm font-medium text-sc-primary";
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.textContent = "年額 ¥0";

    if (priceBlock) {
      priceBlock.insertAdjacentElement("afterend", placeholder);
    }
  }

  function updatePlanWording() {
    const freeCard = findPlanCard("Free");
    const proCard = findPlanCard("Pro");
    const ultraCard = findPlanCard("Ultra");

    updatePlanSummary(
      freeCard,
      [
        "Tap to Pasteと基本の履歴管理を体験できます。",
        "Tap to Pasteやスクショ履歴など、SideClipの基本機能が体験できます。",
      ],
      "Tap to Pasteやスクショ履歴など、SideClipの基本機能が体験できます。",
    );
    ensureFreeYearPlaceholder(freeCard);

    replaceText(proCard, "自動翻訳", "コピーして翻訳");
    updatePlanSummary(
      proCard,
      [
        "Todo、画像内検索、コピーして翻訳に加えて、画像のトリミング・ペン入れまで使えます。",
        "Todo、クイックペースト、画像内検索、コピーして翻訳に加えて、画像のトリミング・ペン入れまで使えます。",
        "プロフェッショナルに向けの便利な機能が解放されます。",
      ],
      "プロフェッショナルに向けの便利な機能が解放されます。",
    );

    updatePlanSummary(
      ultraCard,
      [
        "Proの全機能に、無制限保存・CSVエクスポート・バックアップと復元などのデータ管理を追加できます。",
        "SideClipの全機能が使えます。今後のアップデートで新機能が優先的に追加されます。",
        "SideClipの全機能が使えます。無制限保存・バックアップと復元など、SideClipをクリップボード履歴の保管庫として使えるようになります。\n将来のAI時代、あなたのクリップボード履歴は重要なデータ資産になるかもしれません。",
      ],
      "SideClipの全機能が使えます。無制限保存・バックアップと復元など、SideClipをクリップボード履歴の保管庫として使えるようになります。\n将来のAI時代、あなたのクリップボード履歴は重要なデータ資産になるかもしれません。",
    );

    movePlanBulletBefore(proCard, "クイックペースト", "コピーして翻訳");
    removePlanBullet(ultraCard, "クイックペースト");
    addPlanBullet(ultraCard, "画像内テキスト抽出", "Appleリマインダー連携");

    const differenceSection = document.getElementById("difference-heading")?.closest("section");
    replaceText(differenceSection, "自動翻訳", "コピーして翻訳");
    replaceText(
      differenceSection,
      "Pro以上ではTodo、画像のトリミング・ペン入れ、画像内テキスト検索、コピーして翻訳を使えます。",
      "Pro以上ではTodo、クイックペースト、画像のトリミング・ペン入れ、画像内テキスト検索、コピーして翻訳を使えます。",
    );
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

  function moveQuickPasteRowBeforeTranslate(tbody) {
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const translateRow = rows.find((row) => firstCellText(row) === "コピーして翻訳");
    const quickPasteRow = rows.find((row) => firstCellText(row) === "クイックペースト");
    if (!translateRow || !quickPasteRow || quickPasteRow.nextElementSibling === translateRow) return;

    tbody.insertBefore(quickPasteRow, translateRow);
  }

  function addComparisonRows() {
    const tbody = findComparisonBody();
    if (!tbody) return;

    updateExistingRows(tbody);
    moveTranslateRowAfterTodo(tbody);

    if (!tbody.textContent.includes("クイックペースト")) {
      const rows = Array.from(tbody.querySelectorAll("tr"));
      const translateRow = rows.find((row) => firstCellText(row) === "コピーして翻訳");
      const quickPasteRow = addComparisonRow(
        tbody,
        {
          feature: "クイックペースト",
          free: "-",
          pro: "選択中のタブの最新カード1〜9を\nキーボードショートカットでペースト",
          ultra: "←",
        },
        null,
      );

      if (translateRow) tbody.insertBefore(quickPasteRow, translateRow);
    }
    moveQuickPasteRowBeforeTranslate(tbody);

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
    addQuickPasteBullets();
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
