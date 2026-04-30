(function () {
  const ASSET_VERSION = "20260430-usage-scene-png";
  const CONCEPT_VIDEO_YT_ID = "b0-eWvKMeOk";
  const WIP_DOWNLOAD_X_URL = "https://x.com/sideclip_dev?s=21&t=2OHl3cS0nDMUprBn7N6jyw";

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
    heroMain: `./assets/hero-banner.png?v=${ASSET_VERSION}`,
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
    laptopFlow: `
      <svg viewBox="0 0 48 40" aria-hidden="true">
        <rect x="8" y="7" width="32" height="21" rx="1.8" />
        <path d="M4 33h40" />
        <path d="M20 28h8" />
      </svg>
    `,
    clipboardFlow: `
      <svg viewBox="0 0 40 44" aria-hidden="true">
        <rect x="9" y="3" width="22" height="36" rx="3.5" />
        <path d="M16 8h8" />
        <path d="M15 15h2M21 15h5" />
        <path d="M15 21h2M21 21h5" />
        <path d="M15 27h2M21 27h5" />
      </svg>
    `,
    tapFlow: `
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <path d="M21 6.5v17" />
        <path d="M21 6.5a4 4 0 0 1 8 0V22" />
        <path d="M29 18.5a3.8 3.8 0 0 1 7.6 0v7.1c0 7.2-4 11.4-11.2 11.4h-4.7a8 8 0 0 1-6.5-3.4l-6-8.4a3.1 3.1 0 0 1 4.8-3.9l5.1 5.2" />
        <path d="M14 5.7 11.5 3.2M35 8l2.8-2.3M8.2 15.4H4.5" />
      </svg>
    `,
    checkFlow: `
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="18.5" />
        <path d="m13.7 22.5 5.4 5.4 11.2-12.1" />
      </svg>
    `,
  };

  const miniFlow = [
    [icon.laptopFlow, "Macで<br />コピー", ""],
    [icon.clipboardFlow, "スマホに<br />自動追加", ""],
    [icon.tapFlow, "スマホを<br />タップ", "flow-icon--svg-tap"],
    [icon.checkFlow, "Macに<br />即ペースト", "flow-icon--svg-check"],
  ];

  const steps = [
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
      text: "コピーした内容を自動で保存。<br />クラウドを介さないので瞬時に表示されます。<br />テキスト・画像・リンクなどを<br />まとめて確認できます。<br />一定以上溜まったカードは自動で削除されます。",
    },
    {
      title: "Favorite（Keep)",
      image: ASSETS.featureFavorite,
      alt: "お気に入り保存画面",
      text: "重要なクリップはスワイプし、<br />価値あるデータだけ保持。<br />あなた専用のお気に入りコピペ集を作成できます。<br />よく使う定型文・画像・AIプロンプト・<br />カラーコード・コマンドスニペットなどお好みで。",
    },
    {
      title: "Todoモード",
      image: ASSETS.featureTodo,
      alt: "Todoモード画面",
      text: "コピー履歴カードをスワイプするだけ。<br />そのままTodo化。<br />Todoアプリへ切り替えてペーストすら不要。<br />優先度設定するとカードの色が変わって一目瞭然。<br />Ultraプランは、Apple純正リマインダーアプリと同期可能。<br /><small>（Pro / Ultraプラン）</small>",
    },
    {
      title: "瞬時にMacをスクショ",
      image: ASSETS.featureScan,
      alt: "MacをキャプチャするSCAN画面",
      text: "スマホの'SCAN'ボタンをタップすると、<br />Mac画面がスクショ撮影モードに。<br />範囲指定するだけでクリップボード履歴にスクショが<br />カードとして自動同期されます。<br /><small>（Pro / Ultraプラン）</small>",
    },
  ];

  const trustItems = [
    [icon.gift, "Freeプランでお試し可能"],
    [icon.checkCircle, "より多機能なProプラン/Ultraプランも"],
  ];

  function renderMiniFlow() {
    return miniFlow
      .map(([svg, label, extraClass], index) => {
        const item = `
          <li data-flow-index="${index}">
            <span class="flow-icon flow-icon--svg ${extraClass}" aria-hidden="true">${svg}</span>
            <span>${label}</span>
          </li>
        `;
        return index < miniFlow.length - 1 ? `${item}<li class="flow-arrow" aria-hidden="true">→</li>` : item;
      })
      .join("");
  }

  function renderSteps() {
    return steps
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
        <section class="hero" aria-labelledby="hero-title">
          <header class="hero__header">
            <a class="brand hero__brand" href="#" aria-label="SideClip">
              <span>Side</span><strong>Clip</strong>
            </a>
          </header>
          <div class="hero__banner">
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
            </div>
          </div>
          <div class="hero__content reveal is-visible">
            <h1 id="hero-title">スマホやタブレットを、<br /><span class="hero__accent hero__accent--single-line">クリップボード拡張ディスプレイに。</span></h1>
            <ol class="mini-flow" aria-label="SideClipの流れ">
              ${renderMiniFlow()}
            </ol>
            <p class="hero__lead">
              Macでコピー・スクショした内容が、<br />
              スマホ/タブレットの画面にカードとして追加されます。<br />
              カードをタップするだけで、Macのカーソル位置に即座にペースト。<br />
            </p>
             <p class="hero__body">
              💻️ Macのウィンドウ切り替え不要。<br />⌨️ ペースト用ショートカットを覚えなくてもOK。

            </p>

            <p class="hero__body">
              使い方は、Mac用SideClipアプリをインストールして、<br />
              スマホのカメラでQRコードを読み込むだけ。<br />スマホ側は、専用アプリは不要です。<br />

            </p>

            <ul class="hero-kpis" aria-label="SideClipで得られる効果">
              <li>コピペ作業の効率化</li>
              <li>クリップボード履歴の常時表示</li>
              <li>スマホアプリのインストール不要</li>
              <li>MacとiPhone/iPad/Androidがつながる</li>
            </ul>
            <a class="download-button" href="#" data-wip-download-trigger aria-label="SideClipの開発状況を見る">
              <!-- ${icon.download} -->
              開発状況を見る
            </a>
            <p class="os-note">Apple Silicon搭載のMacに対応</p>
          </div>
        </section>

        <section id="concept-video" class="concept-video reveal" aria-labelledby="concept-video-title">
          <div class="concept-video__copy">
            <h2 id="concept-video-title">コンセプト動画で<br />SideClipを知る</h2>
            <p>30秒でわかる、常時表示のコピペ体験</p>
            
          </div>
          <div class="concept-video__visual" aria-label="コンセプト動画（YouTube）">
            <div class="concept-video__embed concept-video__embed--poster">
              <button type="button" class="concept-video__facade" aria-label="コンセプト動画を再生する（約30秒・YouTube）">
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
                Macのウィンドウ切り替えを減らし、<br class="mobile-break" />集中して作業効率を上げましょう。<br />
                <br class="mobile-break" />
                コピペを多用する全ての方に、<br class="mobile-break" />新しいコピペ体験を提供します。<br class="mobile-break" /><br class="mobile-break" />

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

        <section class="features" aria-labelledby="features-title">
          <div class="features__reveal reveal">
            <h2 id="features-title">SideClipの主な機能</h2>
            <div class="feature-grid">
              ${renderFeatures()}
            </div>
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
                外部サーバーを経由しないため、コピー履歴がSideClipのクラウドに送信されることはありません。<br /><br />
                接続にはQRコードによるトークン認証を使用し、認証済みの端末だけがコピー履歴にアクセスできます。<br />
                さらに通信はHTTPSで暗号化されるため、同じWi-Fi上の端末でも、認証されていない端末からはアクセスできません。
              </p>
              <ul class="trust-facts" aria-label="信頼性に関する補足情報">
                <li>
                  <strong>🔐セキュリティ対策の詳細:</strong>
                  <ul class="trust-subfacts" aria-label="セキュリティ対策の詳細">
                    <li>・<strong>Webブラウザ証明書</strong><span class="trust-subfacts__detail">✅️ Macとスマホ/タブレット間で証明書を交換することによって、<br />　暗号化されたセキュリティの高いHTTPS通信を使用します。</span></li>
                    <li>・<strong>トークン認証(QRコード読み取り)</strong><span class="trust-subfacts__detail">✅️ 同じWi-Fiにつながる同僚や家族の端末からはアクセスできないようになっています。<br />　　QRコードを読み取った端末のみ接続可能な安全設計。
                    <br />　　※ トークン含みURLを共有するか、トークン認証設定OFFにすると、<br />　　　　同じWi-Fiにつながる複数端末からアクセス可能になります。
                  </ul>
                </li>
              </ul>
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
                        macOS 15以上のM系（Apple Silicon）で動作確認をしております。
                      </li>
                      <li>
                        <strong>スマホ・タブレット：</strong><br />
                        iOS/Android/iPadOSなど、Webブラウザが動けば基本的に動作します。<br />
                        <span class="faq__note">（端末の性能により動作が重くなる場合もあります）</span><br />
                        <span class="faq__note">セキュリティのためにも、最新バージョンのブラウザをご使用ください。</span>
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
                    <p>詳しくは、アプリインストール後のメニュー内「プラン」からご確認ください。</p>
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
            <h2 id="cta-title">クリップボードの概念を、変える。</h2>
            <p>
              SideClipは、コピー履歴を探す時間を減らし、<br />
              いつものコピペをもっとスムーズにします。<br />
              Mac横のクリップボードで作業が快適に。
            </p>
            <strong>新たなクリップボードを体験しよう。</strong>
          </div>
          <div class="final-cta__action">
            <a class="download-button download-button--light" href="#" data-wip-download-trigger aria-label="SideClipの開発状況を見る">
              <!-- ${icon.download} -->
              開発状況を見る
            </a>
            <p>Apple Silicon搭載のMacに対応</p>
            <nav class="cta-links" aria-label="補助リンク">
              <a class="is-primary" href="#concept-video">コンセプト動画</a>
              <a href="#features-title">主な機能</a>
              <a href="#local-title">ローカル同期</a>
              <a href="#faq">よくある質問</a>
            </nav>
          </div>
          <ul class="trust-list" aria-label="利用条件">
            ${renderTrustItems()}
          </ul>
        </section>

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
              開発の進捗は、開発者の"X(Twitter)"をチェックしてください。
            </p>
            <a
              class="wip-download-modal__xlink"
              href="${WIP_DOWNLOAD_X_URL}"
              target="_blank"
              rel="noopener noreferrer"
              >SideClip 開発アカウント（X）を開く</a>
            <button type="button" class="wip-download-modal__dismiss">閉じる</button>
          </div>
        </div>
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

    const REVEAL_ENTER_RATIO = 0.1;
    const REVEAL_EXIT_RATIO = 0.04;
    const REVEAL_EXIT_DEBOUNCE_MS = 280;
    const revealHideTimers = new WeakMap();
    const revealThresholds = Array.from({ length: 21 }, (_, i) => i * 0.05);

    function cancelRevealHide(el) {
      const id = revealHideTimers.get(el);
      if (id != null) {
        window.clearTimeout(id);
        revealHideTimers.delete(el);
      }
    }

    function scheduleRevealHide(el) {
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
            el.classList.add("is-visible");
            return;
          }

          if (isShown && (ratio <= REVEAL_EXIT_RATIO || !entry.isIntersecting)) {
            scheduleRevealHide(el);
          }
        });
      },
      { threshold: revealThresholds, rootMargin: "0px 0px 14% 0px" }
    );

    revealNodes.forEach((target) => {
      if (!target.classList.contains("hero__content")) {
        observer.observe(target);
      }
    });

    window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((target) => {
        if (!target.classList.contains("hero__content")) {
          target.classList.add("is-visible");
        }
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
    const accentLine = h1.querySelector(".hero__accent--single-line");

    const minPx = 11;
    const tolerance = 2;

    function overflows() {
      const w = h1.clientWidth + tolerance;
      if (h1.scrollWidth > w) return true;
      if (accentLine && accentLine.scrollWidth > w) return true;
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
    const wrap = h1.closest(".hero__content");
    if (wrap && typeof ResizeObserver !== "undefined") {
      new ResizeObserver(run).observe(wrap);
    }
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

    wrap.querySelector(".concept-video__facade")?.addEventListener("click", loadIframe);

    document.querySelectorAll('a[href="#concept-video"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#concept-video")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      const target = document.getElementById(hashId);
      if (target) target.scrollIntoView({ block: "start" });
    });
  }

  function initSyncLineRailLayout() {
    const row = document.querySelector(".sync-graphic__row");
    if (!row) return;

    function updateSyncLineRailLayout() {
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
    }

    const run = () => window.requestAnimationFrame(updateSyncLineRailLayout);

    run();
    window.addEventListener("resize", run);
    window.addEventListener("load", run);
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(run).observe(row);
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
    initHeroParallax();
    initInteractiveCards();
    initConceptVideoEmbed();
    initFeatureImageLightbox();
    initDownloadWipModal();
    initSyncLineRailLayout();
    initHashScroll();
  }

  document.addEventListener("DOMContentLoaded", mount);
})();
