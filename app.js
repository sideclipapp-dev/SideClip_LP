(function () {
  const ASSET_VERSION = "20260730-ja-redesign";
  const CONCEPT_VIDEO_YT_IDS = {
    ja: "rCiLdIpRr5I",
    en: "bu5zO823Pow"
  };
  const BENEFITS_VIDEO_YT_ID = "3m6aWg6LDFY";
  const FEATURE_SCREENSHOT_VIDEO_YT_ID = "pfBsk3Iwi4E";
  const MAC_DOWNLOAD_URL = "https://github.com/sideclipapp-dev/SideClip-Releases/releases/latest/download/SideClip-latest-arm64.dmg";

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
      : `/assets/hero_blank_clean.png?v=${ASSET_VERSION}`,
    heroPhone: `/assets/hero_phone_v2_web.png?v=${ASSET_VERSION}`,
    heroMainFallback: `/assets/hero-banner.jpg?v=${ASSET_VERSION}`,
    stepCopy: `/assets/step-copy.png?v=${ASSET_VERSION}`,
    stepAdd: `/assets/step-add.png?v=${ASSET_VERSION}`,
    stepTap: `/assets/step-tap.png?v=${ASSET_VERSION}`,
    stepPaste: `/assets/step-paste.png?v=${ASSET_VERSION}`,
    featureHistory: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-history.jpg?v=${ASSET_VERSION}`
      : `/assets/feature-panel-history.jpg?v=${ASSET_VERSION}`,
    featureFavorite: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-favorite.jpg?v=${ASSET_VERSION}`
      : `/assets/feature-panel-favorite.jpg?v=${ASSET_VERSION}`,
    featureSearch: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-search.jpg?v=${ASSET_VERSION}`
      : `/assets/feature-panel-search.png?v=${ASSET_VERSION}`,
    featureTodo: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-todo.jpg?v=${ASSET_VERSION}`
      : `/assets/feature-panel-todo.jpg?v=${ASSET_VERSION}`,
    featureScan: isJapaneseLanding()
      ? `/assets/optimized-ja/feature-scan.jpg?v=${ASSET_VERSION}`
      : `/assets/feature-panel-scan.jpg?v=${ASSET_VERSION}`,
    usageScenes: `/assets/具体シーン.png?v=${ASSET_VERSION}`,
    clipboardDifference: isJapaneseLanding()
      ? `/assets/optimized-ja/clipboard-difference.jpg?v=${ASSET_VERSION}`
      : `/assets/違い.jpeg?v=${ASSET_VERSION}`,
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

  /** ヒーロー mini-flow と Tap セクションの4ステップで共通（ラベル・アイコン・アニメ連動を同期） */
  const tapFlowSteps = [
    {
      number: "01",
      title: "Macで<br />コピー",
      iconSrc: ASSETS.flowIconMac,
      alt: "Macでコピーするステップ",
    },
    {
      number: "02",
      title: "スマホに<br />表示",
      iconSrc: ASSETS.flowIconPhone,
      alt: "スマホへコピー内容が自動追加されるステップ",
      labelAccent: true,
    },
    {
      number: "03",
      title: "スマホを<br />タップ",
      iconSrc: ASSETS.flowIconTap,
      alt: "スマホ画面をタップするステップ",
    },
    {
      number: "04",
      title: "Macへ<br />ペースト",
      iconSrc: ASSETS.flowIconCheck,
      alt: "Macへ即座にペーストされるステップ",
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
      eyebrow: "残す",
      title: "Macの画面も、カードに。",
      image: ASSETS.featureScan,
      alt: "MacをキャプチャするSCAN画面",
      text: "スマホからMacのスクショを起動。<br />撮った画像はペン入れ・トリミングして、そのまま履歴に残せます。<br /><small>ペン入れ・トリミングはProプラン以上で利用可能</small>",
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
      text: "日付の期間・キーワード・画像内の文字まで検索。<br />あいまいな表現でも、目当てのカードに戻れます。<br /><small>画像内テキスト検索はProプラン以上で利用可能</small>",
    },
    {
      eyebrow: "再利用する",
      title: "忘れる前にコピーするだけ。",
      image: ASSETS.featureTodo,
      alt: "Todoモード画面",
      text: "Macでコピー→すぐTodo。<br />カードをスワイプするだけでTodo化<br /><small>Proプラン以上で利用可能</small>",
    },
  ];

  const trustItems = [
    [icon.gift, "Freeプランでお試し可能"],
    [icon.checkCircle, "より多機能なProプラン/Ultraプランも"],
  ];

  function renderMiniFlow() {
    const steps = isJapaneseLanding() ? tapFlowStepsJa : tapFlowSteps;
    return steps
      .map((step, index) => {
        const labelClass = step.labelAccent ? " step-card__label--accent" : "";
        const plusClass = step.plusBadge ? " step-card__icon-ring--plus" : "";
        const iconInner = step.iconSrc
          ? `<img class="flow-step-icon-img" src="${step.iconSrc}" alt="${step.alt}" width="56" height="56" loading="${isJapaneseLanding() ? "lazy" : "eager"}" decoding="async" />`
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
        <button
          type="button"
          class="clipboard-shift__panel feature-zoom-trigger"
          data-feature-image-src="${ASSETS.clipboardDifference}"
          data-feature-image-alt="呼び出すクリップボードと横に置くクリップボードの違い"
          aria-label="呼び出すクリップボードと横に置くクリップボードの違いの画像を拡大表示"
        >
          <img
            src="${ASSETS.clipboardDifference}"
            srcset="${ASSETS.clipboardDifference} 1x, ${ASSETS.clipboardDifference} 2x"
            sizes="(max-width: 1200px) 100vw, 1200px"
            width="2752"
            height="1536"
            alt="呼び出すクリップボードと横に置くクリップボードの違い"
            loading="lazy"
            decoding="async"
          />
        </button>
      </figure>
    `;
  }

  function renderFeatures() {
    return features
      .map(
        (feature) => {
          const cardClass = `${feature.wide ? " feature-card--wide" : ""}${feature.video ? " feature-card--has-video" : ""}`;
          const imageSizes = feature.wide ? "(max-width: 680px) 100vw, 980px" : "(max-width: 680px) 100vw, 50vw";
          return `
          <article class="feature-card${cardClass} interactive-card">
            <p class="feature-card__eyebrow">${feature.eyebrow}</p>
            <h3>${feature.title}</h3>
            <p class="feature-card__copy">${feature.text}</p>
            <button
              type="button"
              class="feature-card__panel feature-zoom-trigger"
              data-feature-image-src="${feature.image}"
              data-feature-image-alt="${feature.alt}"
              aria-label="${feature.title}の画像を拡大表示"
            >
              <img
                class="feature-card__image"
                src="${feature.image}"
                srcset="${feature.image} 1x, ${feature.image} 2x"
                sizes="${imageSizes}"
                alt="${feature.alt}"
                loading="lazy"
                decoding="async"
              />
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
              <span lang="en">Clipboard app</span>
            </p>
          </div>
          ${isJapanese ? `
          <nav class="ja-desktop-nav" aria-label="主要メニュー">
            <a href="#concept-video">デモ</a>
            <a href="#features-title">主な機能</a>
            <a href="/plans">料金</a>
          </nav>
          ` : ""}
          <div class="hero__header-actions">
            ${renderLanguageSwitch()}
            ${isJapanese ? `
            <a
              class="ja-header-download"
              href="${MAC_DOWNLOAD_URL}"
              data-download-link
              data-cta-id="header_download"
              data-cta-section="header"
            >無料ダウンロード</a>
            ` : ""}
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
                  <img
                    class="hero__visual"
                    src="${ASSETS.heroMain}"
                    srcset="${ASSETS.heroMain} 1x, ${ASSETS.heroMain} 2x"
                    width="2172"
                    height="724"
                    sizes="(max-width: 2172px) 100vw, 2172px"
                    alt="MacとスマホでSideClipを使うイメージ"
                    fetchpriority="high"
                    decoding="async"
                    onerror="this.onerror=null;this.src='${ASSETS.heroMainFallback}';"
                  />
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
                      srcset="${ASSETS.heroPhone} 1x, ${ASSETS.heroPhone} 2x"
                      width="1024"
                      height="1536"
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
                  ${isJapanese ? `
                  <h1 id="hero-title" class="hero__banner-overlay-lead hero__banner-overlay-line hero__banner-overlay-line--lead">
                    コピー履歴を、<br />Macから<span class="hero__banner-accent">スマホ</span>へ。
                  </h1>
                  ` : `
                  <p class="hero__banner-overlay-lead hero__banner-overlay-line hero__banner-overlay-line--lead">
                    コピー履歴を、<br />Macの<span class="hero__banner-accent">外</span>へ。
                  </p>
                  `}
                  <p class="hero__banner-overlay-sub hero__banner-overlay-line hero__banner-overlay-line--sub">
                    Macでコピーしたテキストや画像が、<br />横のスマホへ自動で並びます。
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
        ${isJapanese ? `
        <div class="ja-mobile-hero-cta" aria-label="SideClipを始める">
          <a
            href="${MAC_DOWNLOAD_URL}"
            data-download-link
            data-cta-id="mobile_hero_download"
            data-cta-section="hero"
          >Macで無料ダウンロード</a>
          <p>アカウント不要・Freeプランあり</p>
        </div>
        ` : ""}

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
              <a href="#concept-video" data-section-menu-link>コンセプト動画</a>
              <a href="#tap-title" data-section-menu-link>使い方</a>
              <a href="#benefits-title" data-section-menu-link>メリット</a>
              <a href="#clipboard-shift-title" data-section-menu-link>他のツールとの違い</a>
              <a href="#features-title" data-section-menu-link>主な機能</a>
              <a href="#usage-scenes-title" data-section-menu-link>使用シーン</a>
              <a href="#local-title" data-section-menu-link>ローカル同期</a>
              <a href="#faq" data-section-menu-link>FAQ</a>
              <a href="#download" data-section-menu-link>ダウンロード</a>
              <a href="/plans">料金プラン</a>
              <a href="#site-legal-footer" data-section-menu-link>ポリシー・規約</a>
            `}
          </nav>
        </div>

        <div class="content-overlay">
        <div class="hero__content">
          <div class="reveal__head">
            <h2 class="hero__banner-copy">コピーして、選んで、<br />すぐ貼れる。</h2>
          </div>
          <div class="reveal__rest">
          <p class="hero__hook">Macでコピーすると、スマホにカードが自動追加。<br />必要なカードをタップすれば、Macへそのままペーストできます。</p>
          <div class="hero__infographic-card">
            ${isJapanese ? `
            <h2 class="hero__infographic-title">
              <span class="tap-infographic__title-stack">
                <span class="tap-infographic__title-line tap-infographic__title-line--primary">
                  3ステップで、すぐ使えます。
                </span>
              </span>
            </h2>
            ` : `
            <h1 id="hero-title" class="hero__infographic-title">
              <span class="tap-infographic__title-stack">
                <span class="tap-infographic__title-line tap-infographic__title-line--primary">
                  コピー。表示。タップ。ペースト。
                </span>
              </span>
            </h1>
            `}
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

          <ul class="hero-highlight-row" aria-label="SideClipの安心ポイント">
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
                <p class="hero-highlight-card__title">ローカル同期で安心</p>
                <p class="hero-highlight-card__text">データはMac内で完結。<br />プライバシーも安心。</p>
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
                <p class="hero-highlight-card__title">アカウント・ログイン不要</p>
                <p class="hero-highlight-card__text">Macへインストールしたら、すぐに試せます。</p>
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
                <p class="hero-highlight-card__title">QRコードでかんたん接続</p>
                <p class="hero-highlight-card__text">スマホアプリは不要。ブラウザからつながります。</p>
              </div>
            </li>
          </ul>

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
        </section>

        ${isJapanese ? "" : `
        <section class="tap-section" aria-labelledby="tap-title">
          <div class="tap-section__reveal reveal">
            <div class="section-copy section-copy--tap">
              <div class="reveal__head">
                <h2 id="tap-title">タップで、<br class="mobile-break" /><span>そのまま貼り付け。</span></h2>
              </div>
              <div class="reveal__rest">
                <p>
                  Macでコピーした内容が、スマホに並ぶ。<br class="desktop-break" />
                  必要なカードに触れると、Macへ即ペースト。<br />
                  作業中の画面から目を離さずに使えます。
                  <br class="mobile-break" />
                </p>
              </div>
            </div>
            <div class="reveal__rest">
            <ol class="steps" aria-label="Tap to Pasteの4ステップ">
              ${renderSteps()}
            </ol>
            </div>
          </div>
        </section>
        `}

        <section class="benefits" aria-labelledby="benefits-title">
          <div class="benefits__reveal reveal">
            <div class="section-copy">
              <div class="reveal__head">
                <h2 id="benefits-title">スクショを、<br />デスクトップにためない。</h2>
              </div>
              <div class="reveal__rest">
                <p>
                  Macのスクショをスマホから撮影。<br />
                  カードとして整理し、必要な時にすぐ再利用できます。
                </p>
              </div>
            </div>
            <div class="reveal__rest benefits-video-showcase">
              <div class="benefits-video-copy">
                <p class="benefits-video-copy__eyebrow">Screenshot Demo</p>
                <h3>スクショを、<br />カードで残す。</h3>
                <p class="benefits-video-copy__text">
                  スクショボタンですぐ撮影。連続で撮ったスクショもカードリストに整理され、必要な時にペーストできます。<br />
                </p>
                <p class="benefits-video-copy__text">
                  保存先はSideClipフォルダなので、デスクトップがスクショ画像で埋もれません。<br />よく使うスクショはカードをスワイプしてお気に入りへ。
                </p>
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
            ${isJapanese ? "" : `
            <div class="reveal__rest">
            <div class="benefit-grid">
              ${renderBenefits()}
            </div>
            </div>
            `}
          </div>
        </section>

        <section class="clipboard-shift" aria-labelledby="clipboard-shift-title">
          <div class="clipboard-shift__reveal reveal">
            <div class="reveal__head">
              <p class="clipboard-shift__eyebrow">Clipboard Shift</p>
              <h2 id="clipboard-shift-title" class="clipboard-shift__title">
                履歴を、作業画面に<br />
                重ねない。
              </h2>
              <p class="clipboard-shift__lead">
                クリップボードパネルを開く代わりに、<br />
                履歴を横のスマホへ常時表示します。
              </p>
            </div>
            <div class="reveal__rest">
            ${isJapanese ? "" : renderClipboardDifferenceFigure()}
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
            ${isJapanese ? renderClipboardDifferenceFigure() : ""}
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
            ${isJapanese ? "" : `
            <figure class="usage-scenes__figure">
              <button
                type="button"
                class="usage-scenes__panel feature-zoom-trigger"
                data-feature-image-src="${ASSETS.usageScenes}"
                data-feature-image-alt="SideClipの具体的な使用シーン"
                aria-label="具体的な使用シーンの画像を拡大表示"
              >
                <img
                  src="${ASSETS.usageScenes}"
                  srcset="${ASSETS.usageScenes} 1x, ${ASSETS.usageScenes} 2x"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  width="1672"
                  height="941"
                  alt="SideClipの具体的な使用シーン"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </figure>
            `}
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
                  <h3>速くてプライベート</h3>
                  <p>サーバーを挟まないため、反映が速く、データも外へ出にくい設計です。</p>
                </article>
              </div>
              <p class="local-sync__detail-link">
                <a href="./security.html">セキュリティ対策の詳細を見る</a>
              </p>
            </div>
            </div>
          </div>
        </section>

        ${isJapanese ? `
        <section class="ja-pricing reveal" id="pricing-preview" aria-labelledby="pricing-preview-title">
          <div class="ja-pricing__inner">
            <div class="reveal__head ja-pricing__head">
              <p class="ja-pricing__eyebrow">Plans</p>
              <h2 id="pricing-preview-title">まずは無料。<br /><span class="ja-pricing__headline-line">必要になったら、<wbr />アップグレード。</span></h2>
              <p>Freeプランはアカウント不要。有料プランは初回30日無料で、変更・解約はSideClipアプリ内から行えます。</p>
            </div>
            <div class="reveal__rest">
              <div class="ja-pricing__grid">
                <article class="ja-pricing__card">
                  <p class="ja-pricing__label">まず試す</p>
                  <h3>Free</h3>
                  <p class="ja-pricing__price">¥0</p>
                  <p class="ja-pricing__daily ja-pricing__daily--empty" aria-hidden="true">&nbsp;</p>
                  <p class="ja-pricing__summary">コピー・スクショ履歴など、基本機能をすぐに体験できます。</p>
                </article>
                <article class="ja-pricing__card ja-pricing__card--recommended">
                  <p class="ja-pricing__label">日常的に使う</p>
                  <h3>Pro</h3>
                  <p class="ja-pricing__price">¥300<span>/月</span></p>
                  <p class="ja-pricing__daily">年額 ¥2,400<span>月あたり¥200・1日あたり約7円</span></p>
                  <p class="ja-pricing__summary">Todo、画像編集、クイックペーストなど、仕事向けの機能を追加します。</p>
                </article>
                <article class="ja-pricing__card">
                  <p class="ja-pricing__label">履歴を資産として残す</p>
                  <h3>Ultra</h3>
                  <p class="ja-pricing__price">¥480<span>/月</span></p>
                  <p class="ja-pricing__daily">年額 ¥3,600<span>月あたり¥300・1日あたり約10円</span></p>
                  <p class="ja-pricing__summary">無制限保存、CSV、バックアップと復元など、全機能を利用できます。</p>
                </article>
              </div>
              <p class="ja-pricing__billing-note">※1日あたりの金額は年額料金を365日で換算しています。実際の請求は年額です。</p>
              <a class="ja-pricing__link" href="/plans">プランの違いを詳しく見る</a>
            </div>
          </div>
        </section>
        ` : ""}

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
                        macOS 26以上のM系（Apple Silicon）で開発・動作確認をしております。
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
                          <span class="faq__plan-price">月額300円（1日あたり10円）</span><br />
                          Freeプランでは物足りない方へ。保存上限の増加やTodo機能など便利な機能が解放されます。
                        </dd>
                      </div>
                      <div class="faq__plan">
                        <dt>Ultraプラン</dt>
                        <dd>
                          <span class="faq__plan-price">月額480円（1日あたり16円）</span><br />
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
                  <summary class="faq__summary">スマホテザリングのWi-Fiでも使えますか？</summary>
                  <div class="faq__answer">
                    <p>
                      使えますが、Wi-Fi通信の速度が遅いため、コピペの反映が少し遅くなります。
                    </p>
                    <p>
                      通信速度の早いWi-Fiネットワークの方が動作が早く、快適にご利用いただけます。
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
              <h2 id="cta-title">${isJapanese ? "SideClipを、<br />あなたのMacで。" : "コピーの置き場所を、<br />Macの横に。"}</h2>
            </div>
            <div class="reveal__rest">
              <p>
                ${isJapanese
                  ? "アカウント登録なしで、Freeプランから始められます。"
                  : "Apple Silicon搭載Macで無料で始められます。<br />ダウンロード後、SideClipアプリ内からプランを選べます。"}
              </p>
            </div>
          </div>
          <div class="reveal__rest final-cta__action">
            <a class="download-button download-button--light" href="${MAC_DOWNLOAD_URL}" data-download-link data-cta-id="final_download" data-cta-section="final_cta" aria-label="SideClipをMacで無料ダウンロード">
              <!-- ${icon.download} -->
              Macで無料ダウンロード
            </a>
            <p>${isJapanese ? "macOS 26以降・Apple Silicon搭載Macに対応" : "Apple Silicon搭載のMacに対応"}</p>
            ${isJapanese ? `
              <nav class="cta-links cta-links--ja" aria-label="補助リンク">
                <a href="#concept-video">製品デモ</a>
                <a href="/plans">料金プラン</a>
                <a href="./security.html">セキュリティ</a>
              </nav>
              <ul class="trust-list trust-list--ja" aria-label="利用条件">
                <li>${icon.checkCircle}アカウント・ログイン不要</li>
                <li>${icon.lock}コピー履歴はMac内に保存</li>
              </ul>
            ` : `
              <nav class="cta-links" aria-label="補助リンク">
                <a class="is-primary" href="#concept-video">コンセプト動画</a>
                <a href="#features-title">SideClipの主な機能</a>
                <a href="#usage-scenes-title">具体的な使用シーン</a>
                <a href="#local-title">ローカル同期</a>
                <a href="/plans">料金・プラン比較</a>
              </nav>
              <ul class="trust-list" aria-label="利用条件">
                ${renderTrustItems()}
              </ul>
            `}
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
    if (!wrap) return;

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
      modestbranding: "1",
      rel: "0",
      playsinline: "1"
    });
    const pageOrigin = window.location.origin;
    const canEmbedInline = pageOrigin && pageOrigin !== "null";
    if (canEmbedInline) {
      embedParams.set("origin", pageOrigin);
    }
    const embedUrl = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${embedParams.toString()}`;
    const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;

    function loadIframe() {
      const isEnglish = window.SideClipI18n?.getLang?.() === "en";
      if (!canEmbedInline) {
        window.open(watchUrl, "_blank", "noopener,noreferrer");
        return;
      }
      if (wrap.dataset.loaded === "1") return;
      wrap.dataset.loaded = "1";
      wrap.classList.remove(posterModifierClass);
      wrap.innerHTML = "";
      const iframe = document.createElement("iframe");
      iframe.width = "560";
      iframe.height = "315";
      iframe.src = embedUrl;
      iframe.title = isEnglish ? iframeTitleEn : iframeTitle;
      iframe.setAttribute("frameborder", "0");
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.allowFullscreen = true;
      wrap.appendChild(iframe);

      const fallback = document.createElement("a");
      fallback.className = "video-embed-fallback";
      fallback.href = watchUrl;
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
  }

  function initConceptVideoEmbed() {
    initYoutubePosterEmbed(document.querySelector(".concept-video__embed--poster"), getConceptVideoId(), {
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
    const modalIds = new Set(["feature-lightbox", "feature-video-lightbox"]);
    [...page.children].forEach((child) => {
      const shouldKeepInteractive = modalIds.has(child.id);
      if (!enabled || shouldKeepInteractive) {
        child.removeAttribute("inert");
        return;
      }
      child.setAttribute("inert", "");
    });
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
    links.forEach((link) => {
      link.addEventListener("click", () => {
        const trackingData = {
          ctaId: link.dataset.ctaId || "mac_download",
          ctaText: (link.textContent || "").trim(),
          section: link.dataset.ctaSection || "download"
        };
        trackCtaClick({
          ...trackingData
        });
        trackMacDownload({ ...trackingData, linkUrl: link.href });
      });
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
    initCtaNavHashLinks();
    initSectionDrawer();
    initSyncLineRailLayout();
    initHeroSyncGraphicPlacement();
    initHashScroll();
  }

  window.SideClipLandingPrerender = { render: renderApp };

  if (!window.__SIDECLIP_PRERENDER__) {
    document.addEventListener("DOMContentLoaded", mount);
  }
})();
