(function () {
  const ASSET_VERSION = "20260512-hero-raster-icons";
  const CONCEPT_VIDEO_YT_ID = "b0-eWvKMeOk";
  const WIP_DOWNLOAD_X_URL = "https://x.com/sideclip_dev?s=21&t=2OHl3cS0nDMUprBn7N6jyw";
  const PRE_REGISTRATION_FORM_URL = "https://forms.gle/KbNn5T3TBVz459HBA";

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
    heroMain: `./assets/hero_blank_clean.png?v=${ASSET_VERSION}`,
    heroPhone: `./assets/hero_phone_v2_web.png?v=${ASSET_VERSION}`,
    heroMainFallback: `./assets/hero-banner.jpg?v=${ASSET_VERSION}`,
    stepCopy: `./assets/step-copy.png?v=${ASSET_VERSION}`,
    stepAdd: `./assets/step-add.png?v=${ASSET_VERSION}`,
    stepTap: `./assets/step-tap.png?v=${ASSET_VERSION}`,
    stepPaste: `./assets/step-paste.png?v=${ASSET_VERSION}`,
    featureHistory: `./assets/feature-panel-history.jpg?v=${ASSET_VERSION}`,
    featureFavorite: `./assets/feature-panel-favorite.jpg?v=${ASSET_VERSION}`,
    featureTodo: `./assets/feature-panel-todo.jpg?v=${ASSET_VERSION}`,
    featureScan: `./assets/feature-panel-scan.jpg?v=${ASSET_VERSION}`,
    usageScenes: `./assets/具体シーン.png?v=${ASSET_VERSION}`,
    clipboardDifference: `./assets/違い.jpeg?v=${ASSET_VERSION}`,
    flowIconMac: `./assets/flow-icon-mac.png?v=${ASSET_VERSION}`,
    flowIconPhone: `./assets/flow-icon-phone.png?v=${ASSET_VERSION}`,
    flowIconTap: `./assets/flow-icon-tap.png?v=${ASSET_VERSION}`,
    flowIconCheck: `./assets/flow-icon-check.png?v=${ASSET_VERSION}`,
    heroIconSceneResearch: `./assets/hero_icon_scene_research.png?v=${ASSET_VERSION}`,
    heroIconSceneChat: `./assets/hero_icon_scene_chat.png?v=${ASSET_VERSION}`,
    heroIconSceneIdea: `./assets/hero_icon_scene_idea.png?v=${ASSET_VERSION}`,
    heroIconHighlightLock: `./assets/hero_icon_highlight_lock.png?v=${ASSET_VERSION}`,
    heroIconHighlightBolt: `./assets/hero_icon_highlight_bolt.png?v=${ASSET_VERSION}`,
    heroIconHighlightQr: `./assets/hero_icon_highlight_qr.png?v=${ASSET_VERSION}`,
  };

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
      number: "1",
      title: "Macで<br />コピー",
      iconSrc: ASSETS.flowIconMac,
      alt: "Macでコピーするステップ",
    },
    {
      number: "2",
      title: "スマホに<br />自動追加",
      iconSrc: ASSETS.flowIconPhone,
      alt: "スマホへコピー内容が自動追加されるステップ",
      labelAccent: true,
    },
    {
      number: "3",
      title: "スマホを<br />タップ",
      iconSrc: ASSETS.flowIconTap,
      alt: "スマホ画面をタップするステップ",
    },
    {
      number: "4",
      title: "Macに<br />即ペースト",
      iconSrc: ASSETS.flowIconCheck,
      alt: "Macへ即座にペーストされるステップ",
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
      title: "横目でサッと確認",
      text: "スマホに常時表示。<br />必要なコピー履歴をすぐに<br />見つけられます。",
    },
    {
      icon: icon.tapFlow,
      title: "Tap to Paste",
      text: "ワンタップで<br />即座にペースト。<br />ウィンドウ切替不要。",
    },
    {
      icon: icon.media,
      title: "テキスト・画像に対応",
      text: "あらゆるコピー履歴を<br />スマホで管理。<br />スクショも画像もOK。",
    },
    {
      icon: icon.lock,
      title: "ローカル同期で安心",
      text: "クリップボード履歴データは<br />外部に送信されません。<br />安全かつ高速。",
    },
  ];

  const features = [
    {
      title: "クリップボード履歴",
      image: ASSETS.featureHistory,
      alt: "クリップボード履歴画面",
      text: "コピーした内容を自動で保存。<br />クラウドを介さないので瞬時に表示されます。<br />一定以上溜まったカードは自動で削除されます。",
    },
    {
      title: "Favorite（お気に入り)",
      image: ASSETS.featureFavorite,
      alt: "お気に入り保存画面",
      text: "重要なクリップはスワイプし、価値あるデータだけ保持。<br />あなた専用のお気に入りコピペ集を作成できます。",
    },
    {
      title: "Todoモード",
      image: ASSETS.featureTodo,
      alt: "Todoモード画面",
      text: "カードをスワイプするだけでTodo化。<br />優先度設定するとカードの色が変わって一目瞭然。<br />Apple純正リマインダーアプリと同期可能。<br /><small>（Pro / Ultraプラン）</small>",
    },
    {
      title: "瞬時にMacをスクショ",
      image: ASSETS.featureScan,
      alt: "MacをキャプチャするSCAN画面",
      text: "スマホの「SCAN」ボタンで、Macのスクショをリモート起動。<br />範囲指定するとクリップボード履歴にスクショが<br />カードとして自動同期されます。<br /><small>（Pro / Ultraプラン）</small>",
    },
  ];

  const trustItems = [
    [icon.gift, "Freeプランでお試し可能"],
    [icon.checkCircle, "より多機能なProプラン/Ultraプランも"],
  ];

  function renderMiniFlow() {
    return tapFlowSteps
      .map((step, index) => {
        const labelClass = step.labelAccent ? " step-card__label--accent" : "";
        const plusClass = step.plusBadge ? " step-card__icon-ring--plus" : "";
        const iconInner = step.iconSrc
          ? `<img class="flow-step-icon-img" src="${step.iconSrc}" alt="${step.alt}" width="56" height="56" loading="eager" decoding="async" />`
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
          index < tapFlowSteps.length - 1
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
            <img src="${step.image}" alt="${step.alt}" />
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

  function renderFeatures() {
    return features
      .map(
        (feature) => `
          <article class="feature-card interactive-card">
            <h3>${feature.title}</h3>
            <p>${feature.text}</p>
            <button
              type="button"
              class="feature-card__panel feature-zoom-trigger"
              data-feature-image-src="${feature.image}"
              data-feature-image-alt="${feature.alt}"
              aria-label="${feature.title}の画像を拡大表示"
            >
              <img
                src="${feature.image}"
                srcset="${feature.image} 1x, ${feature.image} 2x"
                sizes="(max-width: 680px) 100vw, 50vw"
                alt="${feature.alt}"
                loading="lazy"
                decoding="async"
              />
            </button>
          </article>
        `
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
    return `
      <main class="page-shell">
        <header class="hero__header">
          <div class="hero__header-brand">
            <a class="brand hero__brand" href="#" aria-label="SideClip（Macのクリップボードアプリ）">
              <span>Side</span><strong>Clip</strong>
            </a>
            <p class="hero__tagline" title="Clipboard app for Mac" aria-hidden="true">
              <span lang="en">Clipboard app for Mac</span>
            </p>
          </div>
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
                  <p class="hero__banner-overlay-lead hero__banner-overlay-line hero__banner-overlay-line--lead">
                    Macのコピー履歴を、<br />画面の<span class="hero__banner-accent">「外」</span>へ。
                  </p>
                  <p class="hero__banner-overlay-sub hero__banner-overlay-line hero__banner-overlay-line--sub">
                    スマホを常時表示の<br />クリップボード拡張デバイスに。
                  </p>
                  <ul class="hero__banner-pills" aria-label="主な特長">
                    <li class="hero__banner-pill">
                      <span class="hero__banner-pill-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" fill="none" aria-hidden="true">
                          <rect x="5.25" y="2.75" width="13.5" height="19.5" rx="2.75" stroke="currentColor" stroke-width="1.45" />
                          <line x1="9.5" y1="20.35" x2="14.5" y2="20.35" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" opacity="0.45" />
                          <rect x="8.1" y="7.35" width="7.8" height="9.4" rx="1.05" stroke="currentColor" stroke-width="1.35" />
                          <path d="M8.1 9.85h2.35l.75-1.15" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                          <line x1="10.35" y1="12.15" x2="14.55" y2="12.15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                          <line x1="10.35" y1="14.05" x2="14.2" y2="14.05" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                          <line x1="10.35" y1="15.9" x2="13.5" y2="15.9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                        </svg>
                      </span>
                      <span>常時表示</span>
                    </li>
                    <li class="hero__banner-pill">
                      <span class="hero__banner-pill-icon hero__banner-pill-icon--tapflow" aria-hidden="true">
                        ${icon.tapFlow}
                      </span>
                      <span>Tap to Paste</span>
                    </li>
                    <li class="hero__banner-pill">
                      <span class="hero__banner-pill-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" fill="none" aria-hidden="true">
                          <path
                            d="M7.35 9.2a5.35 5.35 0 0 1 9.3-3.7"
                            stroke="currentColor"
                            stroke-width="1.45"
                            stroke-linecap="round"
                          />
                          <path
                            d="M5.85 7.35V10h2.85"
                            stroke="currentColor"
                            stroke-width="1.45"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.65 14.8a5.35 5.35 0 0 1-9.3 3.7"
                            stroke="currentColor"
                            stroke-width="1.45"
                            stroke-linecap="round"
                          />
                          <path
                            d="M18.15 16.65V14h-2.85"
                            stroke="currentColor"
                            stroke-width="1.45"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      <span>ローカル同期</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="section-drawer" id="section-drawer" aria-hidden="true">
          <button type="button" class="section-drawer__backdrop" aria-label="メニューを閉じる" data-section-menu-close></button>
          <nav class="section-drawer__panel" aria-label="ページメニュー">
            <button type="button" class="section-drawer__close" aria-label="メニューを閉じる" data-section-menu-close>×</button>
            <a href="#hero-title" data-section-menu-link>トップ</a>
            <a href="#concept-video" data-section-menu-link>コンセプト動画</a>
            <a href="#tap-title" data-section-menu-link>Tap to Paste</a>
            <a href="#clipboard-shift-title" data-section-menu-link>他のクリップボードマネージャーとの違い</a>
            <a href="#features-title" data-section-menu-link>SideClipの主な機能</a>
            <a href="#usage-scenes-title" data-section-menu-link>具体的な使用シーン</a>
            <a href="#local-title" data-section-menu-link>安全かつ高速な理由</a>
            <a href="#faq" data-section-menu-link>FAQ</a>
            <a href="#download" data-section-menu-link>新たなクリップボード体験を始める</a>
            <a href="#site-legal-footer" data-section-menu-link>ポリシー・規約</a>
          </nav>
        </div>

        <div class="content-overlay">
        <div class="hero__content reveal is-visible">
          <p class="hero__banner-copy">画面の切り替えは、もう不要。</p>
          <p class="hero__hook">「さっきコピーしたデータ、どこだっけ？」<br />「もう一度コピーしなきゃ」</p>
          <p class="hero__hook">コピペが増えるほど、画面の行き来が重なります。</p>
          <div class="hero__infographic-card">
            <h1 id="hero-title" class="hero__infographic-title">
              <span class="tap-infographic__title-stack">
                <span class="tap-infographic__title-line tap-infographic__title-line--primary">
                  スマホをあなたの<span class="tap-infographic__title-accent">“横のクリップボード”</span>に。
                </span>
              </span>
            </h1>
            <ol class="mini-flow" aria-label="SideClipの流れ">
              ${renderMiniFlow()}
            </ol>
          </div>

          <div class="hero-scene-card" aria-labelledby="hero-scene-title">
            <h2 id="hero-scene-title" class="hero-scene-card__title">こんなシーンでサッと活躍</h2>
            <ul class="hero-scene-card__list">
              <li class="hero-scene-card__item">
                <span class="hero-scene-card__icon" aria-hidden="true">
                  <img
                    src="${ASSETS.heroIconSceneResearch}"
                    srcset="${ASSETS.heroIconSceneResearch} 1x, ${ASSETS.heroIconSceneResearch} 2x"
                    width="176"
                    height="176"
                    alt=""
                    decoding="async"
                  />
                </span>
                <div class="hero-scene-card__body">
                  <p class="hero-scene-card__item-title">リサーチ・資料作成</p>
                  <p class="hero-scene-card__item-text">調べた情報を横に並べて、スムーズにまとめる。</p>
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
                    decoding="async"
                  />
                </span>
                <div class="hero-scene-card__body">
                  <p class="hero-scene-card__item-title">チャット・メール</p>
                  <p class="hero-scene-card__item-text">定型文やリンクをすぐ貼れて、やり取りを高速化。</p>
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
                    decoding="async"
                  />
                </span>
                <div class="hero-scene-card__body">
                  <p class="hero-scene-card__item-title">アイデア・メモ整理</p>
                  <p class="hero-scene-card__item-text">思いついた内容を逃さず、あとで見返して活用。</p>
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
                  decoding="async"
                />
              </span>
              <div class="hero-highlight-card__body">
                <p class="hero-highlight-card__title">設定いらずでシンプル</p>
                <p class="hero-highlight-card__text">アカウント登録・ログイン不要。スマホアプリも不要です。</p>
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
                  decoding="async"
                />
              </span>
              <div class="hero-highlight-card__body">
                <p class="hero-highlight-card__title">接続はQRコードで簡単</p>
                <p class="hero-highlight-card__text">スマホのカメラで読み込むだけ。すぐにつながります。</p>
              </div>
            </li>
          </ul>

          <ul class="hero-kpis" aria-label="SideClipで得られる効果">
            <li>Mac専用アプリ</li>
            <li>MacとiPhone/iPad/Androidスマホとつながる</li>
          </ul>
          <a class="download-button" href="#" data-wip-download-trigger data-cta-id="hero_download_status" data-cta-section="hero" aria-label="事前登録特典で、Ultraプラン3か月無料クーポンをプレゼント">
            <!-- ${icon.download} -->
            事前登録で<br />全料機能お試し3か月無料<br />クーポンプレゼント
          </a>
          <p class="download-microcopy">※現在リリース準備中</p>
          <p class="os-note">Apple Silicon搭載のMacに対応</p>
        </div>
        <section id="concept-video" class="concept-video reveal" aria-labelledby="concept-video-title">
          <div class="concept-video__copy">
            <h2 id="concept-video-title">コンセプト動画で<br />SideClipを知る</h2>
            <p>30秒でわかる、常時表示のコピペ体験</p>
            
          </div>
          <div class="concept-video__visual" aria-label="コンセプト動画（YouTube）">
            <div class="concept-video__embed concept-video__embed--poster">
              <button type="button" class="concept-video__facade" data-cta-id="concept_video_play" data-cta-section="concept_video" aria-label="コンセプト動画を再生する（約30秒・YouTube）">
                <img
                  class="concept-video__poster"
                  src="https://i.ytimg.com/vi/${CONCEPT_VIDEO_YT_ID}/maxresdefault.jpg"
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

        <section class="tap-section" aria-labelledby="tap-title">
          <div class="tap-section__reveal reveal">
            <div class="section-copy section-copy--tap">
              <h2 id="tap-title">指先ひとつの <span>「Tap to Paste」</span></h2>
              <p>
                スマホ画面に並んだカードを<wbr />タップするだけ。<br class="desktop-break" /><br class="mobile-break" />
                <span class="tap-emphasis">キーボードの拡張デバイス</span>のような感覚で、<wbr />使い方は無限大。<br class="desktop-break" /><br class="mobile-break" />
                1日に何回コピペ・スクショをしますか？<br />Macのウィンドウ切り替えを減らし、<br class="mobile-break" />集中して作業効率を上げましょう。
                <br class="mobile-break" />
              </p>
            </div>
            <ol class="steps" aria-label="Tap to Pasteの4ステップ">
              ${renderSteps()}
            </ol>
          </div>
        </section>

        <section class="benefits" aria-labelledby="benefits-title">
          <div class="benefits__reveal reveal">
            <div class="section-copy">
              <h2 id="benefits-title">作業の流れを、止めない。</h2>
              <p>
                SideClipのリスト操作は、<br />スワイプとタップで非常にスムーズに動作します。<br />
                コピー履歴の確認からペーストまで、<br />
                直感的な操作で完了できます。
              </p>
            </div>
            <div class="benefit-grid">
              ${renderBenefits()}
            </div>
          </div>
        </section>

        <section class="clipboard-shift" aria-labelledby="clipboard-shift-title">
          <div class="clipboard-shift__reveal reveal">
            <h2 id="clipboard-shift-title" class="clipboard-shift__title">
              呼び出すクリップボードから、<br />
              横に置くクリップボードへ
            </h2>
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
            <div class="clipboard-shift__prose">
              <p>
                多くのクリップボードマネージャーは、使うたびにMacの画面内で「呼び出す」必要があります。
              </p>
              <p>
                画面の切り替え・ウィンドウの重なりで、集中が途切れてしまったり、ペースト用ショートカットを忘れてしまったり…
              </p>
              <p class="clipboard-shift__emphasis">SideClipは、発想を変えました。</p>
              <p>
                Mac画面の中で「呼び出す」のではなく、
                スマホを「横に置いて常時表示」のクリップボード画面として使います。
              </p>
              <p>
                探す・思い出す・呼び出す負担を減らし、コピペをもっと直感的に。
              </p>
              <p>
                クリップボードが“画面の中で操作するもの”から、“横に置いて使うもの”へ変わります。
              </p>
            </div>
          </div>
        </section>

        <section class="features" aria-labelledby="features-title">
          <div class="features__reveal reveal">
            <h2 id="features-title">SideClipの主な機能</h2>
            <div class="feature-grid">
              ${renderFeatures()}
            </div>
            <p class="features__plan-note">
              まずは<strong class="features__plan-note-free">Freeプラン</strong>から。コピペなど基本機能が使えて無料です。<br />さらにコピー履歴の保存件数アップやTodoモードなど、作業をさらに加速させる<span class="features__plan-note-paid"><span class="features__plan-note-tier">Pro / Ultra</span>プラン</span>もご用意しています。
            </p>
          </div>
        </section>

        <section class="usage-scenes" aria-labelledby="usage-scenes-title">
          <div class="usage-scenes__reveal reveal">
            <h2 id="usage-scenes-title">具体的な使用シーン</h2>
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
            <div class="usage-scenes__cases">
              <article class="usage-scenes__case">
                <p class="usage-scenes__case-badge">
                  <span class="usage-scenes__case-badge-icon" aria-hidden="true">${icon.usageCaseDev}</span>
                  <span class="usage-scenes__case-badge-label">開発者・プログラマー</span>
                </p>
                <h3 class="usage-scenes__case-title">頻繁に使うコードやコマンドを、手元にストック。</h3>
                <p class="usage-scenes__case-text">
                  生成AIによりコードを書くことは減ったかもしれませんが、コピペ操作は増えてませんか？<br />よく使うプロンプト・コード・コマンドなどをスマホ画面に並べて管理。<br />エディタから離れず、コーディングに集中できます。
                </p>
              </article>
              <article class="usage-scenes__case">
                <p class="usage-scenes__case-badge">
                  <span class="usage-scenes__case-badge-icon" aria-hidden="true">${icon.usageCaseLlm}</span>
                  <span class="usage-scenes__case-badge-label">AIツール（LLM）活用者</span>
                </p>
                <h3 class="usage-scenes__case-title">AIへのプロンプト入力を、もっと直感的に。</h3>
                <p class="usage-scenes__case-text">
                  生成AIを使い始めてコピペの回数が増大した方へ。<br />よく使うプロンプトをお気に入りに整理することで、AIとの対話がスムーズになります。
                </p>
              </article>
              <article class="usage-scenes__case">
                <p class="usage-scenes__case-badge">
                  <span class="usage-scenes__case-badge-icon" aria-hidden="true">${icon.usageCaseShop}</span>
                  <span class="usage-scenes__case-badge-label">フリマ・オークション・ECサイト出品者</span>
                </p>
                <h3 class="usage-scenes__case-title">繰り返しの出品作業やメッセージ返信を爆速化。</h3>
                <p class="usage-scenes__case-text">
                  せどりなどで、大量に商品を入荷・出品・発送される方へ。<br />副業や事務作業のコピペ効率を上げて、収益も上げましょう！
                </p>
              </article>
            </div>
          </div>
        </section>

        <section class="local-sync" aria-labelledby="local-title">
          <div class="local-sync__reveal reveal">
            <h2 id="local-title" class="local-sync__heading">大事なコピー履歴は、<br />クラウドに出さない。<br /><span class="local-sync__title-nowrap">ローカル通信で安全かつ高速。</span></h2>
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
              <p>ローカルWi-Fiで直接同期</p>
            </div>
            <div class="local-sync__text">
              <p>
                SideClipはクラウドを使わず、コピー履歴をあなたのMac内に保存します。<br />
                スマホやタブレットとの同期も、同じWi-Fi内のローカル通信だけで完結します。<br />
                外部サーバーを経由しないため、コピー履歴がSideClipのクラウドに送信されることはありません。
              </p>
              <p class="local-sync__detail-link">
                <a href="./security.html">セキュリティ対策の詳細を見る</a>
              </p>
              <div class="sync-tags" aria-label="SideClipの同期特性">
                <span>高速</span>
                <span>安全</span>
                <span>プライベート</span>
              </div>
            </div>
          </div>
        </section>

        <section class="faq reveal" id="faq" aria-labelledby="faq-title">
          <div class="faq__inner">
            <h2 id="faq-title" class="faq__title">FAQ</h2>

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
                        <span class="faq__note">Safari/Chromeで開発・動作確認済み。<br />最新バージョンのブラウザをご使用ください。<br />セキュリティのためにも、最新バージョンのブラウザをご使用ください。</span>
                      </li>
                    </ul>
                  </div>
                </details>
                <details class="faq__item">
                  <summary class="faq__summary">無料で利用できますか？有料プランとの違いは何ですか？</summary>
                  <div class="faq__answer">
                    <p>Freeプランで基本機能は無料でご利用いただけます。<br />有料プランの前にご自身の環境で動作確認をお勧めいたします。</p>
                    <p>Proプラン・Ultraプランは、より便利な機能が解放されます。<br />詳しくはアプリインストール後、スマホ側画面に表示されるメニュー内の「プラン」をご確認ください。</p>
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
                      <li>その他のファイル：対象外（カードが生成されません）</li>
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
        </section>

        <section class="final-cta reveal" id="download" aria-labelledby="cta-title">
          <div class="final-cta__copy">
            <h2 id="cta-title"><span class="final-cta__line--nowrap">クリップボードの概念を、変える。</span></h2>
            <p>
              SideClipは、コピー履歴を探す時間を減らし、<br />
              いつものコピペをもっとスムーズにします。<br />
              Mac横のクリップボードで作業が快適に。
            </p>
            <strong><span class="final-cta__line--nowrap">新たなクリップボードを体験しよう。</span></strong>
          </div>
          <div class="final-cta__action">
            <a class="download-button download-button--light" href="#" data-wip-download-trigger data-cta-id="final_download_status" data-cta-section="final_cta" aria-label="事前登録で、Ultraプラン3か月無料クーポンをプレゼント">
              <!-- ${icon.download} -->
              事前登録で<br />全機能お試し3か月無料<br />クーポンプレゼント
            </a>
            <p class="download-microcopy">※現在リリース準備中</p>
            <p>Apple Silicon搭載のMacに対応</p>
            <nav class="cta-links" aria-label="補助リンク">
              <a class="is-primary" href="#concept-video">コンセプト動画</a>
              <a href="#features-title">SideClipの主な機能</a>
              <a href="#usage-scenes-title">具体的な使用シーン</a>
              <a href="#local-title">ローカル同期</a>

            </nav>
            <ul class="trust-list" aria-label="利用条件">
              ${renderTrustItems()}
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

        <div class="wip-download-modal" id="wip-download-modal" aria-hidden="true">
          <div
            class="wip-download-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wip-download-desc"
          >
            <button type="button" class="wip-download-modal__close" aria-label="閉じる">×</button>
            <p id="wip-download-desc" class="wip-download-modal__text">
              ただいま絶賛アプリ開発中です。もうしばらくお待ちください。<br />
              開発の進捗は、開発者の"X(Twitter)"をチェックしてください。<br />
              事前登録で、Ultraプラン3か月無料クーポンをプレゼント🎁（先着5名様限定）
            </p>
            <a
              class="wip-download-modal__formlink"
              href="${PRE_REGISTRATION_FORM_URL}"
              target="_blank"
              rel="noopener noreferrer"
              >事前登録（Googleフォーム）</a>
            <a
              class="wip-download-modal__xlink"
              href="${WIP_DOWNLOAD_X_URL}"
              target="_blank"
              rel="noopener noreferrer"
              >SideClip 開発アカウント（X）を開く</a>
            <button type="button" class="wip-download-modal__dismiss">閉じる</button>
          </div>
        </div>

        <footer class="site-footer" id="site-legal-footer" role="contentinfo">
          <nav class="site-footer__nav" aria-label="サイト情報">
            <a href="./terms.html" target="_blank" rel="noopener noreferrer">利用規約</a>
            <span class="site-footer__sep" aria-hidden="true">·</span>
            <a href="./privacy.html" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
            <span class="site-footer__sep" aria-hidden="true">·</span>
            <a href="./tokushoho.html" target="_blank" rel="noopener noreferrer">特定商取引法に基づく表記</a>
          </nav>
          <p class="site-footer__copyright">© 2026 SideClip. All rights reserved.</p>
        </footer>
      </main>
    `;
  }

  function initReveal() {
    const revealNodes = document.querySelectorAll(".reveal");
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    if (shouldReduceMotion) {
      revealNodes.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    /* transform による見かけの位置ずれでも交差しやすいよう、やや低めにする */
    const REVEAL_ENTER_RATIO = 0.05;
    const REVEAL_EXIT_RATIO = 0.04;
    /* observer の rootMargin bottom 22% と同じ比率（フォールバックで画面外まで一括表示しないため） */
    const REVEAL_ROOT_MARGIN_BOTTOM_FRAC = 0.22;
    /* 表示開始遅延 + 短い揺り戻しでもすぐ消えないよう少し長めに */
    const REVEAL_EXIT_DEBOUNCE_MS = 450;
    /* 初回ペイント後に付与するまでの待ち（CSS transition-delay は使わない） */
    const REVEAL_START_DELAY_MS = 220;
    const revealHideTimers = new WeakMap();
    const revealEnterTimers = new WeakMap();
    /** 遅いスクロールで queueRevealVisible が連打されても、予約を最初の1回に固定する */
    const revealShowArm = new WeakSet();
    const revealThresholds = Array.from({ length: 21 }, (_, i) => i * 0.05);

    /** IO の root（ビューポート＋下マージン）と同程度か — 画面外ブロックに is-visible を付けない */
    function revealLikelyIntersectsObserverRoot(el) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      const vw = window.innerWidth || document.documentElement.clientWidth || 0;
      if (vh <= 0) return false;
      const rootBottom = vh * (1 + REVEAL_ROOT_MARGIN_BOTTOM_FRAC);
      return r.bottom > 0 && r.top < rootBottom && r.right > 0 && r.left < vw;
    }

    function cancelRevealHide(el) {
      const id = revealHideTimers.get(el);
      if (id != null) {
        window.clearTimeout(id);
        revealHideTimers.delete(el);
      }
    }

    function cancelRevealEnter(el) {
      revealShowArm.delete(el);
      const id = revealEnterTimers.get(el);
      if (id != null) {
        window.clearTimeout(id);
        revealEnterTimers.delete(el);
      }
    }

    function queueRevealVisible(el) {
      if (!el || el.classList.contains("hero__content")) return;
      if (el.classList.contains("is-visible")) return;
      /* 既に表示予約中なら再スケジュールしない（遅スクロールで遅延が永遠に延びない） */
      if (revealShowArm.has(el) || revealEnterTimers.has(el)) return;
      revealShowArm.add(el);
      cancelRevealHide(el);

      const run = () => {
        if (!el.isConnected) return;
        if (el.classList.contains("is-visible")) return;
        void el.offsetWidth;
        el.classList.add("is-visible");
      };

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (!revealShowArm.has(el)) return;
          const id = window.setTimeout(() => {
            revealEnterTimers.delete(el);
            revealShowArm.delete(el);
            run();
          }, REVEAL_START_DELAY_MS);
          revealEnterTimers.set(el, id);
        });
      });
    }

    function scheduleRevealHide(el) {
      cancelRevealEnter(el);
      cancelRevealHide(el);
      const id = window.setTimeout(() => {
        revealHideTimers.delete(el);
        el.classList.remove("is-visible");
      }, REVEAL_EXIT_DEBOUNCE_MS);
      revealHideTimers.set(el, id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const latestByTarget = new Map();
        for (const entry of entries) {
          latestByTarget.set(entry.target, entry);
        }
        latestByTarget.forEach((entry) => {
          const el = entry.target;
          if (el.classList.contains("hero__content")) return;

          const ratio = entry.intersectionRatio;
          const isShown = el.classList.contains("is-visible");

          if (ratio >= REVEAL_ENTER_RATIO) {
            cancelRevealHide(el);
            queueRevealVisible(el);
            return;
          }

          if (isShown && (ratio <= REVEAL_EXIT_RATIO || !entry.isIntersecting)) {
            scheduleRevealHide(el);
          }
        });
      },
      {
        threshold: revealThresholds,
        rootMargin: `0px 0px ${REVEAL_ROOT_MARGIN_BOTTOM_FRAC * 100}% 0px`,
      }
    );

    window.requestAnimationFrame(() => {
      revealNodes.forEach((target) => {
        if (!target.classList.contains("hero__content")) {
          observer.observe(target);
        }
      });
    });

    window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((target) => {
        if (target.classList.contains("hero__content")) return;
        /* 全セクション一括は遅スクロールで「もう表示済み」になりアニメが消えるため、交差見込みのみ */
        if (!revealLikelyIntersectsObserverRoot(target)) return;
        queueRevealVisible(target);
      });
    }, 3200);
  }

  function initFlowCycle() {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (shouldReduceMotion) return;

    const flowItems = [...document.querySelectorAll("[data-flow-index]")];
    const stepItems = [...document.querySelectorAll("[data-step-index]")];
    let active = 0;

    function setActive(index) {
      flowItems.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === index));
      stepItems.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === index));
    }

    setActive(active);
    window.setInterval(() => {
      active = (active + 1) % Math.max(flowItems.length, 1);
      setActive(active);
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

  function initConceptVideoEmbed() {
    const wrap = document.querySelector(".concept-video__embed--poster");
    if (!wrap) return;

    const embedUrl =
      "https://www.youtube-nocookie.com/embed/" +
      CONCEPT_VIDEO_YT_ID +
      "?autoplay=1&modestbranding=1&rel=0&playsinline=1";

    function loadIframe() {
      if (wrap.dataset.loaded === "1") return;
      wrap.dataset.loaded = "1";
      wrap.classList.remove("concept-video__embed--poster");
      wrap.innerHTML = "";
      const iframe = document.createElement("iframe");
      iframe.width = "560";
      iframe.height = "315";
      iframe.src = embedUrl;
      iframe.title = "SideClip コンセプト動画";
      iframe.setAttribute("frameborder", "0");
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.allowFullscreen = true;
      wrap.appendChild(iframe);
    }

    wrap.querySelector(".concept-video__facade")?.addEventListener("click", (event) => {
      const trigger = event.currentTarget;
      trackCtaClick({
        ctaId: trigger?.dataset?.ctaId || "concept_video_play",
        ctaText: "コンセプト動画を再生する",
        section: trigger?.dataset?.ctaSection || "concept_video"
      });
      loadIframe();
    });

    document.querySelectorAll('a[href="#concept-video"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        alignTargetTopWithViewport(resolveHashScrollTarget("concept-video"), { smooth: true });
        loadIframe();
      });
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
    const modalIds = new Set(["feature-lightbox", "wip-download-modal"]);
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

  function initDownloadWipModal() {
    const modal = document.querySelector("#wip-download-modal");
    if (!modal) return;

    const dialog = modal.querySelector(".wip-download-modal__dialog");
    const closeBtn = modal.querySelector(".wip-download-modal__close");
    const dismissBtn = modal.querySelector(".wip-download-modal__dismiss");
    const triggers = document.querySelectorAll("[data-wip-download-trigger]");
    let lastFocusedElement = null;

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-wip-download-modal");
      setPageInertState(false);
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
      lastFocusedElement = null;
    }

    function openModal(opener) {
      lastFocusedElement = opener || document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-wip-download-modal");
      setPageInertState(true);
      closeBtn?.focus();
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        trackCtaClick({
          ctaId: trigger.dataset.ctaId || "download_status",
          ctaText: (trigger.textContent || "").trim(),
          section: trigger.dataset.ctaSection || "unknown"
        });
        openModal(trigger);
      });
    });

    ["touchstart", "touchend", "click"].forEach((eventName) => {
      dialog?.addEventListener(eventName, (event) => {
        event.stopPropagation();
      });
    });

    [closeBtn, dismissBtn].forEach((btn) => {
      if (!btn) return;
      ["touchstart", "touchend", "click"].forEach((eventName) => {
        btn.addEventListener(eventName, (event) => {
          event.preventDefault();
          event.stopPropagation();
          closeModal();
        });
      });
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        event.preventDefault();
        closeModal();
      }
    });

    ["touchstart", "touchend"].forEach((eventName) => {
      modal.addEventListener(eventName, (event) => {
        event.stopPropagation();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      trapFocusInDialog(event, dialog);
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
      page_path: location.pathname
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
    document.querySelector("#root").innerHTML = renderApp();
    initReveal();
    initFlowCycle();
    initHeroTitleFit();
    initFinalCtaCopyFit();
    initHeroParallax();
    initHeroBannerEnter();
    initHeroBannerHeadlineScroll();
    initInteractiveCards();
    initConceptVideoEmbed();
    initFeatureImageLightbox();
    initDownloadWipModal();
    initCtaNavHashLinks();
    initSectionDrawer();
    initSyncLineRailLayout();
    initHeroSyncGraphicPlacement();
    initHashScroll();
  }

  document.addEventListener("DOMContentLoaded", mount);
})();
