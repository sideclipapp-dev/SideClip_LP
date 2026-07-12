(function () {
  const STORAGE_KEY = "sideclip_language_v1";
  const STYLE_ID = "sideclip-plans-i18n-style";
  const originalText = new WeakMap();
  let currentLang = "ja";
  let applying = false;

  const translations = new Map([
    ["使い方に合わせて、", "Choose a plan that fits"],
    ["プランを選べる。", "the way you work."],
    ["Freeで試して、毎日のコピー履歴が増えてきたらProへ。\n大量のカード管理やバックアップまで任せたい人にはUltraを用意しています。", "Start with Free, then move to Pro as your daily clipboard history grows.\nChoose Ultra for unlimited storage, backups, and deeper data management."],
    ["料金とおすすめ", "Plans and recommendations"],
    ["有料プランは初回30日無料。\n購入・変更・解約はSideClipアプリ内のプラン画面から簡単に行えます。", "Paid plans include a 30-day free trial.\nPurchase, switch, or cancel easily from the Plan screen in the SideClip app."],
    ["まず試したい人へ", "For trying SideClip"],
    ["ずっと無料", "Free forever"],
    ["Tap to Pasteと基本の履歴管理を体験できます。", "Experience Tap to Paste and the core clipboard-history workflow."],
    ["Mac Clip 200件", "200 Mac Clip cards"],
    ["Keep 10件 / 各Fav 5件", "Keep: 10 / each Fav: 5"],
    ["SCAN利用可", "SCAN available"],
    ["インストールしてすぐ使えます。アカウント作成やログイン不要です。\nまずはSideClipを体験いただき、あなたのMac環境で正しく動作するかご確認ください。", "Start using SideClip right after installation. No account or login is required.\nTry it on your Mac first and confirm that it works well in your environment."],
    ["コピー・スクショでカード生成", "Create cards from copies and screenshots"],
    ["SCAN（スクショ）ショートカット機能", "SCAN screenshot shortcut"],
    ["Mac Clip（クリップボード履歴保存件数）200件", "Mac Clip: 200 clipboard-history cards"],
    ["Favorite（お気に入り）\n　　Keep 10件 / 各Fav 5件", "Favorite\nKeep: 10 / each Fav: 5"],
    ["おすすめ", "Recommended"],
    ["日常的に使う人へ", "For everyday use"],
    ["月額", "per month"],
    ["¥300/月", "JPY 300/month"],
    ["¥480/月", "JPY 480/month"],
    ["¥2,400/年", "JPY 2,400/year"],
    ["¥3,600/年", "JPY 3,600/year"],
    ["年額 ¥0", "JPY 0/year"],
    ["年額 ¥2,400（月あたり¥200）", "JPY 2,400/year (JPY 200/month)"],
    ["年額 ¥3,600（月あたり¥300）", "JPY 3,600/year (JPY 300/month)"],
    ["プロフェッショナルに向けの便利な機能が解放されます。", "Convenient features for professional workflows are unlocked."],
    ["詳細はページ下部の", "See the"],
    ["比較表", "comparison table"],
    ["をご覧ください。", "below for details."],
    ["Freeの全機能", "Everything in Free"],
    ["Todo 未完了/完了 各300件", "Todo: 300 open / 300 completed"],
    ["Mac Clip 1,000件", "1,000 Mac Clip cards"],
    ["画像トリミング・ペン入れ", "Image cropping and markup"],
    ["クイックペースト（最新1〜9をショートカットでペースト）", "Quick Paste (paste recent cards 1–9 with shortcuts)"],
    ["コピーして翻訳", "Copy and translate"],
    ["Pro + 管理機能", "Pro + data management"],
    ["大量のデータを管理したい人へ", "For managing large histories"],
    ["Proの全機能に、無制限保存・CSVエクスポート・バックアップと復元などのデータ管理を追加できます。", "Add unlimited storage, CSV export, backup, and restore to every Pro feature."],
    ["SideClipの全機能が使えます。無制限保存・バックアップと復元など、SideClipをクリップボード履歴の保管庫として使えるようになります。\nAI時代、あなたのクリップボード履歴は今後ますます重要なデータ資産になるかもしれません。", "Use every SideClip feature. Unlimited storage, backup, and restore turn SideClip into a vault for your clipboard history.\nIn the AI era, that history may become an increasingly valuable data asset."],
    ["Proの全機能", "Everything in Pro"],
    ["保存件数 無制限", "Unlimited storage"],
    ["CSVエクスポート", "CSV export"],
    ["バックアップと復元", "Backup and restore"],
    ["Appleリマインダー連携", "Apple Reminders integration"],
    ["画像内テキスト抽出", "Extract text from images"],
    ["その他 便利機能", "Other useful features"],
    ["迷ったら、この選び方", "Not sure? Start here"],
    ["まずProで十分", "Pro is the best place to start"],
    ["履歴をたくさん残したい、Todo化したい、画像をトリミングしたい、ペンで注釈を入れたい。毎日の作業改善ならProがいちばん始めやすい選択です。", "Choose Pro to keep more history, turn cards into Todo items, crop images, and add annotations. It is the easiest upgrade for improving everyday work."],
    ["大量のデータを管理するならUltra", "Choose Ultra for long-term data management"],
    ["Proの機能をすべて使った上で、履歴やTodoを長く蓄積したい、CSV書き出しやバックアップまで使いたい、TodoをAppleリマインダーと連携したいなどの場合はUltraが向いています。", "Ultra includes everything in Pro, plus unlimited history and Todo storage, CSV export, backups, and Apple Reminders integration."],
    ["Freeでも基本体験はそのまま", "Free includes the core experience"],
    ["Tap to Paste、SCAN、基本のFavoriteはFreeでも使えます。まずは作業の流れに合うか試せます。", "Tap to Paste, SCAN, and basic Favorite features are available on Free. Try the workflow before upgrading."],
    ["有料プランで変わること", "What paid plans unlock"],
    ["保存できる量が増える", "Store more history"],
    ["ProはMac Clipが1,000件、UltraはMac Clip・Todo・Favoriteが無制限になります。", "Pro stores up to 1,000 Mac Clip cards. Ultra makes Mac Clip, Todo, and Favorite storage unlimited."],
    ["カードを作業に変えられる", "Turn cards into actions"],
    ["Pro以上ではTodo、クイックペースト、画像のトリミング・ペン入れ、画像内テキスト検索、コピーして翻訳を使えます。", "Pro and above include Todo, Quick Paste, image cropping and markup, text search inside images, and copy-and-translate."],
    ["Proの先までデータを管理できる", "Manage data beyond Pro"],
    ["UltraはProの全機能に加えて、CSVエクスポート、バックアップと復元、Appleリマインダー連携まで使えます。", "Ultra adds CSV export, backup and restore, and Apple Reminders integration to every Pro feature."],
    ["詳細比較表", "Detailed comparison"],
    ["実装済みの現行仕様を基準にしています。UltraはProの全機能に加えて使える項目を明記しています。", "This table reflects the features currently available. Ultra includes every Pro feature plus the additional items shown."],
    ["横にスワイプして比較", "Swipe horizontally to compare"],
    ["機能", "Feature"],
    ["Freeプラン", "Free"],
    ["まず試す", "Try it first"],
    ["Proプラン", "Pro"],
    ["日常利用におすすめ", "Recommended for daily use"],
    ["Ultraプラン", "Ultra"],
    ["Proの全機能 + データ管理", "Everything in Pro + data management"],
    ["料金", "Price"],
    ["初回無料期間", "Free trial"],
    ["30日無料", "30 days free"],
    ["Clipboard履歴\n（Mac Clip）", "Clipboard history\n(Mac Clip)"],
    ["最大200件\n古いカードから自動削除", "Up to 200\nOldest cards are removed first"],
    ["最大1,000件\n古いカードから自動削除", "Up to 1,000\nOldest cards are removed first"],
    ["無制限", "Unlimited"],
    ["Favorite保存数", "Favorite storage"],
    ["Keep 10件\n各Fav 5件", "Keep: 10\nEach Fav: 5"],
    ["Keep 100件\n各Fav 50件", "Keep: 100\nEach Fav: 50"],
    ["カード検索", "Card search"],
    ["テキスト検索のみ", "Text search only"],
    ["テキスト検索\n画像内テキスト検索", "Text search\nText search inside images"],
    ["スクショ ショートカット", "Screenshot shortcut"],
    ["SCANボタン利用可", "SCAN button available"],
    ["画像編集\nトリミング・ペン入れ", "Image editing\nCrop and markup"],
    ["画像トリミング\n注釈・ペン入れ", "Image cropping\nAnnotations and markup"],
    ["Todo管理", "Todo management"],
    ["未完了/完了：各300件", "300 open / 300 completed"],
    ["クイックペースト", "Quick Paste"],
    ["選択中のタブの最新カード1〜9を\nキーボードショートカットでペースト", "Paste recent cards 1–9 from the selected tab\nwith keyboard shortcuts"],
    ["コピーしたテキストを指定の言語に翻訳して新規カードを生成\nmacOS 15以降のMac純正翻訳機能が必要", "Translate copied text into a selected language and create a new card\nRequires the built-in Mac translation feature on macOS 15 or later"],
    ["Todoカードを同期\n(テキスト情報のみ)", "Sync Todo cards\n(text only)"],
    ["画像内テキスト表示", "Display text inside images"],
    ["OCRによる画像内テキストを表示", "Display text detected in images with OCR"],
    ["画像をコピーすると、画像内テキストを抽出して新規テキストカードを生成", "Copy an image to extract its text and create a new text card"],
    ["シンタックスハイライト", "Syntax highlighting"],
    ["ソースコードを読みやすく色分け", "Colorize source code for readability"],
    ["利用可\n（テキスト情報のみ）", "Available\n(text only)"],
    ["利用可\n（テキスト/画像/ファイルディレクトリ含む）", "Available\n(includes text, images, and file directories)"],
    ["新機能・改善", "New features and improvements"],
    ["最優先でアップデート", "Highest-priority updates"],
    ["トップへ戻る", "Back to top"]
  ]);

  function normalizeLang(value) {
    return String(value || "").toLowerCase().startsWith("en") ? "en" : "ja";
  }

  function initialLang() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ja" || saved === "en") return saved;
    } catch (_) {
      /* ignore */
    }
    return (navigator.languages || [navigator.language || ""]).some((lang) => normalizeLang(lang) === "en") ? "en" : "ja";
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .plans-language-switch { display:inline-flex; align-items:center; gap:2px; margin-left:auto; padding:2px; border:1px solid rgba(29,29,31,.1); border-radius:999px; background:rgba(255,255,255,.84); }
      .plans-language-switch button { min-width:34px; padding:5px 8px; border:0; border-radius:999px; background:transparent; color:#6e6e73; font:700 11px/1.2 system-ui,sans-serif; cursor:pointer; }
      .plans-language-switch button.is-active { background:#0071e3; color:#fff; }
      .plans-language-switch button:focus-visible { outline:2px solid #0071e3; outline-offset:2px; }
      .plans-language-switch + .plans-top-return-link { margin-left:8px; }
      @media (max-width:560px) { .plans-language-switch button { min-width:31px; padding:5px 6px; } }
    `;
    document.head.appendChild(style);
  }

  function ensureSwitch() {
    const headerInner = document.querySelector("header > div");
    if (!headerInner || headerInner.querySelector(".plans-language-switch")) return;
    const controls = document.createElement("div");
    controls.className = "plans-language-switch";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "言語切替");
    controls.innerHTML = '<button type="button" data-plan-lang="ja" aria-label="日本語で表示">JP</button><button type="button" data-plan-lang="en" aria-label="Show in English">EN</button>';
    controls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-plan-lang]");
      if (button) setLang(button.dataset.planLang);
    });
    const returnLink = headerInner.querySelector(".plans-top-return-link");
    headerInner.insertBefore(controls, returnLink || headerInner.lastElementChild);
  }

  function applyText() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement && !node.parentElement.closest("script, style") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    let node = walker.nextNode();
    while (node) {
      nodes.push(node);
      node = walker.nextNode();
    }

    nodes.forEach((textNode) => {
      if (!originalText.has(textNode)) originalText.set(textNode, textNode.nodeValue);
      const original = originalText.get(textNode);
      if (currentLang === "ja") {
        if (textNode.nodeValue !== original) textNode.nodeValue = original;
        return;
      }
      const translated = translations.get(original.trim());
      if (!translated) return;
      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      textNode.nodeValue = `${leading}${translated}${trailing}`;
    });
  }

  function applyMeta() {
    document.documentElement.lang = currentLang;
    if (currentLang === "en") {
      document.title = "Plans & pricing | SideClip";
      document.querySelector('meta[name="description"]')?.setAttribute("content", "Compare SideClip Free, Pro, and Ultra plans by storage, Todo, image editing, and data-management features.");
    } else {
      document.title = "プラン比較 | SideClip";
      document.querySelector('meta[name="description"]')?.setAttribute("content", "Free、Pro、Ultraの違いを、保存件数・Todo・画像編集・データ管理まで一目で比較できます。");
    }
  }

  function updateControls() {
    document.querySelectorAll("[data-plan-lang]").forEach((button) => {
      const active = button.dataset.planLang === currentLang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.querySelector(".plans-language-switch")?.setAttribute("aria-label", currentLang === "en" ? "Language selector" : "言語切替");
  }

  function applyLanguage() {
    if (applying) return;
    applying = true;
    ensureStyles();
    ensureSwitch();
    applyText();
    applyMeta();
    updateControls();
    applying = false;
  }

  function setLang(lang) {
    currentLang = normalizeLang(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, currentLang);
    } catch (_) {
      /* ignore */
    }
    applyLanguage();
  }

  currentLang = initialLang();
  window.setTimeout(() => {
    applyLanguage();
    let count = 0;
    const observer = new MutationObserver(() => {
      if (applying) return;
      count += 1;
      applyLanguage();
      if (count > 60) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    window.setTimeout(() => observer.disconnect(), 7000);
  }, 1500);
})();
