(function () {
  const ASSET_VERSION = "20260801-conversion-seo";
  const HERO_PHONE_ASSET_VERSION = "20260806-responsive-phone-v1";
  const CONCEPT_VIDEO_YT_IDS = {
    ja: "rCiLdIpRr5I",
    en: "bu5zO823Pow"
  };
  const CONCEPT_VIDEO_CHAPTERS = {
    ja: [
      { seconds: 0, time: "0:00", label: "コピー＆ペースト" },
      { seconds: 30, time: "0:30", label: "SCANでスクショ" },
      { seconds: 52, time: "0:52", label: "Favorite整理" },
      { seconds: 74, time: "1:14", label: "Todo管理" },
      { seconds: 108, time: "1:48", label: "Quick Paste・データ管理" }
    ],
    en: [
      { seconds: 0, time: "0:00", label: "Copy & paste" },
      { seconds: 24, time: "0:24", label: "Screenshots" },
      { seconds: 44, time: "0:44", label: "Favorites" },
      { seconds: 64, time: "1:04", label: "Todo" },
      { seconds: 94, time: "1:34", label: "Quick Paste & data" }
    ]
  };
  const BENEFITS_VIDEO_YT_ID = "3m6aWg6LDFY";
  const FEATURE_SCREENSHOT_VIDEO_YT_ID = "pfBsk3Iwi4E";
  const MAC_DOWNLOAD_URL = "/download/";

  function getLandingLang() {
    return window.SideClipI18n?.getLang?.() || document.documentElement.lang || "en";
  }

  function isJapaneseLanding() {
    return String(getLandingLang()).toLowerCase().startsWith("ja");
  }

  function getConceptVideoId() {
    const lang = getLandingLang();
    return String(lang).toLowerCase().startsWith("ja")
      ? CONCEPT_VIDEO_YT_IDS.ja
      : CONCEPT_VIDEO_YT_IDS.en;
  }

  function getConceptVideoChapters() {
    return isJapaneseLanding()
      ? CONCEPT_VIDEO_CHAPTERS.ja
      : CONCEPT_VIDEO_CHAPTERS.en;
  }

  function renderConceptVideoChapters() {
    const isJapanese = isJapaneseLanding();
    const title = isJapanese ? "見たい機能から再生" : "Jump to a feature";
    const ariaLabel = isJapanese ? "製品デモのチャプター" : "Product demo chapters";
    const buttons = getConceptVideoChapters().map((chapter) => `
      <button
        type="button"
        class="concept-video__chapter"
        data-concept-video-seconds="${chapter.seconds}"
        data-concept-video-label="${chapter.label}"
        aria-label="${chapter.time} ${chapter.label}から再生"
      >
        <span class="concept-video__chapter-time">${chapter.time}</span>
        <span class="concept-video__chapter-label">${chapter.label}</span>
      </button>
    `).join("");
    return `
      <div class="reveal__rest concept-video__chapters" aria-label="${ariaLabel}">
        <p class="concept-video__chapters-title">${title}</p>
        <div class="concept-video__chapter-list">${buttons}</div>
      </div>
    `;
  }

  // Visual assets are centralized so replacement only needs this block.
  const syncDataLineRail = `
    <div class="sync-line-rail" aria-hidden="true">
      <svg class="sync-line-svg" viewBox="0 0 100 14" preserveAspectRatio="none" focusable="false">
        <line x1="0.25" y1="7" x2="99.75" y2="7" class="sync-line-solid" vector-effect="non-scaling-stroke" />
      </svg>
      <span class="sync-packet sync-packet--fwd" style="animation-delay: 0s"></span>
      <span class="sync-packet sync-packet--fwd" style="animation-delay: 1.45s"></span>
      <span class="sync-packet sync-packet--rev" style="animation-delay: 0.35s"></span>
      <span class="sync-packet sync-packet--rev" style="animation-delay: 1.75s"></span>
    </div>`;

  const ASSETS = {
    heroMain: isJapaneseLanding()
      ? `/assets/optimized-ja/hero-background.jpg?v=${ASSET_VERSION}`
      : `/assets/optimized-en/hero-background.jpg?v=${ASSET_VERSION}`,
    heroPhone: isJapaneseLanding()
      ? `/assets/optimized-ja/hero-phone-1024.png?v=${HERO_PHONE_ASSET_VERSION}`
      : `/assets/optimized-en/hero-phone-1024.png?v=${HERO_PHONE_ASSET_VERSION}`,
    heroPhoneSrcset: isJapaneseLanding()
      ? `/assets/optimized-ja/hero-phone-512.png?v=${HERO_PHONE_ASSET_VERSION} 341w, /assets/optimized-ja/hero-phone-1024.png?v=${HERO_PHONE_ASSET_VERSION} 682w`
      : `/assets/optimized-en/hero-phone-512.png?v=${HERO_PHONE_ASSET_VERSION} 341w, /assets/optimized-en/hero-phone-1024.png?v=${HERO_PHONE_ASSET_VERSION} 682w`,
    heroMainFallback: `/assets/hero-banner.jpg?v=${ASSET_VERSION}`,
    stepCopy: `/assets/step-copy.png?v=${ASSET_VERSION}`,
    stepAdd: `/assets/step-add.png?v=${ASSET_VERSION}`,
    stepTap: `/assets/step-tap.png?v=${ASSET_VERSION}`,
    stepPaste: `/assets/step-paste.png?v=${ASSET_VERSION}`,
    featureHistory: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-history.jpg?v=${ASSET_VERSION}`
      : `/assets/optimized-en/feature-history.jpg?v=${ASSET_VERSION}`,
    featureFavorite: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-favorite.jpg?v=${ASSET_VERSION}`
      : `/assets/optimized-en/feature-favorite.jpg?v=${ASSET_VERSION}`,
    featureSearch: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-search.jpg?v=${ASSET_VERSION}`
      : `/assets/optimized-en/feature-search.jpg?v=${ASSET_VERSION}`,
    featureTodo: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-todo.jpg?v=${ASSET_VERSION}`
      : `/assets/optimized-en/feature-todo.jpg?v=${ASSET_VERSION}`,
    featureScan: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-scan.jpg?v=${ASSET_VERSION}`
      : `/assets/optimized-en/feature-scan.jpg?v=${ASSET_VERSION}`,
    usageScenes: `/assets/具体シーン.png?v=${ASSET_VERSION}`,
    clipboardDifference: isJapaneseLanding()
      ? `/assets/optimized-ja/clipboard-difference.jpg?v=${ASSET_VERSION}`
      : `/assets/optimized-en/clipboard-difference.jpg?v=${ASSET_VERSION}`,
    flowIconMac: isJapaneseLanding()
      ? `/assets/optimized-ja/flow-icon-mac.png?v=${ASSET_VERSION}`
      : `/assets/flow-icon-mac.png?v=${ASSET_VERSION}`,
    flowIconPhone: isJapaneseLanding()
      ? `/assets/optimized-ja/flow-icon-phone.png?v=${ASSET_VERSION}`
      : `/assets/flow-icon-phone.png?v=${ASSET_VERSION}`,
    flowIconTap: isJapaneseLanding()
      ? `/assets/optimized-ja/flow-icon-tap.png?v=${ASSET_VERSION}`
      : `/assets/flow-icon-tap.png?v=${ASSET_VERSION}`,
    flowIconTapHeroFill: `/assets/flow-icon-tap-hero-fill.png?v=${ASSET_VERSION}`,
    flowIconCheck: isJapaneseLanding()
      ? `/assets/optimized-ja/flow-icon-check.png?v=${ASSET_VERSION}`
      : `/assets/flow-icon-check.png?v=${ASSET_VERSION}`,
    heroIconSceneResearch: `/assets/hero_icon_scene_research.png?v=${ASSET_VERSION}`,
    heroIconSceneChat: `/assets/hero_icon_scene_chat.png?v=${ASSET_VERSION}`,
    heroIconSceneIdea: `/assets/hero_icon_scene_idea.png?v=${ASSET_VERSION}`,
    heroIconHighlightLock: `/assets/hero_icon_highlight_lock.png?v=${ASSET_VERSION}`,
    heroIconHighlightBolt: `/assets/hero_icon_highlight_bolt.png?v=${ASSET_VERSION}`,
    heroIconHighlightQr: `/assets/hero_icon_highlight_qr.png?v=${ASSET_VERSION}`,
    heroFlowInfographic: `/assets/hero_flow_devices_only.png?v=${ASSET_VERSION}`,
    heroFlowMacLaptop: `/assets/hero_flow_mac_laptop.png?v=${ASSET_VERSION}`,
    heroFlowPhoneClipboard: `/assets/hero_flow_phone_clipboard.png?v=${ASSET_VERSION}`,
  };

  function modernImageSources(src, widths) {
    const [pathname] = src.split("?");
    const base = pathname.replace(/\.[a-z0-9]+$/i, "");
    return {
      avif: widths.map((width) => `${base}-${width}.avif?v=${ASSET_VERSION} ${width}w`).join(", "),
      webp: widths.map((width) => `${base}-${width}.webp?v=${ASSET_VERSION} ${width}w`).join(", "),
    };
  }

  function renderModernPicture({ src, widths, sizes, className = "", alt = "", width, height, loading, fetchpriority, onerror }) {
    const sources = modernImageSources(src, widths);
    const attributes = [
      className ? `class="${className}"` : "",
      `src="${src}"`,
      sizes ? `sizes="${sizes}"` : "",
      width ? `width="${width}"` : "",
      height ? `height="${height}"` : "",
      `alt="${alt}"`,
      loading ? `loading="${loading}"` : "",
      `decoding="async"`,
      fetchpriority ? `fetchpriority="${fetchpriority}"` : "",
      onerror ? `onerror="${onerror}"` : "",
    ].filter(Boolean).join(" ");

    return `
      <picture>
        <source type="image/avif" srcset="${sources.avif}" sizes="${sizes}" />
        <source type="image/webp" srcset="${sources.webp}" sizes="${sizes}" />
        <img ${attributes} />
      </picture>
    `;
  }

  function renderLanguageSwitch() {
    if (window.SideClipI18n && typeof window.SideClipI18n.renderSwitch === "function") {
      return window.SideClipI18n.renderSwitch();
    }
    return `
      <div class="language-switch" data-language-switch role="group" aria-label="言語切替">
        <button type="button" class="language-switch__option" data-language-option="ja" aria-label="日本語で表示">JP</button>
        <button type="button" class="language-switch__option" data-language-option="en" aria-label="Show in English">EN</button>
      </div>
    `;
  }

  const icon = {
    download: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 18h14" />
      </svg>
    `,
    eye: `
      <svg viewBox="0 0 24 24"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="3" /></svg>
    `,
    tap: `
      <svg viewBox="0 0 24 24"><path d="M10 14.5V5.7a1.7 1.7 0 1 1 3.4 0V12l.7-.7a1.5 1.5 0 0 1 2.1 2.1L13 16.6c-.7.7-1.2 1.7-1.2 2.7v1.2" /><path d="M7.2 11.4 5.7 9.9a1.5 1.5 0 0 1 2.1-2.1l2.2 2.2" /><path d="M5 3.5 3.8 2.3M19.5 4.5l1.2-1.2M4 17l-1.5 1M18.7 18.8l1.4 1" /></svg>
    `,
    media: `
      <svg viewBox="0 0 24 24"><rect x="3" y="4" width="10" height="8" rx="1.5" /><rect x="12" y="12" width="9" height="8" rx="1.5" /><path d="M6 16h4M16 7h3M7 8h2M15 16h3" /></svg>
    `,
    lock: `
      <svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 14v2.5" /></svg>
    `,
    gift: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7H8.5a2.5 2.5 0 1 1 2.5-2.5V7Zm0 0h3.5A2.5 2.5 0 1 0 13 4.5V7Z" /></svg>
    `,
    card: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h5" /></svg>
    `,
    checkCircle: `
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12 2.6 2.7L16.5 8" /></svg>
    `,
    usageCaseDev: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="5" width="14" height="10" rx="1.5" />
        <path d="M4 17h16" />
        <path d="M8 8h8M8 11h5" />
      </svg>
    `,
    usageCaseLlm: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M9 7h6M9 10h6M9 13h4M9 16h5" />
      </svg>
    `,
    usageCaseShop: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 10h12l1.5 11H4.5L6 10Z" />
        <path d="M9 10V8a3 3 0 0 1 6 0v2" />
      </svg>
    `,
    laptopFlow: `
      <svg viewBox="0 0 48 40" aria-hidden="true">
        <rect x="9" y="8" width="30" height="19" rx="2.2" />
        <path d="M5 33h38" />
        <path d="M20 30h8" opacity="0.45" />
      </svg>
    `,
    clipboardFlow: `
      <svg viewBox="0 0 40 44" aria-hidden="true">
        <rect x="10" y="4" width="20" height="34" rx="3.2" />
        <path d="M16 9.5h8" opacity="0.35" />
        <path d="M14 16h12M14 20.5h12M14 25h9.5M14 29.5h12" />
        <path d="M27 6l3-2.5M29 8.5l3.2-1.8" opacity="0.55" />
      </svg>
    `,
    tapFlow: `
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <path d="M22 7v15.5" />
        <path d="M22 7a3.8 3.8 0 0 1 7.6 0v11.2" />
        <path d="M29.6 18.2a3.4 3.4 0 0 1 6.8 0v6.8c0 6.2-3.6 10.2-10 10.2h-4.2a7.2 7.2 0 0 1-5.8-3l-5.6-7.8a2.8 2.8 0 0 1 4.3-3.5l4.8 4.9" />
        <path d="M14.5 6 12 3.8M33.5 7.2l2.6-2M9 14.5H6" opacity="0.55" />
      </svg>
    `,
    checkFlow: `
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="17.5" />
        <path d="m14 22.2 4.8 4.8 10.6-11.4" />
      </svg>
    `,
  };

  const tapFlowStepsEn = [
    {
      number: "01",
      title: "Copy on<br />Mac",
      iconSrc: ASSETS.flowIconMac,
      alt: "Copy on Mac",
    },
    {
      number: "02",
      title: "Added to<br />your phone",
      iconSrc: ASSETS.flowIconPhone,
      alt: "Copied content is added to your phone",
      labelAccent: true,
    },
    {
      number: "03",
      title: "Tap to paste<br />on Mac",
      iconSrc: ASSETS.flowIconTap,
      alt: "Tap a phone card to paste on Mac",
    },
  ];

  const tapFlowStepsJa = [
    {
      number: "01",
      title: "Macで<br />コピー",
      iconSrc: ASSETS.flowIconMac,
      alt: "Macでコピーする",
    },
    {
      number: "02",
      title: "スマホに<br />自動表示",
      iconSrc: ASSETS.flowIconPhone,
      alt: "コピーした内容がスマホへ自動表示される",
      labelAccent: true,
    },
    {
      number: "03",
      title: "タップして<br />Macへペースト",
      iconSrc: ASSETS.flowIconTap,
      alt: "スマホのカードをタップしてMacへペーストする",
    },
  ];

  /** Tap to Paste セクション用（スクリーンショット4枚・従来レイアウト） */
  const tapPasteSteps = [
    {
      number: "1",
      title: "Macでコピー",
      image: ASSETS.stepCopy,
      alt: "Macでテキストをコピーする画面",
    },
    {
      number: "2",
      title: "スマホにカードが<br />自動追加",
      image: ASSETS.stepAdd,
      alt: "スマホにコピー履歴カードが追加される画面",
    },
    {
      number: "3",
      title: "必要なカードをタップ",
      image: ASSETS.stepTap,
      alt: "スマホのカードをタップする画面",
    },
    {
      number: "4",
      title: "Macに即ペースト",
      image: ASSETS.stepPaste,
      alt: "Macへ即座にペーストされる画面",
    },
  ];


  const benefits = [
    {
      icon: icon.eye,
      title: "横に置いて確認",
      text: "必要な履歴が視界に残り、<br />作業中の画面を隠しません。",
    },
    {
      icon: icon.tapFlow,
      title: "タップで貼り付け",
      text: "カードに触れるだけで、<br />Macへすぐにペースト。",
    },
    {
      icon: icon.media,
      title: "画像もそのまま",
      text: "テキスト、URL、スクショまで<br />手元に並べておけます。",
    },
    {
      icon: icon.lock,
      title: "ローカルで同期",
      text: "同じWi-Fi内でつながり、<br />コピー履歴をクラウドへ出しません。",
    },
  ];

  const features = [
    {
      eyebrow: "残す",
      title: "コピー履歴を、手元に。",
      image: ASSETS.featureHistory,
      alt: "クリップボード履歴画面",
      text: "テキスト、URL、画像を自動保存。<br />必要なカードをスマホ側ですぐ見つけられます。",
    },
    {
      eyebrow: "残す",
      title: "大事なものだけ、残す。",
      image: ASSETS.featureFavorite,
      alt: "お気に入り保存画面",
      text: "よく使う定型文やリンクを保存。<br />一度まとめれば、次から探す時間を減らせます。",
    },
    {
      eyebrow: "編集する",
      title: "撮ったスクショを、その場で整える。",
      image: ASSETS.featureScan,
      alt: "MacをキャプチャするSCAN画面",
      text: "不要な部分をトリミングし、伝えたい箇所にペン入れ。<br />編集した画像はそのまま履歴に残し、必要なときにMacへ戻せます。<br /><small>ペン入れ・トリミングはProプラン以上で利用可能</small>",
      anchorId: "screenshot-editing",
      wide: true,
      video: {
        id: FEATURE_SCREENSHOT_VIDEO_YT_ID,
        title: "SideClip ペン入れ・トリミングデモ動画",
        label: "ペン入れ・トリミングを動画で見る",
        ariaLabel: "ペン入れ・トリミングのデモ動画を再生する",
      },
    },
    {
      eyebrow: "見つける",
      title: "増えた履歴も、すぐ見つかる。",
      image: ASSETS.featureSearch,
      alt: "検索でコピー履歴やスクショを探す画面",
      text: "期間・キーワード・画像内の文字から検索。<br />うろ覚えの言葉でも、目当てのカードを見つけられます。<br /><small>画像内テキスト検索はProプラン以上で利用可能</small>",
    },
    {
      eyebrow: "再利用する",
      title: "コピーした内容を、すぐTodoに。",
      image: ASSETS.featureTodo,
      alt: "Todoモード画面",
      text: "Macでコピーした内容を、スマホで右へスワイプ。<br />すぐTodoカードにできます。<br /><small>Proプラン以上で利用可能</small>",
    },
  ];

  const trustItems = [
    [icon.gift, "Freeプランでお試し可能"],
    [icon.checkCircle, "より多機能なProプラン/Ultraプランも"],
  ];

  function renderMiniFlow() {
    const steps = isJapaneseLanding() ? tapFlowStepsJa : tapFlowStepsEn;
    return steps
      .map((step, index) => {
        const labelClass = step.labelAccent ? " step-card__label--accent" : "";
        const plusClass = step.plusBadge ? " step-card__icon-ring--plus" : "";
        const iconInner = step.iconSrc
          ? `<img class="flow-step-icon-img" src="${step.iconSrc}" alt="${step.alt}" width="56" height="56" loading="lazy" decoding="async" />`
          : `<span class="flow-icon flow-icon--svg flow-icon--tap-step ${step.flowIconExtra || ""}" aria-hidden="true">${step.svg}</span>`;
        const item = `
          <li class="step-card step-card--infographic mini-flow__step interactive-card" data-flow-index="${index}">
            <div class="step-card__inner">
              <span class="step-card__num" aria-hidden="true">${step.number}</span>
              <div class="step-card__icon-ring${plusClass}">
                ${iconInner}
              </div>
              <p class="step-card__label${labelClass}">${step.title}</p>
            </div>
          </li>`;
        const arrow =
          index < steps.length - 1
            ? `<li class="flow-arrow" aria-hidden="true"><span class="flow-arrow__glyph">→</span></li>`
            : "";
        return item + arrow;
      })
      .join("");
  }

  function renderSteps() {
    return tapPasteSteps
      .map(
        (step, index) => `
          <li class="step-card interactive-card" data-step-index="${index}">
            <h3><span>${step.number}</span>${step.title}</h3>
            <img src="${step.image}" alt="${step.alt}" loading="lazy" decoding="async" />
          </li>
        `
      )
      .join("");
  }

  function renderBenefits() {
    return benefits
      .map(
        (benefit, index) => `
          <article class="benefit-item interactive-card">
            <div class="round-icon" aria-hidden="true">
              ${benefit.icon}
            </div>
            <h3>${benefit.title}</h3>
            <p>${benefit.text}</p>
          </article>
        `
      )
      .join("");
  }

  function renderClipboardDifferenceFigure() {
    return `
      <figure class="clipboard-shift__figure">
        <figcaption class="clipboard-shift__figure-legend">
          <span class="clipboard-shift__figure-legend-item clipboard-shift__figure-legend-item--before">
            <span class="clipboard-shift__figure-legend-kicker">Before</span>
            <span class="clipboard-shift__figure-legend-copy">画面内へ呼び出す</span>
          </span>
          <span class="clipboard-shift__figure-legend-item clipboard-shift__figure-legend-item--after">
            <span class="clipboard-shift__figure-legend-kicker">After</span>
            <span class="clipboard-shift__figure-legend-copy">Macの横に置く</span>
          </span>
        </figcaption>
        <button
          type="button"
          class="clipboard-shift__panel feature-zoom-trigger"
          data-feature-image-src="${ASSETS.clipboardDifference}"
          data-feature-image-alt="一般的なクリップボード管理とSideClipのBefore・After比較"
          aria-label="一般的なクリップボード管理とSideClipのBefore・After比較画像を拡大表示"
        >
          ${renderModernPicture({
            src: ASSETS.clipboardDifference,
            widths: [640, 1200],
            sizes: "(max-width: 680px) 100vw, 1200px",
            width: 1200,
            height: 669,
            alt: "一般的なクリップボード管理とSideClipのBefore・After比較",
            loading: "lazy",
          })}
        </button>
      </figure>
    `;
  }

  function renderClipboardShiftSection() {
    return `
      <section class="clipboard-shift" aria-labelledby="clipboard-shift-title">
        <div class="clipboard-shift__reveal reveal">
          <div class="reveal__head">
            <p class="clipboard-shift__eyebrow">SideClip Difference</p>
            <h2 id="clipboard-shift-title" class="clipboard-shift__title">
              Macの横に、<br />
              コピー履歴の<br class="clipboard-shift__title-break-mobile" />置き場を。
            </h2>
            <p class="clipboard-shift__lead">
              一般的なクリップボード管理は、履歴をMac画面の中へ呼び出します。<br />
              SideClipは、履歴そのものを横のスマホへ移します。
            </p>
          </div>
          <div class="reveal__rest">
            <div class="clipboard-shift__prose">
              <div class="clipboard-shift__compare">
                <div class="clipboard-shift__compare-block clipboard-shift__compare-block--others">
                  <p class="clipboard-shift__prose-title">画面内で呼び出す</p>
                  <ul class="clipboard-shift__bullets">
                    <li>履歴パネルが作業画面に重なる。</li>
                    <li>ペーストのたびに視線とポインターが移動する。</li>
                    <li>ショートカットや設定を思い出す負担が残る。</li>
                  </ul>
                </div>
                <div class="clipboard-shift__compare-block clipboard-shift__compare-block--sideclip">
                  <p class="clipboard-shift__prose-title clipboard-shift__prose-title--sideclip">横に置く</p>
                  <p class="clipboard-shift__emphasis">
                    <span class="clipboard-shift__emphasis-lead">履歴は、Macの横に。</span><br />
                    Macの作業を見たまま、スマホのカードをタップしてペースト。
                  </p>
                  <ul class="clipboard-shift__bullets clipboard-shift__bullets--sideclip">
                    <li>コピー履歴はスマホ側に常時表示。</li>
                    <li>カードをタップするとMacへすぐペースト。</li>
                    <li>作業画面を隠さず、集中を保てる。</li>
                  </ul>
                </div>
              </div>
            </div>
            ${renderClipboardDifferenceFigure()}
          </div>
        </div>
      </section>
    `;
  }

  function renderFeatures() {
    return features
      .map(
        (feature) => {
          const cardClass = `${feature.wide ? " feature-card--wide" : ""}${feature.video ? " feature-card--has-video" : ""}`;
          const imageSizes = feature.wide ? "(max-width: 680px) 100vw, 980px" : "(max-width: 680px) 100vw, 50vw";
          const eyebrow = feature.anchorId === "screenshot-editing"
            ? `<p class="feature-card__eyebrow screenshot-flow-label screenshot-flow-label--feature"><span class="screenshot-flow-label__text">整える</span></p>`
            : `<p class="feature-card__eyebrow">${feature.eyebrow}</p>`;
          return `
          <article class="feature-card${cardClass} interactive-card"${feature.anchorId ? ` id="${feature.anchorId}"` : ""}>
            ${eyebrow}
            <h3>${feature.title}</h3>
            <p class="feature-card__copy">${feature.text}</p>
            <button
              type="button"
              class="feature-card__panel feature-zoom-trigger"
              data-feature-image-src="${feature.image}"
              data-feature-image-alt="${feature.alt}"
              aria-label="${feature.title}の画像を拡大表示"
            >
              ${renderModernPicture({
                src: feature.image,
                widths: [640, 1200],
                sizes: imageSizes,
                className: "feature-card__image",
                alt: feature.alt,
                loading: "lazy",
              })}
            </button>
            ${feature.video ? `
            <button
              type="button"
              class="feature-card__video-trigger"
              data-youtube-id="${feature.video.id}"
              data-video-title="${feature.video.title}"
              data-cta-id="feature_screenshot_video_play"
              data-cta-section="feature_screenshot_video"
              aria-label="${feature.video.ariaLabel}"
            >
              <span class="feature-card__video-thumb" aria-hidden="true">
                <img
                  src="https://i.ytimg.com/vi/${feature.video.id}/hqdefault.jpg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span class="feature-card__video-play-icon" aria-hidden="true"></span>
              </span>
              <span class="feature-card__video-copy">
                <span class="feature-card__video-kicker">Demo Video</span>
                <span class="feature-card__video-label">${feature.video.label}</span>
              </span>
            </button>
            ` : ""}
          </article>
        `;
        }
      )
      .join("");
  }

  function renderTrustItems() {
    return trustItems
      .map(
        ([svg, label]) => `
          <li>
            ${svg}
            ${label}
          </li>
        `
      )
      .join("");
  }

  function structuredOffer(name, price, priceCurrency, billingPeriod, market) {
    const offer = {
      "@type": "Offer",
      name: `${name} (${market === "jp" ? "Japan" : "Outside Japan"})`,
      price: String(price),
      priceCurrency,
      url: isJapaneseLanding() ? "https://sideclip.app/ja/plans/" : "https://sideclip.app/plans/",
      description: billingPeriod,
      availability: "https://schema.org/InStock",
    };
    if (market === "jp") {
      offer.eligibleRegion = { "@type": "Country", name: "JP" };
    } else {
      offer.ineligibleRegion = { "@type": "Country", name: "JP" };
    }
    return offer;
  }

  function structuredText(element) {
    if (!element) return "";
    const clone = element.cloneNode(true);
    clone.querySelectorAll("br, p, li, dt, dd").forEach((node) => node.append(" "));
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  function syncStructuredData(root = document.querySelector("#root")) {
    if (!root) return;
    root.querySelectorAll("script[data-sideclip-structured-data]").forEach((script) => script.remove());

    const isJapanese = isJapaneseLanding();
    const freeDescription = isJapanese ? "無料" : "Free forever";
    const monthlyDescription = isJapanese ? "月額プラン" : "Monthly subscription";
    const faqEntities = Array.from(root.querySelectorAll(".faq__item")).map((item) => ({
      "@type": "Question",
      name: structuredText(item.querySelector(".faq__summary")),
      acceptedAnswer: {
        "@type": "Answer",
        text: structuredText(item.querySelector(".faq__answer")),
      },
    })).filter((item) => item.name && item.acceptedAnswer.text);

    const softwareApplication = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": "https://sideclip.app/#software",
      name: "SideClip",
      applicationCategory: "ProductivityApplication",
      applicationSubCategory: "Clipboard manager",
      operatingSystem: "macOS 26 or later on Apple Silicon",
      softwareRequirements: "Apple Silicon Mac and a phone or tablet connected to the same Wi-Fi network",
      description: isJapanese
        ? "Macのコピー履歴をスマホやタブレットに常時表示し、必要なカードをタップしてMacへペーストできるクリップボードアプリです。"
        : "A Mac clipboard app that keeps copied text and images visible on a phone or tablet, ready to paste back into your Mac.",
      url: isJapanese ? "https://sideclip.app/ja/" : "https://sideclip.app/",
      downloadUrl: "https://sideclip.app/download/",
      image: isJapanese
        ? "https://sideclip.app/assets/ogp-1200x630.jpg"
        : "https://sideclip.app/assets/i18n/en/ogp-1200x630.jpg",
      inLanguage: isJapanese ? "ja" : "en",
      offers: [
        structuredOffer("SideClip Free", 0, "JPY", freeDescription, "jp"),
        structuredOffer("SideClip Pro", 300, "JPY", monthlyDescription, "jp"),
        structuredOffer("SideClip Ultra", 480, "JPY", monthlyDescription, "jp"),
        structuredOffer("SideClip Free", 0, "USD", freeDescription, "global"),
        structuredOffer("SideClip Pro", 2.99, "USD", monthlyDescription, "global"),
        structuredOffer("SideClip Ultra", 4.99, "USD", monthlyDescription, "global"),
      ],
    };

    [
      softwareApplication,
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqEntities },
    ].forEach((data, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.sideclipStructuredData = index === 0 ? "software" : "faq";
      script.textContent = JSON.stringify(data);
      root.appendChild(script);
    });
  }

  function renderApp() {
    const isJapanese = isJapaneseLanding();
    return `
      <main class="page-shell">
        <header class="hero__header">
          <div class="hero__header-brand">
            <a class="brand hero__brand" href="#" aria-label="SideClip（Macのクリップボードアプリ）">
              <span>Side</span><strong>Clip</strong>
            </a>
            <p class="hero__tagline" title="Clipboard app for Mac" aria-hidden="true">
              <span class="hero__tagline-main" lang="en">Clipboard app</span>
              <span class="hero__tagline-platform" lang="en">for Mac</span>
            </p>
          </div>
          <nav class="ja-desktop-nav" aria-label="主要メニュー">
            <a href="#concept-video">デモ</a>
            <a href="#features-title">主な機能</a>
            <a href="/plans">料金</a>
          </nav>
          <div class="hero__header-actions">
            ${renderLanguageSwitch()}
            <a
              class="ja-header-download"
              href="${MAC_DOWNLOAD_URL}"
              data-download-link
              data-cta-id="header_download"
              data-cta-section="header"
            >無料ダウンロード</a>
            <button
              type="button"
              class="hero__menu-button"
              aria-label="セクションメニューを開く"
              aria-controls="section-drawer"
              aria-expanded="false"
              data-section-menu-trigger
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </header>
        <section class="hero" aria-labelledby="hero-title">
          <div class="hero__banner">
            <div class="hero__banner-stack">
              <div class="hero__banner-motion">
                <div class="hero__visual-wrap">
                  ${renderModernPicture({
                    src: ASSETS.heroMain,
                    widths: [800, 1600],
                    sizes: "100vw",
                    className: "hero__visual",
                    width: 1600,
                    height: 533,
                    alt: "MacとスマホでSideClipを使うイメージ",
                    fetchpriority: "high",
                    onerror: `this.onerror=null;this.src='${ASSETS.heroMainFallback}';`,
                  })}
                  <div class="hero__visual-layers" aria-hidden="true">
                    <div class="hero__sync-graphic" aria-hidden="true">
                      <div
                        class="sync-graphic__row hero__sync-row"
                        style="--sync-line-left: 45.5px; --sync-line-w: 189.96px;"
                      >
                        ${syncDataLineRail}
                      </div>
                    </div>
                    <img
                      class="hero__visual-layer hero__visual-layer--phone"
                      src="${ASSETS.heroPhone}"
                      srcset="${ASSETS.heroPhoneSrcset}"
                      width="682"
                      height="1024"
                      sizes="(max-width: 2172px) 36vw, 780px"
                      alt=""
                      decoding="async"
                    />
                  </div>
                </div>
                <div class="hero__banner-overlay" aria-label="SideClipの紹介">
                  <p class="hero__banner-eyebrow hero__banner-overlay-line hero__banner-overlay-line--eyebrow">
                    SideClip for Mac
                  </p>
                  <h1 id="hero-title" class="hero__banner-overlay-lead hero__banner-overlay-line hero__banner-overlay-line--lead">
                    Macのコピー履歴を<br />画面の<span class="hero__banner-accent">「外」</span>へ。
                  </h1>
                  <p class="hero__banner-overlay-sub hero__banner-overlay-line hero__banner-overlay-line--sub">
                    スマホを横に置くだけ。<br />コピーしたものが、いつも視界に。
                  </p>
                  <div class="hero__banner-actions" aria-label="ヒーロー操作">
                    <a
                      class="hero__banner-primary"
                      href="${MAC_DOWNLOAD_URL}"
                      data-download-link
                      data-cta-id="hero_banner_download"
                      data-cta-section="hero"
                      aria-label="SideClipをMacで無料ダウンロード"
                    >
                      Macで無料ダウンロード
                    </a>
                  </div>
                  <p class="hero__banner-note">macOS 26以降・Apple Silicon搭載Macに対応</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="ja-mobile-hero-cta" aria-label="SideClipを始める">
          <a
            href="${MAC_DOWNLOAD_URL}"
            data-download-link
            data-cta-id="mobile_hero_download"
            data-cta-section="hero"
          >Macで無料ダウンロード</a>
          <p>アカウント不要・Freeプランあり</p>
        </div>

        <div class="section-drawer" id="section-drawer" aria-hidden="true">
          <button type="button" class="section-drawer__backdrop" aria-label="メニューを閉じる" data-section-menu-close></button>
          <nav class="section-drawer__panel" aria-label="ページメニュー">
            ${isJapanese ? `
              <a href="#hero-title" data-section-menu-link>トップ</a>
              <a href="#concept-video" data-section-menu-link>製品デモ</a>
              <a href="#features-title" data-section-menu-link>主な機能</a>
              <a href="#usage-scenes-title" data-section-menu-link>使用シーン</a>
              <a href="#local-title" data-section-menu-link>ローカル同期</a>
              <a href="/plans">料金プラン</a>
              <a href="#faq" data-section-menu-link>FAQ</a>
              <a href="#download" data-section-menu-link>ダウンロード</a>
            ` : `
              <a href="#hero-title" data-section-menu-link>トップ</a>
              <a href="#concept-video" data-section-menu-link>Product demo</a>
              <a href="#features-title" data-section-menu-link>主な機能</a>
              <a href="#usage-scenes-title" data-section-menu-link>使用シーン</a>
              <a href="#local-title" data-section-menu-link>ローカル同期</a>
              <a href="/plans">料金プラン</a>
              <a href="#faq" data-section-menu-link>FAQ</a>
              <a href="#download" data-section-menu-link>ダウンロード</a>
            `}
          </nav>
        </div>

        <div class="content-overlay">
        <div class="hero__content">
          <div class="reveal__head">
            <p class="hero__content-eyebrow">How It Works</p>
            <h2 class="hero__banner-copy">コピーして、選んで、<br />すぐ貼れる。</h2>
          </div>
          <div class="reveal__rest">
          <p class="hero__hook">Macでコピーすると、スマホにカードが自動追加。<br />必要なカードをタップすれば、Macへそのままペーストできます。</p>
          <div class="hero__infographic-card">
            <h2 class="hero__infographic-title">
              <span class="tap-infographic__title-stack">
                <span class="tap-infographic__title-line tap-infographic__title-line--primary">
                  ${isJapanese ? "一度つなげば、<br />3ステップですぐ使えます。" : "Connect once.<br />Then paste in three steps."}
                </span>
              </span>
            </h2>
            <div class="hero-flow-sync" id="hero-flow-sync" data-hero-flow-step="0" aria-hidden="true">
              <div class="hero-flow-sync__frame">
                <img
                  class="hero-flow-sync__base"
                  src="${ASSETS.heroFlowInfographic}"
                  width="835"
                  height="386"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <svg
                  class="hero-flow-sync__overlay"
                  viewBox="84 178 835 386"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <defs>
                    <marker
                      id="heroFlowSyncArrowhead"
                      markerWidth="44"
                      markerHeight="44"
                      refX="12.667"
                      refY="22"
                      orient="auto"
                      markerUnits="userSpaceOnUse"
                      overflow="visible"
                    >
                      <path d="M0,3 L38,22 L0,41 Z" fill="currentColor" />
                    </marker>
                  </defs>
                  <rect
                    class="hero-flow-sync__mac-mask"
                    x="86"
                    y="180"
                    width="485"
                    height="381"
                    rx="0"
                  />
                  <image
                    class="hero-flow-sync__mac-raster"
                    href="${ASSETS.heroFlowMacLaptop}"
                    x="90"
                    y="184"
                    width="477"
                    height="373"
                    preserveAspectRatio="xMidYMid meet"
                  />
                  <rect
                    class="hero-flow-sync__phone-mask"
                    x="732"
                    y="163"
                    width="186"
                    height="391"
                    rx="0"
                  />
                  <image
                    class="hero-flow-sync__phone-raster"
                    href="${ASSETS.heroFlowPhoneClipboard}"
                    x="737"
                    y="169"
                    width="175"
                    height="318"
                    preserveAspectRatio="xMidYMid meet"
                  />
                  <image
                    class="hero-flow-sync__tap-hit"
                    href="${ASSETS.flowIconTapHeroFill}"
                    x="750"
                    y="350"
                    width="180"
                    height="180"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  />
                  <path
                    class="hero-flow-sync__path hero-flow-sync__path--to-phone"
                    marker-end="url(#heroFlowSyncArrowhead)"
                    d="M 433 274 C 548 192 702 173 776 253"
                  />
                  <path
                    class="hero-flow-sync__path hero-flow-sync__path--to-mac"
                    marker-end="url(#heroFlowSyncArrowhead)"
                    d="M 799.8 413 C 632 506 415 396 313 344"
                  />
                  <text
                    class="hero-flow-sync__cap-label hero-flow-sync__cap-label--copy"
                    x="432"
                    y="284"
                    text-anchor="end"
                    dominant-baseline="middle"
                    aria-hidden="true"
                  >
                    Copy
                  </text>
                  <text
                    class="hero-flow-sync__cap-label hero-flow-sync__cap-label--paste"
                    x="224"
                    y="322"
                    text-anchor="start"
                    dominant-baseline="auto"
                    aria-hidden="true"
                  >
                    Paste
                  </text>
                </svg>
              </div>
            </div>
            <ol class="mini-flow" aria-label="SideClipの流れ">
              ${renderMiniFlow()}
            </ol>
          </div>

          <div class="hero-scene-card" aria-labelledby="hero-scene-title">
            <h2 id="hero-scene-title" class="hero-scene-card__title">いつもの作業に、そのままなじむ。</h2>
            <ul class="hero-scene-card__list">
              <li class="hero-scene-card__item">
                <span class="hero-scene-card__icon" aria-hidden="true">
                  <img
                    src="${ASSETS.heroIconSceneResearch}"
                    srcset="${ASSETS.heroIconSceneResearch} 1x, ${ASSETS.heroIconSceneResearch} 2x"
                    width="176"
                    height="176"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <div class="hero-scene-card__body">
                  <p class="hero-scene-card__item-title">リサーチ・資料作成</p>
                  <p class="hero-scene-card__item-text">集めた情報を横に置き、流れを止めずにまとめる。</p>
                </div>
              </li>
              <li class="hero-scene-card__item">
                <span class="hero-scene-card__icon" aria-hidden="true">
                  <img
                    src="${ASSETS.heroIconSceneChat}"
                    srcset="${ASSETS.heroIconSceneChat} 1x, ${ASSETS.heroIconSceneChat} 2x"
                    width="176"
                    height="176"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <div class="hero-scene-card__body">
                  <p class="hero-scene-card__item-title">チャット・メール</p>
                  <p class="hero-scene-card__item-text">定型文やリンクを、必要な瞬間にすぐ貼れる。</p>
                </div>
              </li>
              <li class="hero-scene-card__item">
                <span class="hero-scene-card__icon" aria-hidden="true">
                  <img
                    src="${ASSETS.heroIconSceneIdea}"
                    srcset="${ASSETS.heroIconSceneIdea} 1x, ${ASSETS.heroIconSceneIdea} 2x"
                    width="176"
                    height="176"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <div class="hero-scene-card__body">
                  <p class="hero-scene-card__item-title">アイデア・メモ整理</p>
                  <p class="hero-scene-card__item-text">思いついた断片を残し、あとで自然に見返せる。</p>
                </div>
              </li>
            </ul>
          </div>

          <section class="trust-summary" aria-labelledby="trust-summary-title">
            <div class="trust-summary__head">
              <p class="trust-summary__eyebrow">Trust &amp; Safety</p>
              <h2 id="trust-summary-title">はじめる前に知っておきたい、4つの安心。</h2>
            </div>
          <ul class="hero-highlight-row" aria-label="SideClipをはじめる前に知っておきたい4つの安心">
            <li class="hero-highlight-card">
              <span class="hero-highlight-card__icon" aria-hidden="true">
                <img
                  src="${ASSETS.heroIconHighlightLock}"
                  srcset="${ASSETS.heroIconHighlightLock} 1x, ${ASSETS.heroIconHighlightLock} 2x"
                  width="176"
                  height="176"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <div class="hero-highlight-card__body">
                <p class="hero-highlight-card__title">履歴データはMac内に保存</p>
                <p class="hero-highlight-card__text">保存先はMac。クラウドには保管しません。</p>
              </div>
            </li>
            <li class="hero-highlight-card">
              <span class="hero-highlight-card__icon" aria-hidden="true">
                <img
                  src="${ASSETS.heroIconHighlightBolt}"
                  srcset="${ASSETS.heroIconHighlightBolt} 1x, ${ASSETS.heroIconHighlightBolt} 2x"
                  width="176"
                  height="176"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <div class="hero-highlight-card__body">
                <p class="hero-highlight-card__title">アカウント登録なしで開始</p>
                <p class="hero-highlight-card__text">メールアドレス・ログインは不要です。</p>
              </div>
            </li>
            <li class="hero-highlight-card">
              <span class="hero-highlight-card__icon" aria-hidden="true">
                <img
                  src="${ASSETS.heroIconHighlightQr}"
                  srcset="${ASSETS.heroIconHighlightQr} 1x, ${ASSETS.heroIconHighlightQr} 2x"
                  width="176"
                  height="176"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <div class="hero-highlight-card__body">
                <p class="hero-highlight-card__title">QR認証した端末だけ接続</p>
                <p class="hero-highlight-card__text">同じWi-Fiでも、認証した端末だけ接続します。</p>
              </div>
            </li>
            <li class="hero-highlight-card">
              <span class="hero-highlight-card__icon hero-highlight-card__icon--notarized" aria-hidden="true">
                ${icon.checkCircle}
              </span>
              <div class="hero-highlight-card__body">
                <p class="hero-highlight-card__title">Apple署名・公証済み</p>
                <p class="hero-highlight-card__text">署名・公証済みのDMGを配布しています。</p>
              </div>
            </li>
          </ul>
          </section>

          <ul class="hero-kpis" aria-label="SideClipで得られる効果">
            <li>Macアプリ＋スマホブラウザで利用</li>
            <li>iPhone・iPad・Androidに対応</li>
          </ul>
          <a class="download-button" href="${MAC_DOWNLOAD_URL}" data-download-link data-cta-id="hero_download" data-cta-section="hero" aria-label="SideClipをMacで無料ダウンロード">
            <!-- ${icon.download} -->
            Macで無料ダウンロード
          </a>
          <p class="os-note">Apple Silicon搭載のMacに対応</p>
          </div>
        </div>
        ${renderClipboardShiftSection()}
        <section id="concept-video" class="concept-video reveal" aria-labelledby="concept-video-title">
          <div class="concept-video__copy">
            <div class="reveal__head">
              <p class="concept-video__eyebrow">Product Demo</p>
              <h2 id="concept-video-title">SideClip体験を、<br />実際の操作で。</h2>
            </div>
            <div class="reveal__rest">
              <p>Macとスマホをつないで、コピー履歴を表示し、必要なカードをすぐにペースト。<br />SideClipでできることと操作の流れを、デモ映像でご覧いただけます。</p>
            </div>
          </div>
          <div class="reveal__rest concept-video__visual" aria-label="SideClipの基本機能を紹介するデモ動画（YouTube）">
            <div class="concept-video__embed concept-video__embed--poster">
              <button type="button" class="concept-video__facade" data-cta-id="concept_video_play" data-cta-section="concept_video" aria-label="SideClipの基本機能を紹介するデモ動画をYouTubeで再生する">
                <img
                  class="concept-video__poster"
                  src="https://i.ytimg.com/vi/${getConceptVideoId()}/maxresdefault.jpg"
                  alt=""
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                />
                <span class="concept-video__facade-ring" aria-hidden="true">
                  <svg class="concept-video__facade-triangle" viewBox="0 0 24 24" width="28" height="28" focusable="false">
                    <polygon points="8,5 8,19 19,12" fill="currentColor" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          ${renderConceptVideoChapters()}
          <div class="reveal__rest concept-video__cta">
            <a
              href="${MAC_DOWNLOAD_URL}"
              data-download-link
              data-cta-id="concept_video_download"
              data-cta-section="concept_video"
              aria-label="SideClipをMacで無料ダウンロード"
            >Macで無料ダウンロード</a>
            <p>アカウント不要・Freeプランですぐ試せます</p>
          </div>
        </section>

        <section class="benefits" aria-labelledby="benefits-title">
          <div class="benefits__reveal reveal">
            <div class="section-copy">
              <div class="reveal__head">
                <p class="screenshot-flow-label"><span class="screenshot-flow-label__text">SCANで撮る</span></p>
                <h2 id="benefits-title">スクショを、<br />デスクトップにためない。</h2>
              </div>
              <div class="reveal__rest">
                <p>
                  スマホのSCANボタンをタップするだけで、Macのスクショを撮影。<br />
                  撮った画像はSideClipのカードになり、デスクトップを散らかしません。
                </p>
              </div>
            </div>
            <div class="reveal__rest benefits-video-showcase">
              <div class="benefits-video-copy">
                <p class="benefits-video-copy__eyebrow">Screenshot Demo</p>
                <h3>SCANを、<br />1タップ。</h3>
                <p class="benefits-video-copy__text">
                  スマホのSCANボタンをタップすると、Macのスクショをすぐ撮影。連続で撮った画像も、SideClipのカードとして自動で並びます。
                </p>
                <p class="benefits-video-copy__text">
                  保存先はSideClipフォルダ。デスクトップをスクショで埋めず、必要な画像をカードからすぐ再利用できます。
                </p>
                <p class="benefits-video-copy__continuation"><a href="#screenshot-editing">次は、トリミング・ペン入れで<span class="benefits-video-copy__continuation-tail">スクショを整える&nbsp;<span aria-hidden="true">→</span></span></a></p>
              </div>
              <div class="benefits-video" aria-label="スクショ機能の紹介動画（YouTube）">
                <div class="benefits-video__embed benefits-video__embed--poster">
                  <button type="button" class="benefits-video__facade" data-cta-id="benefits_video_play" data-cta-section="benefits_video" aria-label="スクショ機能の紹介動画を再生する（YouTube）">
                    <img
                      class="benefits-video__poster"
                      src="https://i.ytimg.com/vi/${BENEFITS_VIDEO_YT_ID}/maxresdefault.jpg"
                      alt=""
                      width="1280"
                      height="720"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                    />
                    <span class="benefits-video__facade-ring" aria-hidden="true">
                      <svg class="benefits-video__facade-triangle" viewBox="0 0 24 24" width="28" height="28" focusable="false">
                        <polygon points="8,5 8,19 19,12" fill="currentColor" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="features" aria-labelledby="features-title">
          <div class="features__reveal reveal">
            <div class="reveal__head">
              <p class="features__eyebrow">Core Features</p>
              <h2 id="features-title">残す。見つける。<br />すぐ使う。</h2>
              <p class="features__lead">
                コピー履歴やスクショを保存し、検索して再利用。<br />
                必要なものへ、スマホからすぐ戻れます。
              </p>
            </div>
            <div class="reveal__rest">
            <div class="feature-grid">
              ${renderFeatures()}
            </div>
            </div>
          </div>
        </section>

        <section class="usage-scenes" aria-labelledby="usage-scenes-title">
          <div class="usage-scenes__reveal reveal">
            <div class="reveal__head">
              <p class="usage-scenes__eyebrow">Use Cases</p>
              <h2 id="usage-scenes-title">こんな作業で、<br />すぐ効く。</h2>
              <p class="usage-scenes__lead">
                繰り返し使うテキストや画像を、Macの横へ。<br />
                毎日の小さなコピペを短くします。
              </p>
            </div>
            <div class="reveal__rest">
            <div class="usage-scenes__cases">
              <article class="usage-scenes__case">
                <p class="usage-scenes__case-badge">
                  <span class="usage-scenes__case-badge-icon" aria-hidden="true">${icon.usageCaseDev}</span>
                  <span class="usage-scenes__case-badge-label">開発者・プログラマー</span>
                </p>
                <h3 class="usage-scenes__case-title">コードやコマンドを、<br />すぐ再利用。</h3>
                <p class="usage-scenes__case-text">
                  よく使うスニペットやURLを横に。エディタから離れず貼り付けられます。
                </p>
              </article>
              <article class="usage-scenes__case">
                <p class="usage-scenes__case-badge">
                  <span class="usage-scenes__case-badge-icon" aria-hidden="true">${icon.usageCaseLlm}</span>
                  <span class="usage-scenes__case-badge-label">AIツール（LLM）活用者</span>
                </p>
                <h3 class="usage-scenes__case-title">プロンプトを、<br />手元から呼び出す。</h3>
                <p class="usage-scenes__case-text">
                  定型プロンプトや前提文を保存。AIとのやり取りを止めずに進められます。
                </p>
              </article>
              <article class="usage-scenes__case">
                <p class="usage-scenes__case-badge">
                  <span class="usage-scenes__case-badge-icon" aria-hidden="true">${icon.usageCaseShop}</span>
                  <span class="usage-scenes__case-badge-label">フリマ・オークション・ECサイト出品者</span>
                </p>
                <h3 class="usage-scenes__case-title">出品文や返信を、迷わず貼る。</h3>
                <p class="usage-scenes__case-text">
                  商品説明、住所、返信文を保存。繰り返し作業の手間を減らします。
                </p>
              </article>
            </div>
            </div>
          </div>
        </section>

        <section class="local-sync" aria-labelledby="local-title">
          <div class="local-sync__reveal reveal">
            <div class="reveal__head">
              <p class="local-sync__eyebrow">Local Sync</p>
              <h2 id="local-title" class="local-sync__heading">大事なコピー履歴は、<br />クラウドに出さない。</h2>
              <p class="local-sync__lead">
                Macとスマホは、同じWi-Fi内で直接同期。<br />
                コピー履歴はMac内に残り、クラウドへ送りません。
              </p>
            </div>
            <div class="reveal__rest">
            <div class="sync-graphic" aria-hidden="true">
              <div class="sync-graphic__row">
                ${syncDataLineRail}
                <div class="device device--laptop"></div>
                <div class="sync-center">
                  <svg class="shield" viewBox="0 0 24 24">
                    <path d="M12 2.5 20 6v5.4c0 5-3.4 8.7-8 10.1-4.6-1.4-8-5.1-8-10.1V6l8-3.5Z" />
                    <path d="m8.3 12 2.3 2.3 5.1-5.4" />
                  </svg>
                  <svg class="wifi" viewBox="0 0 24 24">
                    <path d="M3.6 9.2a13.2 13.2 0 0 1 16.8 0" />
                    <path d="M6.8 12.8a8.2 8.2 0 0 1 10.4 0" />
                    <path d="M9.9 16.2a3.3 3.3 0 0 1 4.2 0" />
                    <circle cx="12" cy="20" r="1.15" />
                  </svg>
                </div>
                <div class="device device--phone"></div>
              </div>
              <p>同じWi-Fi内で直接同期</p>
            </div>
            <div class="local-sync__text">
              <div class="local-sync__points" aria-label="ローカル同期の安心ポイント">
                <article class="local-sync__point">
                  <h3>Mac内に保存</h3>
                  <p>履歴はMac側に保持。SideClipのクラウドへ送りません。</p>
                </article>
                <article class="local-sync__point">
                  <h3>同じWi-Fiで同期</h3>
                  <p>スマホやタブレットとは、同じWi-Fi内で直接つながります。</p>
                </article>
                <article class="local-sync__point">
                  <h3>QR認証した端末だけ</h3>
                  <p>QRコードで認証したスマホやタブレットだけが接続できます。</p>
                </article>
              </div>
              <div class="local-sync__detail-cta">
                <div class="local-sync__detail-copy">
                  <strong>接続とデータの守り方を詳しく確認</strong>
                  <span>暗号化通信、QR認証、共有時の注意点をまとめています。</span>
                </div>
                <a href="./security.html">セキュリティの詳細を見る</a>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section class="ja-pricing reveal" id="pricing-preview" aria-labelledby="pricing-preview-title">
          <div class="ja-pricing__inner">
            <div class="reveal__head ja-pricing__head">
              <p class="ja-pricing__eyebrow">Plans</p>
              <h2 id="pricing-preview-title">まずは無料。<br /><span class="ja-pricing__headline-line">必要になったら、<span class="ja-pricing__nowrap">アップグレード。</span></span></h2>
              <p>Freeプランはアカウント不要。有料プランは初回30日無料で、変更・解約はSideClipアプリ内から行えます。</p>
            </div>
            <div class="reveal__rest">
              <div class="ja-pricing__grid">
                <article class="ja-pricing__card" data-plan-tier="free">
                  <p class="ja-pricing__label">基本機能を試したい人へ</p>
                  <h3>Free</h3>
                  <p class="ja-pricing__price">¥0</p>
                  <p class="ja-pricing__daily ja-pricing__daily--empty" aria-hidden="true">&nbsp;</p>
                  <p class="ja-pricing__summary">コピー・スクショ履歴を無料で試し、Mac環境での動作を確認したい人向け。</p>
                  <div class="ja-pricing__card-actions">
                    <a
                      class="ja-pricing__card-cta"
                      href="${MAC_DOWNLOAD_URL}"
                      data-download-link
                      data-cta-id="pricing_free_download"
                      data-cta-section="pricing_preview"
                      aria-label="FreeプランをMacで無料ダウンロード"
                    >無料で始める</a>
                  </div>
                </article>
                <article class="ja-pricing__card ja-pricing__card--recommended" data-plan-tier="pro">
                  <p class="ja-pricing__label">仕事で毎日使いたい人へ</p>
                  <h3>Pro</h3>
                  <p class="ja-pricing__price">¥300<span>/月</span></p>
                  <p class="ja-pricing__daily">年額プラン ¥2,400<span>月あたり¥200・1日あたり約7円※</span></p>
                  <p class="ja-pricing__summary">Todo・画像編集・クイックペーストを使い、日々の作業を速くしたい人向け。</p>
                  <div class="ja-pricing__card-actions">
                    <a class="ja-pricing__card-link" href="/plans#comparison-heading" data-plan-interest="pro">Proの機能を見る →</a>
                    <a
                      class="ja-pricing__card-cta"
                      href="${MAC_DOWNLOAD_URL}"
                      data-download-link
                      data-cta-id="pricing_pro_trial"
                      data-cta-section="pricing_preview"
                      data-plan-interest="pro"
                      data-plan-interest-type="app_trial"
                      aria-label="SideClipアプリでProプランを30日無料で試す"
                    >アプリで30日無料</a>
                  </div>
                </article>
                <article class="ja-pricing__card" data-plan-tier="ultra">
                  <p class="ja-pricing__label">履歴を長く残したい人へ</p>
                  <h3>Ultra</h3>
                  <p class="ja-pricing__price">¥480<span>/月</span></p>
                  <p class="ja-pricing__daily">年額プラン ¥3,600<span>月あたり¥300・1日あたり約10円※</span></p>
                  <p class="ja-pricing__summary">無制限保存・CSV・バックアップで、履歴を長く管理したい人向け。</p>
                  <div class="ja-pricing__card-actions">
                    <a class="ja-pricing__card-link" href="/plans#comparison-heading" data-plan-interest="ultra">Ultraの機能を見る →</a>
                    <a
                      class="ja-pricing__card-cta"
                      href="${MAC_DOWNLOAD_URL}"
                      data-download-link
                      data-cta-id="pricing_ultra_trial"
                      data-cta-section="pricing_preview"
                      data-plan-interest="ultra"
                      data-plan-interest-type="app_trial"
                      aria-label="SideClipアプリでUltraプランを30日無料で試す"
                    >アプリで30日無料</a>
                  </div>
                </article>
              </div>
              <div class="ja-pricing__action">
                <div class="ja-pricing__action-copy">
                  <p class="ja-pricing__action-kicker">迷ったら、まずFreeから。</p>
                  <p>アカウント登録なし。Macへインストールして、すぐに試せます。</p>
                </div>
                <div class="ja-pricing__action-links">
                  <a
                    class="ja-pricing__action-download"
                    href="${MAC_DOWNLOAD_URL}"
                    data-download-link
                    data-cta-id="pricing_download"
                    data-cta-section="pricing_preview"
                    aria-label="SideClipをMacで無料ダウンロード"
                  >Macで無料ダウンロード</a>
                  <a class="ja-pricing__link" href="/plans" data-plan-comparison-link>プランの機能を比較する</a>
                </div>
              </div>
              <p class="ja-pricing__billing-note"><span>※日額は年額料金÷365日の目安です。請求は年額です。</span><span>料金の詳細はFAQをご覧ください。</span></p>
            </div>
          </div>
        </section>

        <section class="faq reveal" id="faq" aria-labelledby="faq-title">
          <div class="faq__inner">
            <div class="reveal__head">
              <p class="faq__eyebrow">FAQ</p>
              <h2 id="faq-title" class="faq__title">FAQ</h2>
              <p class="faq__lead">導入前に知っておきたいことを、短くまとめました。</p>
            </div>
            <div class="reveal__rest">

            <div class="faq__group">
              <h3 class="faq__group-title">導入について</h3>
              <div class="faq__list-wrap">
                <details class="faq__item">
                  <summary class="faq__summary">対応しているOSやデバイスを教えてください。</summary>
                  <div class="faq__answer">
                    <ul class="faq__bullets">
                      <li>
                        <strong>Mac：</strong><br />
                        macOS 26以降を搭載したApple Silicon Macで開発・動作確認しています。
                      </li>
                      <li>
                        <strong>スマホ・タブレット：</strong><br />
                        iOS/Android/iPadOSなど、Webブラウザが動けば基本的に動作します。<br />
                        <span class="faq__note">（端末の性能により動作が重くなる場合もあります）</span><br />
                        <span class="faq__note">Safari/Chromeで開発・動作確認済み。<br />セキュリティのためにも、最新バージョンのブラウザをご使用ください。</span>
                      </li>
                    </ul>
                  </div>
                </details>
                <details class="faq__item">
                  <summary class="faq__summary">無料で利用できますか？有料プランとの違いは何ですか？</summary>
                  <div class="faq__answer">
                    <p>Freeプランで基本機能が無料でご利用いただけます。<br />有料プランの前にご自身の環境で動作確認をお勧めいたします。</p>
                    <p>Proプラン・Ultraプランは、より便利な機能が解放されます。</p>
                    <p class="faq__plans-more">
                      <a href="/plans">プラン別にできること・料金の詳細を見る →</a>
                    </p>
                  </div>
                </details>
                <details class="faq__item">
                  <summary class="faq__summary">各プランの料金はいくらですか？</summary>
                  <div class="faq__answer">
                    <p>継続的なアプリ改善・新機能開発の原資として有料プランを設けています。<br />Freeプランで気に入ってくださった方は、より使いやすく多機能な有料プランの検討をお願いいたします。</p>
                    <dl class="faq__plans">
                      <div class="faq__plan">
                        <dt>Freeプラン</dt>
                        <dd>
                          <span class="faq__plan-price">無料</span><br />
                          SideClipをご体感ください。ご自身の環境で動作確認をお願いいたします。
                        </dd>
                      </div>
                      <div class="faq__plan">
                        <dt>Proプラン</dt>
                        <dd>
                          <span class="faq__plan-price">月額プラン：¥300<br />年額プラン：¥2,400</span><br />
                          Freeプランでは物足りない方へ。保存上限の増加やTodo機能など便利な機能が解放されます。
                        </dd>
                      </div>
                      <div class="faq__plan">
                        <dt>Ultraプラン</dt>
                        <dd>
                          <span class="faq__plan-price">月額プラン：¥480<br />年額プラン：¥3,600</span><br />
                          全機能解放・今後の新機能や改善のアップデートを最優先に提供します。
                        </dd>
                      </div>
                    </dl>
                    <p class="faq__plans-more">
                      <a href="/plans">プラン別にできること・料金の詳細を見る →</a>
                    </p>
                  </div>
                </details>
              </div>
            </div>

            <div class="faq__group">
              <h3 class="faq__group-title">使い方・制限について</h3>
              <div class="faq__list-wrap">
                <details class="faq__item">
                  <summary class="faq__summary">保存できるデータの種類やサイズに制限はありますか？</summary>
                  <div class="faq__answer">
                    <p>
                      あります。SideClipのコピー履歴データの肥大化防止と、動作が重くならないように以下の制限をかけています（アプリアップデートで変更する場合もあります）。
                    </p>
                    <ul class="faq__bullets">
                      <li>プレーンテキスト：1コピー 50KB まで</li>
                      <li>画像（JPG/PNG/TIFFなど）：1画像 10MB まで</li>
                      <li>その他のファイル：Mac内ファイルのリンクのみコピー（ファイルを移動するとリンクが切れます）</li>
                    </ul>
                  </div>
                </details>
                <details class="faq__item">
                  <summary class="faq__summary">保存できるカードの上限はありますか？</summary>
                  <div class="faq__answer">
                    <p>あります。プランによって保存上限が異なります。</p>
                    <p>詳しくはアプリインストール後、スマホ側画面に表示されるメニュー内の「プラン」をご確認ください。</p>
                    <p>
                      上限を超えた古いデータから自動削除されますが、「Favorite（お気に入り）」に登録したデータは自動削除されません。
                    </p>
                  </div>
                </details>
                <details class="faq__item">
                  <summary class="faq__summary">スマホのテザリングでも使えますか？</summary>
                  <div class="faq__answer">
                    <p>
                      テザリング環境でも利用できます。通信状況によっては、コピーやペーストの反映が遅くなる場合があります。
                    </p>
                  </div>
                </details>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section class="final-cta reveal" id="download" aria-labelledby="cta-title">
          <div class="final-cta__copy">
            <div class="reveal__head">
              <p class="final-cta__eyebrow">Download</p>
              <h2 id="cta-title">Macのコピー履歴を、<br />今日から画面の<span class="final-cta__mobile-break"><br /></span>「外」へ。</h2>
            </div>
            <div class="reveal__rest">
              <p>
                アカウント登録なしで、Freeプランから始められます。
              </p>
            </div>
          </div>
          <div class="reveal__rest final-cta__action">
            <a class="download-button download-button--light" href="${MAC_DOWNLOAD_URL}" data-download-link data-cta-id="final_download" data-cta-section="final_cta" aria-label="SideClipをMacで無料ダウンロード">
              <!-- ${icon.download} -->
              Macで無料ダウンロード
            </a>
            <p class="final-cta__requirements">macOS 26以降・Apple Silicon搭載Macに対応</p>
            <p class="final-cta__security">Apple Developer ID署名・Apple公証済み</p>
              <nav class="cta-links cta-links--ja" aria-label="補助リンク">
                <a href="#concept-video">製品デモ</a>
                <a href="/plans">料金プラン</a>
                <a href="./security.html">セキュリティ</a>
              </nav>
              <ul class="trust-list trust-list--ja" aria-label="利用条件">
                <li>${icon.checkCircle}アカウント・ログイン不要</li>
                <li>${icon.card}有料プランは月額・年額から選択</li>
              </ul>
          </div>
        </section>
        </div>

        <div class="feature-lightbox" id="feature-lightbox" aria-hidden="true">
          <div class="feature-lightbox__dialog" role="dialog" aria-modal="true" aria-label="画像の拡大表示">
            <button type="button" class="feature-lightbox__close" aria-label="拡大表示を閉じる">×</button>
            <img class="feature-lightbox__image" src="" alt="" />
          </div>
        </div>

        <div class="feature-video-lightbox" id="feature-video-lightbox" aria-hidden="true">
          <div
            class="feature-video-lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feature-video-lightbox-title"
          >
            <button type="button" class="feature-video-lightbox__close" aria-label="動画を閉じる">×</button>
            <p id="feature-video-lightbox-title" class="feature-video-lightbox__title">ペン入れ・トリミングのデモ動画</p>
            <div class="feature-video-lightbox__frame"></div>
            <a class="feature-video-lightbox__fallback" href="https://www.youtube.com/watch?v=${FEATURE_SCREENSHOT_VIDEO_YT_ID}" target="_blank" rel="noopener noreferrer">YouTubeで見る</a>
          </div>
        </div>

        <div class="mobile-download-dialog" id="mobile-download-dialog" aria-hidden="true">
          <div
            class="mobile-download-dialog__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-download-dialog-title"
            aria-describedby="mobile-download-dialog-description"
          >
            <button type="button" class="mobile-download-dialog__close" aria-label="ダウンロード案内を閉じる">×</button>
            <span class="mobile-download-dialog__icon" aria-hidden="true">${icon.download}</span>
            <p class="mobile-download-dialog__eyebrow">Download for Mac</p>
            <h2 id="mobile-download-dialog-title">Macでダウンロードを続ける</h2>
            <p id="mobile-download-dialog-description" class="mobile-download-dialog__description">
              SideClipはMac用アプリです。以下のリンクをMacで開くと、無料でダウンロードできます。
            </p>
            <code class="mobile-download-dialog__url">sideclip.app/download/</code>
            <div class="mobile-download-dialog__actions">
              <button type="button" class="mobile-download-dialog__button mobile-download-dialog__button--primary" data-mobile-download-share>Macへ共有する</button>
              <button type="button" class="mobile-download-dialog__button mobile-download-dialog__button--secondary" data-mobile-download-copy>リンクをコピー</button>
            </div>
            <p class="mobile-download-dialog__status" data-mobile-download-status aria-live="polite"></p>
          </div>
        </div>

        <footer class="site-footer" id="site-legal-footer" role="contentinfo">
          <nav class="site-footer__nav" aria-label="サイト情報">
            <a href="./terms.html" target="_blank" rel="noopener noreferrer">利用規約</a>
            <span class="site-footer__sep" aria-hidden="true">·</span>
            <a href="./privacy.html" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
            <span class="site-footer__sep" aria-hidden="true">·</span>
            <a class="site-footer__japan-legal" href="./tokushoho.html" target="_blank" rel="noopener noreferrer">特定商取引法に基づく表記</a>
          </nav>
          <p class="site-footer__copyright">© 2026 SideClip. All rights reserved.</p>
        </footer>
      </main>
    `;
  }

  function initReveal() {
    const revealNodes = document.querySelectorAll(".reveal");
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!revealNodes.length || !("IntersectionObserver" in window) || shouldReduceMotion) {
      revealNodes.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("reveal-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 12% 0px",
      }
    );

    window.requestAnimationFrame(() => {
      revealNodes.forEach((target) => observer.observe(target));
    });

    /* IO が一時的に通知されない環境でも本文を隠し続けない。 */
    window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.top > window.innerHeight * 1.15 || rect.bottom < 0) return;
        target.classList.add("is-visible");
        observer.unobserve(target);
      });
    }, 1200);
  }

  function initHeroFlowSyncDashLengths() {
    document.querySelectorAll("#hero-flow-sync .hero-flow-sync__path").forEach((path) => {
      try {
        if (typeof path.getTotalLength === "function") {
          const len = path.getTotalLength();
          if (len > 0) path.style.setProperty("--flow-path-len", `${Math.ceil(len) + 8}`);
        }
      } catch (_) {
        /* ignore */
      }
    });
  }

  function initFlowCycle() {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (shouldReduceMotion) return;

    const flowItems = [...document.querySelectorAll("[data-flow-index]")];
    const stepItems = [...document.querySelectorAll("[data-step-index]")];
    let active = 0;

    const syncRoot = document.getElementById("hero-flow-sync");
    const pathToPhone = syncRoot?.querySelector(".hero-flow-sync__path--to-phone");
    const pathToMac = syncRoot?.querySelector(".hero-flow-sync__path--to-mac");
    const pasteStepIndex = flowItems.length === 3 ? 2 : 3;
    const ARROW_ANIM_MS = 1120;

    function triggerFlowPathAnim(path) {
      if (!path) return;
      path.classList.remove("is-animating");
      void path.getBoundingClientRect();
      path.classList.add("is-animating");
      window.clearTimeout(path._heroFlowHideT);
      path._heroFlowHideT = window.setTimeout(() => {
        path.classList.remove("is-animating");
      }, ARROW_ANIM_MS);
    }

    function setActive(index) {
      flowItems.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === index));
      stepItems.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === index));
      if (syncRoot) syncRoot.setAttribute("data-hero-flow-step", String(index));
    }

    setActive(active);
    window.setInterval(() => {
      const prev = active;
      active = (active + 1) % Math.max(flowItems.length, 1);
      setActive(active);
      if (prev === 0 && active === 1) triggerFlowPathAnim(pathToPhone);
      if (prev === pasteStepIndex - 1 && active === pasteStepIndex) triggerFlowPathAnim(pathToMac);
    }, 1700);
  }

  function initHeroTitleFit() {
    const h1 = document.querySelector("#hero-title");
    if (!h1) return;
    const titleStack = h1.querySelector(".tap-infographic__title-stack");

    const minPx = 11;
    const tolerance = 2;

    function overflows() {
      const w = h1.clientWidth + tolerance;
      if (titleStack && titleStack.scrollWidth > w) return true;
      if (h1.scrollWidth > w) return true;
      return false;
    }

    function fit() {
      h1.style.fontSize = "";
      if (!h1.isConnected) return;
      void h1.offsetWidth;
      let px = parseFloat(window.getComputedStyle(h1).fontSize);
      if (Number.isNaN(px)) return;
      while (px >= minPx && overflows()) {
        px -= 1;
        h1.style.fontSize = `${px}px`;
      }
    }

    const run = () => window.requestAnimationFrame(fit);
    run();
    window.addEventListener("resize", run);
    window.addEventListener("orientationchange", run);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
    }
    const wrap = h1.closest(".hero__infographic-card") || h1.closest(".hero__content");
    if (wrap && typeof ResizeObserver !== "undefined") {
      new ResizeObserver(run).observe(wrap);
    }
  }

  function initFinalCtaCopyFit() {
    const copy = document.querySelector("#download .final-cta__copy");
    if (!copy) return;
    const h2 = copy.querySelector("#cta-title");
    const punch = copy.querySelector("strong");
    const targets = [h2, punch].filter(Boolean);
    const minPx = 10;
    const tolerance = 2;

    function fitEl(el) {
      el.style.fontSize = "";
      if (!el.isConnected) return;
      void el.offsetWidth;
      let px = parseFloat(window.getComputedStyle(el).fontSize);
      if (Number.isNaN(px)) return;
      while (px >= minPx && el.scrollWidth > el.clientWidth + tolerance) {
        px -= 1;
        el.style.fontSize = `${px}px`;
      }
    }

    function run() {
      for (const el of targets) {
        el.style.fontSize = "";
      }
      if (!copy.isConnected) return;
      void copy.offsetWidth;
      for (const el of targets) {
        fitEl(el);
      }
    }

    const schedule = () => window.requestAnimationFrame(run);
    schedule();
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(schedule);
    }
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(schedule).observe(copy);    }
  }

  function initHeroBannerHeadlineScroll() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector(".hero");
    const banner = document.querySelector(".hero__banner");
    if (!hero || !banner) return;

    function sync(entry) {
      const pastHero =
        !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      banner.classList.toggle("hero__banner--headline-out", pastHero);
    }

    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      sync(entry);
    }, {
      threshold: 0,
      root: null,
      rootMargin: "0px",
    });
    observer.observe(hero);
  }

  function initHeroBannerEnter() {
    const banner = document.querySelector(".hero__banner");
    if (!banner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      banner.classList.add("hero__banner--entered");
      return;
    }
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        banner.classList.add("hero__banner--entered");
      });
    });
  }

  function initHeroParallax() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--hero-x", `${x * 10}px`);
      hero.style.setProperty("--hero-y", `${y * 8}px`);
    });

    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--hero-x", "0px");
      hero.style.setProperty("--hero-y", "0px");
    });
  }

  function initInteractiveCards() {
    const cards = document.querySelectorAll(".interactive-card");
    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--card-rotate-x", `${y * -3}deg`);
        card.style.setProperty("--card-rotate-y", `${x * 3}deg`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--card-rotate-x", "0deg");
        card.style.setProperty("--card-rotate-y", "0deg");
      });
    });
  }

  function initYoutubePosterEmbed(wrap, videoId, options) {
    if (!wrap) return null;

    const {
      posterModifierClass,
      iframeTitle,
      iframeTitleEn = iframeTitle,
      ctaId = "video_play",
      ctaText = "動画を再生する",
      ctaTextEn = ctaText,
      ctaSection = "video",
      onBeforeLoad = []
    } = options;

    const embedParams = new URLSearchParams({
      autoplay: "1",
      enablejsapi: "1",
      modestbranding: "1",
      rel: "0",
      playsinline: "1"
    });
    const pageOrigin = window.location.origin;
    const canEmbedInline = pageOrigin && pageOrigin !== "null";
    if (canEmbedInline) {
      embedParams.set("origin", pageOrigin);
    }
    const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;

    function normalizeStartSeconds(value) {
      const seconds = Number.parseInt(value, 10);
      return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
    }

    function buildEmbedUrl(startSeconds = 0) {
      const params = new URLSearchParams(embedParams);
      const normalizedStart = normalizeStartSeconds(startSeconds);
      if (normalizedStart) params.set("start", String(normalizedStart));
      return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
    }

    function buildWatchUrl(startSeconds = 0) {
      const normalizedStart = normalizeStartSeconds(startSeconds);
      return normalizedStart ? `${watchUrl}&t=${normalizedStart}s` : watchUrl;
    }

    function seekLoadedIframe(startSeconds) {
      const iframe = wrap.querySelector("iframe");
      if (!iframe?.contentWindow) return false;
      const seconds = normalizeStartSeconds(startSeconds);
      iframe.contentWindow.postMessage(JSON.stringify({
        event: "command",
        func: "seekTo",
        args: [seconds, true]
      }), "https://www.youtube.com");
      iframe.contentWindow.postMessage(JSON.stringify({
        event: "command",
        func: "playVideo",
        args: []
      }), "https://www.youtube.com");
      return true;
    }

    function loadIframe(startSeconds = 0) {
      const isEnglish = window.SideClipI18n?.getLang?.() === "en";
      if (!canEmbedInline) {
        window.open(buildWatchUrl(startSeconds), "_blank", "noopener,noreferrer");
        return;
      }
      if (wrap.dataset.loaded === "1") {
        seekLoadedIframe(startSeconds);
        return;
      }
      wrap.dataset.loaded = "1";
      wrap.classList.remove(posterModifierClass);
      wrap.innerHTML = "";
      const iframe = document.createElement("iframe");
      iframe.width = "560";
      iframe.height = "315";
      iframe.src = buildEmbedUrl(startSeconds);
      iframe.title = isEnglish ? iframeTitleEn : iframeTitle;
      iframe.setAttribute("frameborder", "0");
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.allowFullscreen = true;
      wrap.appendChild(iframe);

      const fallback = document.createElement("a");
      fallback.className = "video-embed-fallback";
      fallback.href = buildWatchUrl(startSeconds);
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.textContent = isEnglish ? "Watch on YouTube" : "YouTubeで見る";
      wrap.appendChild(fallback);
    }

    wrap.querySelector("button")?.addEventListener("click", (event) => {
      const trigger = event.currentTarget;
      trackCtaClick({
        ctaId: trigger?.dataset?.ctaId || ctaId,
        ctaText: window.SideClipI18n?.getLang?.() === "en" ? ctaTextEn : ctaText,
        section: trigger?.dataset?.ctaSection || ctaSection
      });
      loadIframe();
    });

    onBeforeLoad.forEach((fn) => fn(loadIframe));
    return {
      loadIframe,
      playAt: loadIframe
    };
  }

  function initConceptVideoEmbed() {
    const player = initYoutubePosterEmbed(document.querySelector(".concept-video__embed--poster"), getConceptVideoId(), {
      posterModifierClass: "concept-video__embed--poster",
      iframeTitle: "SideClip 基本機能のデモ動画",
      iframeTitleEn: "SideClip core feature demo",
      ctaId: "concept_video_play",
      ctaText: "基本機能のデモ動画を再生する",
      ctaTextEn: "Play the SideClip core feature demo",
      ctaSection: "concept_video",
      onBeforeLoad: [
        (loadIframe) => {
          document.querySelectorAll('a[href="#concept-video"]').forEach((link) => {
            link.addEventListener("click", (event) => {
              event.preventDefault();
              alignTargetTopWithViewport(resolveHashScrollTarget("concept-video"), { smooth: true });
              loadIframe();
            });
          });
        }
      ]
    });

    document.querySelectorAll("[data-concept-video-seconds]").forEach((button) => {
      button.addEventListener("click", () => {
        const seconds = Number.parseInt(button.dataset.conceptVideoSeconds || "0", 10) || 0;
        document.querySelectorAll("[data-concept-video-seconds]").forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });
        trackAnalyticsEvent("concept_video_chapter", {
          chapter_label: button.dataset.conceptVideoLabel || "unknown",
          chapter_seconds: seconds,
          video_language: getLandingLang()
        });
        player?.playAt(seconds);
      });
    });
  }

  function initBenefitsVideoEmbed() {
    initYoutubePosterEmbed(document.querySelector(".benefits-video__embed--poster"), BENEFITS_VIDEO_YT_ID, {
      posterModifierClass: "benefits-video__embed--poster",
      iframeTitle: "SideClip スクショ機能の紹介動画",
      iframeTitleEn: "SideClip screenshot feature demo",
      ctaId: "benefits_video_play",
      ctaText: "スクショ機能の紹介動画を再生する",
      ctaTextEn: "Play the SideClip screenshot feature demo",
      ctaSection: "benefits_video"
    });
  }

  function initFeatureScreenshotVideoLightbox() {
    const trigger = document.querySelector(".feature-card__video-trigger");
    const lightbox = document.querySelector("#feature-video-lightbox");
    if (!trigger || !lightbox) return;

    const dialog = lightbox.querySelector(".feature-video-lightbox__dialog");
    const closeButton = lightbox.querySelector(".feature-video-lightbox__close");
    const frame = lightbox.querySelector(".feature-video-lightbox__frame");
    const fallback = lightbox.querySelector(".feature-video-lightbox__fallback");
    const videoId = trigger.dataset.youtubeId || FEATURE_SCREENSHOT_VIDEO_YT_ID;
    const videoTitle = trigger.dataset.videoTitle || "SideClip デモ動画";
    const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
    let lastFocusedElement = null;

    if (fallback) fallback.href = watchUrl;

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-feature-video-lightbox");
      if (frame) frame.innerHTML = "";
      setPageInertState(false);
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
      lastFocusedElement = null;
    }

    function openLightbox(opener) {
      trackCtaClick({
        ctaId: trigger.dataset.ctaId || "feature_screenshot_video_play",
        ctaText: trigger.textContent.trim() || "ペン入れ・トリミングを動画で見る",
        section: trigger.dataset.ctaSection || "feature_screenshot_video"
      });

      const canEmbedInline = window.location.protocol === "http:" || window.location.protocol === "https:";
      if (!canEmbedInline) {
        window.open(watchUrl, "_blank", "noopener,noreferrer");
        return;
      }

      const embedParams = new URLSearchParams({
        autoplay: "1",
        modestbranding: "1",
        rel: "0",
        playsinline: "1",
        origin: window.location.origin
      });
      const iframe = document.createElement("iframe");
      iframe.width = "960";
      iframe.height = "540";
      iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${embedParams.toString()}`;
      iframe.title = videoTitle;
      iframe.setAttribute("frameborder", "0");
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.allowFullscreen = true;

      lastFocusedElement = opener || document.activeElement;
      if (frame) {
        frame.innerHTML = "";
        frame.appendChild(iframe);
      }
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-feature-video-lightbox");
      setPageInertState(true);
      closeButton?.focus();
    }

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(trigger);
    });

    ["touchstart", "touchend", "click"].forEach((eventName) => {
      dialog?.addEventListener(eventName, (event) => {
        event.stopPropagation();
      });
      closeButton?.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeLightbox();
      });
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        event.preventDefault();
        closeLightbox();
      }
    });

    ["touchstart", "touchend"].forEach((eventName) => {
      lightbox.addEventListener(eventName, (event) => {
        event.stopPropagation();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }
      trapFocusInDialog(event, dialog);
    });
  }


  function getFocusableElements(container) {
    if (!container) return [];
    return [...container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );
  }

  function trapFocusInDialog(event, dialog) {
    if (event.key !== "Tab" || !dialog) return;
    const focusables = getFocusableElements(dialog);
    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }
    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setPageInertState(enabled) {
    const page = document.querySelector("main.page-shell");
    if (!page) return;
    const modalIds = new Set(["feature-lightbox", "feature-video-lightbox", "mobile-download-dialog"]);
    [...page.children].forEach((child) => {
      const shouldKeepInteractive = modalIds.has(child.id);
      if (!enabled || shouldKeepInteractive) {
        child.removeAttribute("inert");
        return;
      }
      child.setAttribute("inert", "");
    });
  }

  function isMobileDownloadContext() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mobile_download_preview") === "1") return true;
    if (navigator.userAgentData?.mobile === true) return true;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")) return true;
    return /Macintosh/i.test(navigator.userAgent || "") && Number(navigator.maxTouchPoints || 0) > 1;
  }

  function copyTextToClipboard(textToCopy) {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(textToCopy);
    }
    return new Promise((resolve, reject) => {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        if (!document.execCommand("copy")) throw new Error("copy command failed");
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        textarea.remove();
      }
    });
  }

  function initMobileDownloadDialog() {
    const overlay = document.querySelector("#mobile-download-dialog");
    if (!overlay) return null;
    const panel = overlay.querySelector(".mobile-download-dialog__panel");
    const closeButton = overlay.querySelector(".mobile-download-dialog__close");
    const shareButton = overlay.querySelector("[data-mobile-download-share]");
    const copyButton = overlay.querySelector("[data-mobile-download-copy]");
    const status = overlay.querySelector("[data-mobile-download-status]");
    const downloadPageUrl = "https://sideclip.app/download/";
    let lastFocusedElement = null;
    let sourceTrackingData = null;

    function isEnglish() {
      return window.SideClipI18n?.getLang?.() === "en";
    }

    function setStatus(jaText, enText) {
      if (status) status.textContent = isEnglish() ? enText : jaText;
    }

    function closeDialog() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-mobile-download-dialog");
      setPageInertState(false);
      if (status) status.textContent = "";
      lastFocusedElement?.focus?.();
      lastFocusedElement = null;
      sourceTrackingData = null;
    }

    function openDialog(opener, trackingData) {
      lastFocusedElement = opener || document.activeElement;
      sourceTrackingData = trackingData || {};
      if (status) status.textContent = "";
      if (shareButton) shareButton.hidden = typeof navigator.share !== "function";
      copyButton?.classList.toggle("mobile-download-dialog__button--primary", typeof navigator.share !== "function");
      copyButton?.classList.toggle("mobile-download-dialog__button--secondary", typeof navigator.share === "function");
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-mobile-download-dialog");
      setPageInertState(true);
      (shareButton && !shareButton.hidden ? shareButton : copyButton)?.focus();
      trackAnalyticsEvent("mobile_download_bridge_open", {
        cta_id: sourceTrackingData.ctaId || "mac_download",
        section: sourceTrackingData.section || "download",
        landing_language: getLandingLang()
      });
    }

    shareButton?.addEventListener("click", async () => {
      try {
        await navigator.share({
          title: "SideClip for Mac",
          text: isEnglish()
            ? "Open this link on your Mac to download SideClip for free."
            : "このリンクをMacで開くと、SideClipを無料でダウンロードできます。",
          url: downloadPageUrl
        });
        setStatus("共有画面を開きました。", "The share sheet is open.");
        trackAnalyticsEvent("mobile_download_share", {
          cta_id: sourceTrackingData?.ctaId || "mac_download",
          section: sourceTrackingData?.section || "download",
          landing_language: getLandingLang()
        });
      } catch (error) {
        if (error?.name !== "AbortError") {
          setStatus("共有できませんでした。リンクをコピーしてください。", "Could not share. Please copy the link instead.");
        }
      }
    });

    copyButton?.addEventListener("click", async () => {
      try {
        await copyTextToClipboard(downloadPageUrl);
        setStatus("リンクをコピーしました。Macへ送って開いてください。", "Link copied. Send it to your Mac and open it there.");
        trackAnalyticsEvent("mobile_download_copy", {
          cta_id: sourceTrackingData?.ctaId || "mac_download",
          section: sourceTrackingData?.section || "download",
          landing_language: getLandingLang()
        });
      } catch (_) {
        setStatus("コピーできませんでした。表示されているURLをMacで開いてください。", "Could not copy. Open the displayed URL on your Mac.");
      }
    });

    closeButton?.addEventListener("click", closeDialog);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeDialog();
    });
    panel?.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("keydown", (event) => {
      if (!overlay.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }
      trapFocusInDialog(event, panel);
    });

    return { open: openDialog };
  }

  function initFeatureImageLightbox() {
    const lightbox = document.querySelector("#feature-lightbox");
    if (!lightbox) return;

    const dialog = lightbox.querySelector(".feature-lightbox__dialog");
    const closeButton = lightbox.querySelector(".feature-lightbox__close");
    const image = lightbox.querySelector(".feature-lightbox__image");
    const triggers = document.querySelectorAll(".feature-zoom-trigger");
    let lastFocusedElement = null;

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-feature-lightbox");
      setPageInertState(false);
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
      lastFocusedElement = null;
    }

    function openLightbox(src, alt, opener) {
      lastFocusedElement = opener || document.activeElement;
      image.src = src;
      image.alt = alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-feature-lightbox");
      setPageInertState(true);
      closeButton?.focus();
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openLightbox(trigger.dataset.featureImageSrc || "", trigger.dataset.featureImageAlt || "", trigger);
      });
    });

    ["touchstart", "touchend", "click"].forEach((eventName) => {
      dialog?.addEventListener(eventName, (event) => {
        event.stopPropagation();
      });
    });

    ["touchstart", "touchend", "click"].forEach((eventName) => {
      closeButton?.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeLightbox();
      });
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        event.preventDefault();
        closeLightbox();
      }
    });

    ["touchstart", "touchend"].forEach((eventName) => {
      lightbox.addEventListener(eventName, (event) => {
        event.stopPropagation();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }
      trapFocusInDialog(event, dialog);
    });
  }

  function initDownloadLinkTracking() {
    const links = document.querySelectorAll("[data-download-link]");
    const mobileDownload = isMobileDownloadContext();
    const mobileDialog = mobileDownload ? initMobileDownloadDialog() : null;
    links.forEach((link) => {
      const trackingData = {
        ctaId: link.dataset.ctaId || "mac_download",
        ctaText: (link.textContent || "").trim(),
        section: link.dataset.ctaSection || "download"
      };
      const downloadUrl = new URL(link.getAttribute("href") || MAC_DOWNLOAD_URL, window.location.origin);
      if (downloadUrl.origin === window.location.origin && downloadUrl.pathname === "/download/") {
        downloadUrl.searchParams.set("source", "lp");
        downloadUrl.searchParams.set("cta_id", trackingData.ctaId);
        downloadUrl.searchParams.set("section", trackingData.section);
        link.href = `${downloadUrl.pathname}${downloadUrl.search}${downloadUrl.hash}`;
      }

      if (mobileDownload) {
        link.textContent = isJapaneseLanding()
          ? "Macへダウンロードリンクを送る"
          : "Send the download link to your Mac";
        link.setAttribute("aria-label", link.textContent);
        trackingData.ctaText = link.textContent;
      }

      link.addEventListener("click", (event) => {
        trackCtaClick({
          ...trackingData
        });
        if (mobileDownload && mobileDialog) {
          event.preventDefault();
          mobileDialog.open(link, trackingData);
          return;
        }
        trackMacDownload({ ...trackingData, linkUrl: link.href });
      });
    });
  }

  function initPlanTracking() {
    document.querySelectorAll("[data-plan-interest]").forEach((link) => {
      link.addEventListener("click", () => {
        const planTier = link.dataset.planInterest || "unknown";
        trackAnalyticsEvent("plan_interest", {
          plan_tier: planTier,
          interaction_type: link.dataset.planInterestType || "details_link",
          link_url: link.href,
        });
      });
    });

    document.querySelectorAll('a[href^="/plans"], a[href^="/ja/plans"]').forEach((link) => {
      link.addEventListener("click", () => {
        const section = link.closest(".ja-pricing__grid, .ja-pricing")
          ? "pricing_preview"
          : link.closest(".faq__item")
            ? "faq"
            : link.closest("header, nav")
              ? "navigation"
              : link.closest("footer, .final-cta")
                ? "footer"
                : "content";
        trackAnalyticsEvent("plan_comparison_click", {
          link_url: link.href,
          section,
          plan_tier: link.dataset.planInterest || "all",
        });
      });
    });
  }

  function initScrollDepthTracking() {
    const thresholds = [50, 90];
    const reached = new Set();
    let ticking = false;

    function checkDepth() {
      ticking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100);
      thresholds.forEach((threshold) => {
        if (percent < threshold || reached.has(threshold)) return;
        reached.add(threshold);
        trackAnalyticsEvent(`scroll_${threshold}`, { percent_scrolled: threshold });
        trackAnalyticsEvent("scroll_depth", { percent_scrolled: threshold });
      });
      if (reached.size === thresholds.length) window.removeEventListener("scroll", onScroll);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(checkDepth);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    checkDepth();
  }

  function initSectionViewTracking() {
    if (!("IntersectionObserver" in window)) return;

    const sections = [
      ["#hero-title", "hero", 1],
      [".hero__content", "how_it_works", 2],
      [".trust-summary", "trust_summary", 3],
      [".clipboard-shift", "why_sideclip", 4],
      ["#concept-video", "product_demo", 5],
      [".benefits", "screenshot", 6],
      [".features", "core_features", 7],
      [".usage-scenes", "use_cases", 8],
      [".local-sync", "local_sync", 9],
      [".ja-pricing", "pricing", 10],
      [".faq", "faq", 11],
      [".final-cta", "final_cta", 12],
    ];
    const funnelSteps = new Map([
      ["hero", 1],
      ["product_demo", 2],
      ["pricing", 3],
      ["final_cta", 4],
    ]);
    const observed = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const details = observed.get(entry.target);
        if (!details) return;
        observer.unobserve(entry.target);
        observed.delete(entry.target);

        const parameters = {
          section_name: details.name,
          section_order: details.order,
          billing_market: document.documentElement.dataset.billingMarket || "unknown",
        };
        trackAnalyticsEvent("section_view", parameters);

        const funnelStep = funnelSteps.get(details.name);
        if (funnelStep) {
          trackAnalyticsEvent("landing_funnel_step", {
            funnel_step: details.name,
            step_number: funnelStep,
            billing_market: parameters.billing_market,
          });
        }
      });
    }, {
      rootMargin: "0px 0px -38% 0px",
      threshold: 0.2,
    });

    sections.forEach(([selector, name, order]) => {
      const element = document.querySelector(selector);
      if (!element || observed.has(element)) return;
      observed.set(element, { name, order });
      observer.observe(element);
    });
  }

  function scrollToPageTop({ smooth = false } = {}) {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  }

  function trackCtaClick({ ctaId, ctaText, section }) {
    if (typeof gtag !== "function") return;
    gtag("event", "cta_click", {
      cta_id: ctaId || "unknown",
      cta_text: ctaText || "",
      section: section || "unknown",
      page_path: location.pathname,
      site_language: window.SideClipI18n?.getLang?.() || document.documentElement.lang || "ja"
    });
  }

  function trackAnalyticsEvent(eventName, parameters = {}) {
    if (typeof gtag !== "function") return;
    gtag("event", eventName, {
      ...parameters,
      page_path: location.pathname,
      site_language: window.SideClipI18n?.getLang?.() || document.documentElement.lang || "en",
      transport_type: "beacon",
    });
  }

  function trackMacDownload({ ctaId, ctaText, section, linkUrl }) {
    if (typeof gtag !== "function") return;
    gtag("event", "mac_download", {
      cta_id: ctaId || "mac_download",
      cta_text: ctaText || "",
      section: section || "download",
      file_name: "SideClip-latest-arm64.dmg",
      link_url: linkUrl || MAC_DOWNLOAD_URL,
      page_path: location.pathname,
      site_language: window.SideClipI18n?.getLang?.() || document.documentElement.lang || "en",
      transport_type: "beacon"
    });

    const conversionEvent = section === "hero"
      ? "hero_download"
      : section === "final_cta"
        ? "final_cta_download"
        : "";
    if (conversionEvent) {
      trackAnalyticsEvent(conversionEvent, {
        cta_id: ctaId || "mac_download",
        link_url: linkUrl || MAC_DOWNLOAD_URL,
      });
    }
  }

  function alignTargetTopWithViewport(target, { smooth = false } = {}) {
    if (!target) return;
    const headerEl = document.querySelector(".hero__header");
    let headerOffset = 0;
    if (headerEl) {
      const pos = window.getComputedStyle(headerEl).position;
      if (pos === "fixed") {
        headerOffset = Math.round(headerEl.getBoundingClientRect().height);
      }
    }
    const base = Math.round(target.getBoundingClientRect().top + window.scrollY);
    const y = Math.max(0, base - headerOffset);
    window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
  }

  function resolveHashScrollTarget(hashId) {
    const byId = document.getElementById(hashId);
    const resolvers = {
      "concept-video": () => document.getElementById("concept-video"),
      "tap-title": () => document.querySelector(".tap-section"),
      "benefits-title": () => document.querySelector(".benefits"),
      "clipboard-shift-title": () => document.querySelector(".clipboard-shift"),
      "features-title": () => document.querySelector(".features"),
      "usage-scenes-title": () => document.querySelector(".usage-scenes"),
      "local-title": () => document.querySelector(".local-sync"),
      faq: () => document.getElementById("faq"),
      download: () => document.getElementById("download"),
    };
    const pick = resolvers[hashId] ? resolvers[hashId]() : null;
    return pick || byId;
  }

  function initHashScroll() {
    if (!window.location.hash) return;
    window.requestAnimationFrame(() => {
      let hashId = "";
      try {
        hashId = decodeURIComponent(window.location.hash.slice(1));
      } catch (_) {
        hashId = window.location.hash.slice(1);
      }
      if (!hashId) return;
      if (hashId === "hero-title") {
        scrollToPageTop({ smooth: false });
        return;
      }
      const target = resolveHashScrollTarget(hashId);
      alignTargetTopWithViewport(target, { smooth: false });
    });
  }

  function initCtaNavHashLinks() {
    const nav = document.querySelector(".cta-links");
    if (!nav) return;
    nav.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#" || href === "#concept-video") return;
      event.preventDefault();
      const hashId = href.slice(1);
      if (!hashId) return;
      alignTargetTopWithViewport(resolveHashScrollTarget(hashId), { smooth: true });
      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    });
  }

  function initSectionDrawer() {
    const drawer = document.querySelector("#section-drawer");
    const trigger = document.querySelector("[data-section-menu-trigger]");
    if (!drawer || !trigger) return;

    const closeButtons = drawer.querySelectorAll("[data-section-menu-close]");
    const navLinks = drawer.querySelectorAll("[data-section-menu-link]");

    function openDrawer() {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-expanded", "true");
      document.body.classList.add("has-section-drawer");
    }

    function closeDrawer() {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      trigger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("has-section-drawer");
    }

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (drawer.classList.contains("is-open")) {
        closeDrawer();
        return;
      }
      openDrawer();
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        closeDrawer();
      });
    });

    const DRAWER_SCROLL_DELAY_MS = 320;

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href.charAt(0) !== "#") return;
        event.preventDefault();
        const hashId = href.slice(1);
        if (!hashId) return;
        closeDrawer();
        window.setTimeout(() => {
          if (hashId === "hero-title") {
            scrollToPageTop({ smooth: true });
          } else {
            const target = resolveHashScrollTarget(hashId);
            alignTargetTopWithViewport(target, { smooth: true });
          }
          if (history.replaceState) {
            history.replaceState(null, "", href);
          } else {
            window.location.hash = href;
          }
        }, DRAWER_SCROLL_DELAY_MS);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (!drawer.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
      }
    });
  }

  function initSyncLineRailLayout() {
    const rows = Array.from(document.querySelectorAll(".sync-graphic__row"));
    if (!rows.length) return;

    function updateSyncLineRailLayout() {
      rows.forEach((row) => {
        const laptop = row.querySelector(".device--laptop");
        const phone = row.querySelector(".device--phone");
        if (!laptop || !phone) return;
        const rr = row.getBoundingClientRect();
        const lr = laptop.getBoundingClientRect();
        const pr = phone.getBoundingClientRect();
        const cxL = lr.left + lr.width / 2 - rr.left;
        const cxP = pr.left + pr.width / 2 - rr.left;
        const x0 = Math.min(cxL, cxP);
        const x1 = Math.max(cxL, cxP);
        row.style.setProperty("--sync-line-left", `${Math.round(x0 * 100) / 100}px`);
        row.style.setProperty("--sync-line-w", `${Math.round((x1 - x0) * 100) / 100}px`);
      });
    }

    const run = () => window.requestAnimationFrame(updateSyncLineRailLayout);

    run();
    window.addEventListener("resize", run);
    window.addEventListener("load", run);
    if (typeof ResizeObserver !== "undefined") {
      rows.forEach((row) => new ResizeObserver(run).observe(row));
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
    }
  }

  function initHeroSyncGraphicPlacement() {
    const wrap = document.querySelector(".hero__visual-wrap");
    const phone = document.querySelector(".hero__visual-layer--phone");
    const sync = document.querySelector(".hero__sync-graphic");
    const syncRow = document.querySelector(".hero__sync-row");
    if (!wrap || !phone || !sync || !syncRow) return;

    function update() {
      const wr = wrap.getBoundingClientRect();
      const pr = phone.getBoundingClientRect();
      const rr = syncRow.getBoundingClientRect();

      // Mac（ベース画像）上の「画面中心」を wrap 幅/高さの比率で近似
      // ※元のヒーローバナー構図に合わせた定数（必要なら微調整可）
      const macCenterX = wr.left + wr.width * 0.695;
      const macCenterY = wr.top + wr.height * 0.43;

      // スマホ画像上の「画面中心」を phone の矩形から近似（ベゼル分を考慮）
      const phoneScreenCenterX = pr.left + pr.width * 0.54;
      const phoneScreenCenterY = pr.top + pr.height * 0.44;

      const x0 = macCenterX;
      const x1 = phoneScreenCenterX;
      const rawWidth = Math.abs(x1 - x0);
      const width = rawWidth * (2 / 3);

      // 右端（スマホ側）は固定して、左側だけ短くする
      const rightX = Math.max(x0, x1);
      const leftX = rightX - width;
      const left = leftX - rr.left;

      // 線のY位置は両画面中心の中間
      const y = (macCenterY + phoneScreenCenterY) / 2 - rr.top;

      syncRow.style.setProperty("--sync-line-left", `${Math.round(left * 100) / 100}px`);
      syncRow.style.setProperty("--sync-line-w", `${Math.round(width * 100) / 100}px`);
      syncRow.style.setProperty("--hero-sync-rail-top", `${Math.round(y * 100) / 100}px`);
    }

    const run = () => window.requestAnimationFrame(update);
    run();
    window.addEventListener("resize", run);
    window.addEventListener("load", run);
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(run);
      ro.observe(wrap);
      ro.observe(phone);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
    }
  }

  function mount() {
    const root = document.querySelector("#root");
    if (!root) return;
    if (!root.hasChildNodes()) root.innerHTML = renderApp();
    window.SideClipI18n?.applyPageTranslations?.("landing");
    syncStructuredData(root);
    initReveal();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(initHeroFlowSyncDashLengths);
    });
    initFlowCycle();
    initHeroTitleFit();
    initFinalCtaCopyFit();
    initHeroParallax();
    initHeroBannerEnter();
    initHeroBannerHeadlineScroll();
    initInteractiveCards();
    initConceptVideoEmbed();
    initBenefitsVideoEmbed();
    initFeatureScreenshotVideoLightbox();
    initFeatureImageLightbox();
    initDownloadLinkTracking();
    initPlanTracking();
    initScrollDepthTracking();
    initSectionViewTracking();
    initCtaNavHashLinks();
    initSectionDrawer();
    initSyncLineRailLayout();
    initHeroSyncGraphicPlacement();
    initHashScroll();
  }

  window.SideClipLandingPrerender = { render: renderApp, syncStructuredData };

  if (!window.__SIDECLIP_PRERENDER__) {
    document.addEventListener("DOMContentLoaded", mount);
  }
})();
