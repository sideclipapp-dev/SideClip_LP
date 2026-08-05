(function () {
  if (typeof window.gtag !== "function" && !window.__sideclipAnalyticsLoading) {
    window.__sideclipAnalyticsLoading = true;
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "/site-analytics.js?v=20260804-consent-disabled";
    analyticsScript.defer = true;
    document.head.appendChild(analyticsScript);
  }

  const STORAGE_KEY = "sideclip_language_v1";
  const LANGUAGE_SWITCH_ENABLED = true;
  const EN_ASSET_VERSION = "20260801-streamlined-en";
  const EN_ASSETS = {
    heroPhone: `/assets/hero-phone-en.png?v=${EN_ASSET_VERSION}`,
    stepAdd: `/assets/step-add-en.png?v=${EN_ASSET_VERSION}`,
    stepTap: `/assets/step-tap-en.png?v=${EN_ASSET_VERSION}`,
    featureHistory: `/assets/optimized-en/feature-history.jpg?v=${EN_ASSET_VERSION}`,
    featureFavorite: `/assets/optimized-en/feature-favorite.jpg?v=${EN_ASSET_VERSION}`,
    featureScan: `/assets/optimized-en/feature-scan.jpg?v=${EN_ASSET_VERSION}`,
    featureSearch: `/assets/optimized-en/feature-search.jpg?v=${EN_ASSET_VERSION}`,
    featureTodo: `/assets/optimized-en/feature-todo.jpg?v=${EN_ASSET_VERSION}`,
    usageScenes: `/assets/usage-scenes-en-v2.png?v=${EN_ASSET_VERSION}`,
    clipboardDifference: `/assets/optimized-en/clipboard-difference.jpg?v=${EN_ASSET_VERSION}`
  };

  function normalizeLang(lang) {
    const value = String(lang || "").toLowerCase();
    return value.startsWith("en") ? "en" : "ja";
  }

  function getBrowserLang() {
    const primaryLanguage = navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language || "";
    return String(primaryLanguage).toLowerCase().startsWith("ja") ? "ja" : "en";
  }

  function getPathLang() {
    const path = window.location.pathname.toLowerCase();
    return path === "/ja" || path.startsWith("/ja/") ? "ja" : "en";
  }

  function detectInitialLang() {
    return LANGUAGE_SWITCH_ENABLED ? getPathLang() : "ja";
  }

  let currentLang = detectInitialLang();
  let lastTrackedLang = null;
  const pageMetaOriginals = new Map();

  const landingEntries = [
    ["html", ".hero__banner-overlay-lead", "Your Mac's clipboard<br />history, on your<br />phone."],
    ["html", ".hero__banner-overlay-sub", "Set your phone beside your Mac.<br />Everything you copy stays in sight."],
    ["text", ".hero__banner-primary", "Download free for Mac"],
    ["text", ".hero__banner-note", "macOS 26 or later · Apple Silicon Mac"],
    ["html", ".hero__banner-copy", "Copy. Choose.<br />Paste."],
    ["html", ".hero__hook", "Copy on your Mac to add a card automatically to your phone.<br />Tap the card you need to paste it straight back to your Mac."],
    ["text", ".hero__infographic-title .tap-infographic__title-line--primary", "Three steps. Ready to paste."],
    ["attr", ".brand.hero__brand", "aria-label", "SideClip, clipboard app for Mac"],
    ["attr", ".language-switch__option[data-language-option='ja']", "aria-label", "View in Japanese"],
    ["attr", ".language-switch__option[data-language-option='en']", "aria-label", "View in English"],
    ["attr", ".hero__banner-overlay", "aria-label", "SideClip overview"],
    ["attr", ".hero__banner-actions", "aria-label", "Hero actions"],
    ["attr", ".hero__banner-primary", "aria-label", "Download SideClip free for Mac"],
    ["attr", ".ja-desktop-nav", "aria-label", "Main navigation"],
    ["text", ".ja-desktop-nav a:nth-child(1)", "Demo"],
    ["text", ".ja-desktop-nav a:nth-child(2)", "Features"],
    ["text", ".ja-desktop-nav a:nth-child(3)", "Pricing"],
    ["text", ".ja-header-download", "Free download"],
    ["attr", ".ja-mobile-hero-cta", "aria-label", "Get SideClip"],
    ["text", ".ja-mobile-hero-cta a", "Download free for Mac"],
    ["text", ".ja-mobile-hero-cta p", "No account required · Free plan available"],
    ["attr", ".hero__menu-button", "aria-label", "Open section menu"],
    ["attr", ".section-drawer__backdrop", "aria-label", "Close menu"],
    ["attr", ".section-drawer__close", "aria-label", "Close menu"],
    ["attr", ".section-drawer__panel", "aria-label", "Page menu"],
    ["text", ".section-drawer__panel a:nth-child(1)", "Top"],
    ["text", ".section-drawer__panel a:nth-child(2)", "Product demo"],
    ["text", ".section-drawer__panel a:nth-child(3)", "Core features"],
    ["text", ".section-drawer__panel a:nth-child(4)", "Use cases"],
    ["text", ".section-drawer__panel a:nth-child(5)", "Local sync"],
    ["text", ".section-drawer__panel a:nth-child(6)", "Plans & pricing"],
    ["text", ".section-drawer__panel a:nth-child(7)", "FAQ"],
    ["text", ".section-drawer__panel a:nth-child(8)", "Download"],
    ["attr", ".hero__visual", "alt", "Using SideClip with a Mac and phone"],
    ["attr", ".hero__visual-layer--phone", "src", EN_ASSETS.heroPhone],
    ["attr", ".hero__visual-layer--phone", "srcset", `${EN_ASSETS.heroPhone} 1x, ${EN_ASSETS.heroPhone} 2x`],
    ["attr", ".mini-flow", "aria-label", "SideClip workflow"],
    ["html", ".mini-flow [data-flow-index='0'] .step-card__label", "Copy on<br />Mac"],
    ["html", ".mini-flow [data-flow-index='1'] .step-card__label", "Added to<br />your phone"],
    ["html", ".mini-flow [data-flow-index='2'] .step-card__label", "Tap to paste<br />on Mac"],
    ["attr", ".mini-flow [data-flow-index='0'] .flow-step-icon-img", "alt", "Copy on Mac"],
    ["attr", ".mini-flow [data-flow-index='1'] .flow-step-icon-img", "alt", "Copied content shown on the phone"],
    ["attr", ".mini-flow [data-flow-index='2'] .flow-step-icon-img", "alt", "Tap a phone card to paste on Mac"],
    ["text", "#hero-scene-title", "Fits right into the work you already do."],
    ["text", ".hero-scene-card__item:nth-child(1) .hero-scene-card__item-title", "Research & documents"],
    ["text", ".hero-scene-card__item:nth-child(1) .hero-scene-card__item-text", "Keep collected references beside you and keep writing."],
    ["text", ".hero-scene-card__item:nth-child(2) .hero-scene-card__item-title", "Chat & email"],
    ["text", ".hero-scene-card__item:nth-child(2) .hero-scene-card__item-text", "Paste templates and links the moment you need them."],
    ["text", ".hero-scene-card__item:nth-child(3) .hero-scene-card__item-title", "Ideas & notes"],
    ["text", ".hero-scene-card__item:nth-child(3) .hero-scene-card__item-text", "Save small fragments naturally and come back to them later."],
    ["attr", ".hero-highlight-row", "aria-label", "SideClip reassurance points"],
    ["text", ".hero-highlight-card:nth-child(1) .hero-highlight-card__title", "Private local sync"],
    ["html", ".hero-highlight-card:nth-child(1) .hero-highlight-card__text", "Your data stays on your Mac.<br />Your clipboard stays private."],
    ["text", ".hero-highlight-card:nth-child(2) .hero-highlight-card__title", "No account or login"],
    ["text", ".hero-highlight-card:nth-child(2) .hero-highlight-card__text", "Install SideClip on your Mac and start right away."],
    ["text", ".hero-highlight-card:nth-child(3) .hero-highlight-card__title", "Easy QR pairing"],
    ["text", ".hero-highlight-card:nth-child(3) .hero-highlight-card__text", "No phone app required. Connect from your browser."],
    ["attr", ".hero-kpis", "aria-label", "What SideClip helps you do"],
    ["text", ".hero-kpis li:nth-child(1)", "Mac app + phone browser"],
    ["text", ".hero-kpis li:nth-child(2)", "Works with iPhone, iPad, and Android"],
    ["text", ".download-button", "Download free for Mac"],
    ["attr", ".download-button", "aria-label", "Download SideClip free for Mac"],
    ["text", ".os-note", "macOS 26 or later · Apple Silicon Mac"],
    ["text", ".download-security-note", "Signed with Apple Developer ID · Notarized by Apple"],
    ["text", ".concept-video__eyebrow", "Product Demo"],
    ["html", "#concept-video-title", "Experience SideClip<br />in action."],
    ["html", ".concept-video__copy .reveal__rest p", "Connect your Mac and phone, view your clipboard history, and paste the card you need.<br />See what SideClip can do and how it works in this demo."],
    ["attr", ".concept-video__visual", "aria-label", "SideClip core feature demo on YouTube"],
    ["attr", ".concept-video__facade", "aria-label", "Play the SideClip core feature demo on YouTube"],
    ["html", "#tap-title", "Tap once.<br class=\"mobile-break\" /><span>Paste right away.</span>"],
    ["html", ".tap-section .section-copy--tap .reveal__rest p", "Copy on your Mac and see a new card on your phone.<br class=\"desktop-break\" />Touch the card you need, and it pastes back to your Mac instantly.<br />Stay focused on the screen you are working in.<br class=\"mobile-break\" />"],
    ["attr", ".steps", "aria-label", "Four Tap to Paste steps"],
    ["html", ".steps [data-step-index='0'] h3", "<span>1</span>Copy on Mac"],
    ["html", ".steps [data-step-index='1'] h3", "<span>2</span>See the new card<br />on your phone"],
    ["html", ".steps [data-step-index='2'] h3", "<span>3</span>Tap the card you need"],
    ["html", ".steps [data-step-index='3'] h3", "<span>4</span>Paste instantly to Mac"],
    ["attr", ".steps [data-step-index='0'] img", "alt", "Screen showing text copied on Mac"],
    ["attr", ".steps [data-step-index='1'] img", "alt", "Screen showing a new clipboard history card on the phone"],
    ["attr", ".steps [data-step-index='1'] img", "src", EN_ASSETS.stepAdd],
    ["attr", ".steps [data-step-index='2'] img", "alt", "Screen showing a card tapped on the phone"],
    ["attr", ".steps [data-step-index='2'] img", "src", EN_ASSETS.stepTap],
    ["attr", ".steps [data-step-index='3'] img", "alt", "Screen showing instant paste to Mac"],
    ["html", "#benefits-title", "Keep screenshots<br />off your desktop."],
    ["html", ".benefits .section-copy .reveal__rest p", "Tap SCAN on your phone to capture your Mac screen.<br />Each shot becomes a SideClip card, without cluttering your desktop."],
    ["text", ".benefits-video-copy__eyebrow", "Screenshot Demo"],
    ["html", ".benefits-video-copy h3", "One tap<br />to capture."],
    ["text", ".benefits-video-copy__text:nth-of-type(2)", "Tap SCAN on your phone to capture your Mac screen instantly. Consecutive shots line up automatically as SideClip cards."],
    ["text", ".benefits-video-copy__text:nth-of-type(3)", "Screenshots are stored in the SideClip folder, keeping your desktop clear and each image ready to reuse."],
    ["html", ".benefits-video-copy__continuation a", "Crop or mark up your screenshot<span class=\"benefits-video-copy__continuation-tail\">&nbsp;after capture&nbsp;<span aria-hidden=\"true\">→</span></span>"],
    ["attr", ".benefits-video", "aria-label", "Screenshot feature demo on YouTube"],
    ["attr", ".benefits-video__facade", "aria-label", "Play the screenshot feature demo on YouTube"],
    ["text", ".benefit-item:nth-child(1) h3", "Keep it beside you"],
    ["html", ".benefit-item:nth-child(1) p", "The history you need stays in sight<br />without covering your work."],
    ["text", ".benefit-item:nth-child(2) h3", "Tap to paste"],
    ["html", ".benefit-item:nth-child(2) p", "Touch a card and paste it<br />straight back to your Mac."],
    ["text", ".benefit-item:nth-child(3) h3", "Images stay intact"],
    ["html", ".benefit-item:nth-child(3) p", "Text, URLs, and screenshots<br />can sit at your fingertips."],
    ["text", ".benefit-item:nth-child(4) h3", "Local sync"],
    ["html", ".benefit-item:nth-child(4) p", "Devices connect on the same Wi-Fi,<br />without sending history to our cloud."],
    ["text", ".clipboard-shift__eyebrow", "Clipboard Shift"],
    ["html", "#clipboard-shift-title", "A place for clipboard history,<br />beside your Mac."],
    ["html", ".clipboard-shift__lead", "Instead of opening another panel,<br />keep your clipboard history visible on the phone beside your Mac."],
    ["attr", ".clipboard-shift__panel", "data-feature-image-alt", "Difference between opening a clipboard panel and keeping history beside your Mac"],
    ["attr", ".clipboard-shift__panel", "data-feature-image-src", EN_ASSETS.clipboardDifference],
    ["attr", ".clipboard-shift__panel", "aria-label", "Zoom image showing the difference between opening a clipboard panel and keeping history beside your Mac"],
    ["attr", ".clipboard-shift__panel img", "src", EN_ASSETS.clipboardDifference],
    ["attr", ".clipboard-shift__panel img", "srcset", `${EN_ASSETS.clipboardDifference} 1x, ${EN_ASSETS.clipboardDifference} 2x`],
    ["attr", ".clipboard-shift__panel img", "alt", "Difference between opening a clipboard panel and keeping history beside your Mac"],
    ["text", ".clipboard-shift__compare-block--others .clipboard-shift__prose-title", "Open a panel on screen"],
    ["text", ".clipboard-shift__compare-block--others li:nth-child(1)", "The history panel overlaps your workspace."],
    ["text", ".clipboard-shift__compare-block--others li:nth-child(2)", "Your eyes and pointer move every time you paste."],
    ["text", ".clipboard-shift__compare-block--others li:nth-child(3)", "Shortcuts and settings stay in your head."],
    ["text", ".clipboard-shift__prose-title--sideclip", "Keep it beside you"],
    ["html", ".clipboard-shift__emphasis", "<span class=\"clipboard-shift__emphasis-lead\">History lives beside your Mac.</span><br />Keep looking at your work, tap a phone card, and paste."],
    ["text", ".clipboard-shift__bullets--sideclip li:nth-child(1)", "Copy history is always visible on your phone."],
    ["text", ".clipboard-shift__bullets--sideclip li:nth-child(2)", "Tap a card to paste it back to your Mac."],
    ["text", ".clipboard-shift__bullets--sideclip li:nth-child(3)", "Keep your workspace clear and your focus intact."],
    ["text", ".features__eyebrow", "Core Features"],
    ["html", "#features-title", "Save it. Find it.<br />Reuse it."],
    ["html", ".features__lead", "Save clipboard history and screenshots, search them, and reuse them.<br />Your phone keeps everything within easy reach."],
    ["text", ".feature-card:nth-child(1) .feature-card__eyebrow", "Save"],
    ["text", ".feature-card:nth-child(2) .feature-card__eyebrow", "Save"],
    ["text", ".feature-card:nth-child(3) .feature-card__eyebrow", "Edit"],
    ["text", ".feature-card:nth-child(4) .feature-card__eyebrow", "Find"],
    ["text", ".feature-card:nth-child(5) .feature-card__eyebrow", "Reuse"],
    ["text", ".feature-card:nth-child(1) h3", "Your clipboard history, always at hand."],
    ["html", ".feature-card:nth-child(1) > p:not(.feature-card__eyebrow)", "Text, URLs, and images are saved automatically.<br />Find the card you need from your phone."],
    ["attr", ".feature-card:nth-child(1) .feature-card__panel", "aria-label", "Zoom image of the clipboard history screen"],
    ["attr", ".feature-card:nth-child(1) .feature-card__panel", "data-feature-image-alt", "Clipboard history screen"],
    ["attr", ".feature-card:nth-child(1) .feature-card__panel", "data-feature-image-src", EN_ASSETS.featureHistory],
    ["attr", ".feature-card:nth-child(1) .feature-card__image", "src", EN_ASSETS.featureHistory],
    ["attr", ".feature-card:nth-child(1) .feature-card__image", "srcset", `${EN_ASSETS.featureHistory} 1x, ${EN_ASSETS.featureHistory} 2x`],
    ["attr", ".feature-card:nth-child(1) .feature-card__image", "alt", "Clipboard history screen"],
    ["text", ".feature-card:nth-child(2) h3", "Save only what matters."],
    ["html", ".feature-card:nth-child(2) > p:not(.feature-card__eyebrow)", "Keep reusable snippets and links.<br />Set them aside once and stop searching later."],
    ["attr", ".feature-card:nth-child(2) .feature-card__panel", "aria-label", "Zoom image of the favorites screen"],
    ["attr", ".feature-card:nth-child(2) .feature-card__panel", "data-feature-image-alt", "Favorites screen"],
    ["attr", ".feature-card:nth-child(2) .feature-card__panel", "data-feature-image-src", EN_ASSETS.featureFavorite],
    ["attr", ".feature-card:nth-child(2) .feature-card__image", "src", EN_ASSETS.featureFavorite],
    ["attr", ".feature-card:nth-child(2) .feature-card__image", "srcset", `${EN_ASSETS.featureFavorite} 1x, ${EN_ASSETS.featureFavorite} 2x`],
    ["attr", ".feature-card:nth-child(2) .feature-card__image", "alt", "Favorites screen"],
    ["text", ".feature-card:nth-child(3) h3", "Clean up screenshots on the spot."],
    ["html", ".feature-card:nth-child(3) > p:not(.feature-card__eyebrow)", "Crop away what you do not need and mark up the parts that matter.<br />The edited image stays in your history, ready to send back to your Mac.<br /><small>Markup and cropping are available on Pro and above.</small>"],
    ["attr", ".feature-card:nth-child(3) .feature-card__panel", "aria-label", "Zoom image of the screenshot capture screen"],
    ["attr", ".feature-card:nth-child(3) .feature-card__panel", "data-feature-image-alt", "Screenshot capture screen"],
    ["attr", ".feature-card:nth-child(3) .feature-card__panel", "data-feature-image-src", EN_ASSETS.featureScan],
    ["attr", ".feature-card:nth-child(3) .feature-card__image", "src", EN_ASSETS.featureScan],
    ["attr", ".feature-card:nth-child(3) .feature-card__image", "srcset", `${EN_ASSETS.featureScan} 1x, ${EN_ASSETS.featureScan} 2x`],
    ["attr", ".feature-card:nth-child(3) .feature-card__image", "alt", "Screenshot capture screen"],
    ["attr", ".feature-card:nth-child(3) .feature-card__video-trigger", "aria-label", "Play the pen and crop demo video"],
    ["attr", ".feature-card:nth-child(3) .feature-card__video-trigger", "data-video-title", "SideClip pen and crop demo video"],
    ["text", ".feature-card:nth-child(3) .feature-card__video-kicker", "Demo Video"],
    ["text", ".feature-card:nth-child(3) .feature-card__video-label", "Watch pen and crop demo"],
    ["attr", ".feature-video-lightbox__close", "aria-label", "Close video"],
    ["text", ".feature-video-lightbox__title", "Pen and crop demo video"],
    ["text", ".feature-video-lightbox__fallback", "Watch on YouTube"],
    ["text", ".feature-card:nth-child(4) h3", "Find old cards fast."],
    ["html", ".feature-card:nth-child(4) > p:not(.feature-card__eyebrow)", "Search by date range, keyword, and text inside images.<br />Fuzzy search helps you find the right card, even with an approximate keyword.<br /><small>Text search inside images is available on Pro and above.</small>"],
    ["attr", ".feature-card:nth-child(4) .feature-card__panel", "aria-label", "Zoom image of the search screen"],
    ["attr", ".feature-card:nth-child(4) .feature-card__panel", "data-feature-image-alt", "Search screen for copy and screenshot history"],
    ["attr", ".feature-card:nth-child(4) .feature-card__panel", "data-feature-image-src", EN_ASSETS.featureSearch],
    ["attr", ".feature-card:nth-child(4) .feature-card__image", "src", EN_ASSETS.featureSearch],
    ["attr", ".feature-card:nth-child(4) .feature-card__image", "srcset", `${EN_ASSETS.featureSearch} 1x, ${EN_ASSETS.featureSearch} 2x`],
    ["attr", ".feature-card:nth-child(4) .feature-card__image", "alt", "Search screen for copy and screenshot history"],
    ["text", ".feature-card:nth-child(5) h3", "Turn items you need later into Todo cards."],
    ["html", ".feature-card:nth-child(5) > p:not(.feature-card__eyebrow)", "Copy something on your Mac and turn it into a Todo card right away.<br />Swipe a card to move it to Todo.<br /><small>Available on Pro and above.</small>"],
    ["attr", ".feature-card:nth-child(5) .feature-card__panel", "aria-label", "Zoom image of the Todo mode screen"],
    ["attr", ".feature-card:nth-child(5) .feature-card__panel", "data-feature-image-alt", "Todo mode screen"],
    ["attr", ".feature-card:nth-child(5) .feature-card__panel", "data-feature-image-src", EN_ASSETS.featureTodo],
    ["attr", ".feature-card:nth-child(5) .feature-card__image", "src", EN_ASSETS.featureTodo],
    ["attr", ".feature-card:nth-child(5) .feature-card__image", "srcset", `${EN_ASSETS.featureTodo} 1x, ${EN_ASSETS.featureTodo} 2x`],
    ["attr", ".feature-card:nth-child(5) .feature-card__image", "alt", "Todo mode screen"],
    ["text", ".usage-scenes__eyebrow", "Use Cases"],
    ["html", "#usage-scenes-title", "Built for the work<br />you do every day."],
    ["html", ".usage-scenes__lead", "Keep reusable text and images beside your Mac.<br />Shorten the small copy-and-paste tasks that add up."],
    ["attr", ".usage-scenes__panel", "data-feature-image-alt", "Examples of SideClip use cases"],
    ["attr", ".usage-scenes__panel", "data-feature-image-src", EN_ASSETS.usageScenes],
    ["attr", ".usage-scenes__panel", "aria-label", "Zoom image showing examples of SideClip use cases"],
    ["attr", ".usage-scenes__panel img", "src", EN_ASSETS.usageScenes],
    ["attr", ".usage-scenes__panel img", "srcset", `${EN_ASSETS.usageScenes} 1x, ${EN_ASSETS.usageScenes} 2x`],
    ["attr", ".usage-scenes__panel img", "alt", "Examples of SideClip use cases"],
    ["text", ".usage-scenes__case:nth-child(1) .usage-scenes__case-badge-label", "Developers & programmers"],
    ["text", ".usage-scenes__case:nth-child(1) .usage-scenes__case-title", "Reuse code and commands instantly."],
    ["text", ".usage-scenes__case:nth-child(1) .usage-scenes__case-text", "Keep snippets and URLs beside your editor, then paste without leaving your work."],
    ["text", ".usage-scenes__case:nth-child(2) .usage-scenes__case-badge-label", "AI tool and LLM users"],
    ["text", ".usage-scenes__case:nth-child(2) .usage-scenes__case-title", "Reuse prompts from your phone."],
    ["text", ".usage-scenes__case:nth-child(2) .usage-scenes__case-text", "Save reusable prompts and context so AI work keeps moving."],
    ["text", ".usage-scenes__case:nth-child(3) .usage-scenes__case-badge-label", "Marketplace & ecommerce sellers"],
    ["text", ".usage-scenes__case:nth-child(3) .usage-scenes__case-title", "Paste listing details and replies in seconds."],
    ["text", ".usage-scenes__case:nth-child(3) .usage-scenes__case-text", "Store product descriptions, addresses, and replies to reduce repetitive work."],
    ["text", ".local-sync__eyebrow", "Local Sync"],
    ["html", "#local-title", "Keep sensitive clipboard history<br />out of the cloud."],
    ["html", ".local-sync__lead", "Your Mac and phone sync directly on the same Wi-Fi.<br />Copy history stays on your Mac and is not sent to our cloud."],
    ["text", ".sync-graphic > p", "Direct sync on the same Wi-Fi"],
    ["attr", ".local-sync__points", "aria-label", "Local sync reassurance points"],
    ["text", ".local-sync__point:nth-child(1) h3", "Stored on your Mac"],
    ["text", ".local-sync__point:nth-child(1) p", "Your history stays on your Mac. It is not sent to SideClip cloud storage."],
    ["text", ".local-sync__point:nth-child(2) h3", "Syncs on the same Wi-Fi"],
    ["text", ".local-sync__point:nth-child(2) p", "Phones and tablets connect directly inside the same local network."],
    ["text", ".local-sync__point:nth-child(3) h3", "No external relay server"],
    ["text", ".local-sync__point:nth-child(3) p", "Devices sync directly over the same Wi-Fi, and clipboard history is stored on your Mac."],
    ["text", ".local-sync__detail-link a", "View security details"],
    ["text", ".ja-pricing__eyebrow", "Plans"],
    ["html", "#pricing-preview-title", "Start free.<br /><span class=\"ja-pricing__headline-line\">Upgrade when you need more.</span>"],
    ["text", ".ja-pricing__head > p:last-child", "No account is required for Free. Paid plans are available monthly or annually, include a 30-day free trial, and can be changed or canceled in the SideClip app."],
    ["text", ".ja-pricing__card:nth-child(1) .ja-pricing__label", "Try it first"],
    ["html", ".ja-pricing__card:nth-child(1) .ja-pricing__price", "$0"],
    ["text", ".ja-pricing__card:nth-child(1) .ja-pricing__summary", "Try core features including clipboard and screenshot history."],
    ["text", ".ja-pricing__card:nth-child(2) .ja-pricing__label", "For everyday use"],
    ["html", ".ja-pricing__card:nth-child(2) .ja-pricing__price", "$2.99<span>/month</span>"],
    ["html", ".ja-pricing__card:nth-child(2) .ja-pricing__daily", "Annual plan $23.99<span>about $2.00/month · about $0.07/day*</span>"],
    ["text", ".ja-pricing__card:nth-child(2) .ja-pricing__summary", "Add Todo, image editing, Quick Paste, and other professional features."],
    ["text", ".ja-pricing__card:nth-child(2) .ja-pricing__card-link", "Explore Pro features →"],
    ["text", ".ja-pricing__card:nth-child(3) .ja-pricing__label", "For keeping a long-term archive"],
    ["html", ".ja-pricing__card:nth-child(3) .ja-pricing__price", "$4.99<span>/month</span>"],
    ["html", ".ja-pricing__card:nth-child(3) .ja-pricing__daily", "Annual plan $39.99<span>about $3.33/month · about $0.11/day*</span>"],
    ["text", ".ja-pricing__card:nth-child(3) .ja-pricing__summary", "Unlock unlimited storage, CSV export, backup and restore, and every SideClip feature."],
    ["text", ".ja-pricing__card:nth-child(3) .ja-pricing__card-link", "Explore Ultra features →"],
    ["text", ".ja-pricing__billing-note", "*Daily equivalents are calculated by dividing the annual price by 365. Annual plans are billed yearly."],
    ["text", ".ja-pricing__link", "Compare plans in detail"],
    ["text", ".faq__eyebrow", "FAQ"],
    ["text", "#faq-title", "FAQ"],
    ["text", ".faq__lead", "Answers to common questions before you get started."],
    ["text", ".faq__group:nth-child(1) .faq__group-title", "Getting started"],
    ["text", ".faq__item:nth-of-type(1) .faq__summary", "What OS and devices are supported?"],
    ["html", ".faq__item:nth-of-type(1) .faq__answer", "<ul class=\"faq__bullets\"><li><strong>Mac:</strong><br />Developed and tested on Apple Silicon Macs running macOS 26 or later.</li><li><strong>Phones and tablets:</strong><br />In principle, SideClip works on iOS, Android, iPadOS, and other devices that can run a web browser.<br /><span class=\"faq__note\">Performance may vary depending on the device.</span><br /><span class=\"faq__note\">Tested with Safari and Chrome. For security, please use the latest browser version.</span></li></ul>"],
    ["text", ".faq__item:nth-of-type(2) .faq__summary", "Can I use it for free? How are paid plans different?"],
    ["html", ".faq__item:nth-of-type(2) .faq__answer", "<p>The Free plan lets you use the basic features at no cost.<br />We recommend testing SideClip in your own environment before choosing a paid plan.</p><p>Pro and Ultra unlock more convenient features.</p><p class=\"faq__plans-more\"><a href=\"/plans\">See plans and pricing in detail →</a></p>"],
    ["text", ".faq__item:nth-of-type(3) .faq__summary", "How much do the plans cost?"],
    ["html", ".faq__item:nth-of-type(3) .faq__answer", "<p>Paid plans help fund ongoing app improvements and new feature development.<br />If the Free plan works well for you, please consider a paid plan for a more capable experience.</p><dl class=\"faq__plans\"><div class=\"faq__plan\"><dt>Free plan</dt><dd><span class=\"faq__plan-price\">Free</span><br />Try SideClip and confirm it works in your environment.</dd></div><div class=\"faq__plan\"><dt>Pro plan</dt><dd><span class=\"faq__plan-price\">Monthly plan: $2.99<br />Annual plan: $23.99</span><br />The annual plan works out to about $0.07/day.</dd></div><div class=\"faq__plan\"><dt>Ultra plan</dt><dd><span class=\"faq__plan-price\">Monthly plan: $4.99<br />Annual plan: $39.99</span><br />The annual plan works out to about $0.11/day.</dd></div></dl><p class=\"faq__plans-more\"><a href=\"/plans\">See plans and pricing in detail →</a></p>"],
    ["text", ".faq__group:nth-child(2) .faq__group-title", "Usage and limits"],
    ["text", ".faq__group:nth-child(2) .faq__item:nth-of-type(1) .faq__summary", "Are there limits on saved data types or sizes?"],
    ["html", ".faq__group:nth-child(2) .faq__item:nth-of-type(1) .faq__answer", "<p>Yes. To keep clipboard history from growing too large and to prevent sluggish behavior, SideClip applies the following limits. These may change in app updates.</p><ul class=\"faq__bullets\"><li>Plain text: up to 50 KB per copy</li><li>Images such as JPG, PNG, and TIFF: up to 10 MB per image</li><li>Other files: only a link to the file on your Mac is copied. The link stops working if the file is moved.</li></ul>"],
    ["text", ".faq__group:nth-child(2) .faq__item:nth-of-type(2) .faq__summary", "Is there a card save limit?"],
    ["html", ".faq__group:nth-child(2) .faq__item:nth-of-type(2) .faq__answer", "<p>Yes. Save limits differ by plan.</p><p>After installing the app, check the Plan menu shown on the phone-side screen for details.</p><p>When the limit is exceeded, older data is deleted automatically. Data saved to Favorite is not deleted automatically.</p>"],
    ["text", ".faq__group:nth-child(2) .faq__item:nth-of-type(3) .faq__summary", "Can I use SideClip with phone tethering?"],
    ["html", ".faq__group:nth-child(2) .faq__item:nth-of-type(3) .faq__answer", "<p>Yes. Depending on network conditions, copy and paste updates may take longer on a tethered connection.</p>"],
    ["text", ".final-cta__eyebrow", "Download"],
    ["html", "#cta-title", "Bring SideClip<br />to your Mac."],
    ["text", ".final-cta__copy .reveal__rest p", "Start with the Free plan. No account required."],
    ["text", ".download-button--light", "Download free for Mac"],
    ["text", ".final-cta__requirements", "macOS 26 or later · Apple Silicon Mac"],
    ["text", ".final-cta__security", "Signed with Apple Developer ID · Notarized by Apple"],
    ["attr", ".cta-links", "aria-label", "Supporting links"],
    ["text", ".cta-links a:nth-child(1)", "Product demo"],
    ["text", ".cta-links a:nth-child(2)", "Plans & pricing"],
    ["text", ".cta-links a:nth-child(3)", "Security"],
    ["attr", ".trust-list", "aria-label", "Usage conditions"],
    ["text", ".trust-list li:nth-child(1)", "No account or login required"],
    ["text", ".trust-list li:nth-child(2)", "Clipboard history stays on your Mac"],
    ["text", ".trust-list li:nth-child(3)", "Choose monthly or annual billing"],
    ["attr", ".feature-lightbox__dialog", "aria-label", "Zoomed image"],
    ["attr", ".feature-lightbox__close", "aria-label", "Close zoomed image"],
    ["attr", ".site-footer__nav", "aria-label", "Site information"],
    ["text", ".site-footer__nav a:nth-of-type(1)", "Terms"],
    ["text", ".site-footer__nav a:nth-of-type(2)", "Privacy Policy"],
    ["text", ".site-footer__nav a:nth-of-type(3)", "Legal notice for customers in Japan"],
    ["attr", "#cookie-banner", "aria-label", "Cookie consent banner"],
    ["text", ".cookie-banner__text", "We use analytics cookies to improve this site."],
    ["text", "#cookie-accept", "Accept"],
    ["text", "#cookie-reject", "Decline"]
  ];

  const metaByPage = {
    landing: {
      title: "SideClip | Take your Mac's clipboard off-screen",
      description: "A Mac app that turns your phone or tablet into an always-visible clipboard side display.",
      locale: "en_US",
      ogTitle: "SideClip | Take your Mac's clipboard off-screen",
      twitterTitle: "SideClip | Take your Mac's clipboard off-screen"
    },
    privacy: {
      title: "SideClip | Privacy Policy",
      description: "Privacy Policy for the SideClip official website and applications.",
      locale: "en_US"
    },
    terms: {
      title: "SideClip | Terms of Use",
      description: "Terms of Use for the SideClip official website and applications.",
      locale: "en_US"
    },
    security: {
      title: "SideClip | Security Details",
      description: "Security details for SideClip local sync, including HTTPS communication and QR-code token authentication.",
      locale: "en_US"
    },
    legal: {
      title: "SideClip | Policies and Terms",
      description: "Links to SideClip terms, privacy policy, and legal disclosures.",
      locale: "en_US"
    },
    tokushoho: {
      title: "SideClip | Specified Commercial Transactions Act Disclosure",
      description: "Specified Commercial Transactions Act disclosure for SideClip paid plans.",
      locale: "en_US"
    }
  };

  const articleTranslations = {
    legal: `
        <header class="doc-page__header">
          <div class="doc-page__header-text">
            <h1>Policies and Terms</h1>
          </div>
        </header>

        <p class="doc-page__lead">
          This page links to the terms, privacy policy, and legally required disclosures for SideClip.
        </p>

        <section aria-labelledby="legal-links-heading">
          <h2 id="legal-links-heading">Documents</h2>
          <ul class="legal-hub__list">
            <li><a href="./terms.html">Terms of Use</a></li>
            <li><a href="./privacy.html">Privacy Policy</a></li>
            <li><a href="./tokushoho.html">Legal notice for customers in Japan</a></li>
          </ul>
        </section>
    `,
    security: `
        <header class="doc-page__header">
          <div class="doc-page__header-text">
            <p class="doc-page__eyebrow">Security</p>
            <h1>SideClip's<br />secure design</h1>
            <p class="doc-page__intro">
              Before your Mac and phone connect, SideClip checks who is allowed in. Communication is encrypted, and only authorized devices can use the local clipboard view.
            </p>
          </div>
          <a href="./index.html" class="doc-page__top-return">Back to home</a>
        </header>

        <section class="security-overview" aria-labelledby="security-overview-heading">
          <div>
            <p class="doc-page__eyebrow">Overview</p>
            <h2 id="security-overview-heading">Only authenticated devices can connect.</h2>
            <p>
              SideClip uses token authentication through a QR code. Only authenticated devices can access clipboard history, and communication is encrypted with HTTPS.
            </p>
          </div>
          <ul class="security-pillars" aria-label="Main SideClip security measures">
            <li>
              <span>01</span>
              <strong>QR-code authentication</strong>
              <p>Only devices that scan the QR code shown on your Mac can connect.</p>
            </li>
            <li>
              <span>02</span>
              <strong>HTTPS encryption</strong>
              <p>Communication between your Mac and phone or tablet is encrypted.</p>
            </li>
            <li>
              <span>03</span>
              <strong>Local sync</strong>
              <p>SideClip is designed for device pairing within the same Wi-Fi network.</p>
            </li>
          </ul>
        </section>

        <section class="security-section security-section--split" aria-labelledby="security-cert-heading">
          <div class="security-section__copy">
            <p class="doc-page__eyebrow">Encrypted Connection</p>
            <h2 id="security-cert-heading">Connect with encrypted HTTPS.</h2>
            <p>
              Your Mac and phone or tablet exchange certificates and communicate over encrypted HTTPS.
            </p>
          </div>
          <ol class="security-flow" aria-label="Connection flow">
            <li>
              <span>1</span>
              <p>Launch SideClip on your Mac</p>
            </li>
            <li>
              <span>2</span>
              <p>Scan the QR code with your phone</p>
            </li>
            <li>
              <span>3</span>
              <p>Connect over HTTPS after authentication</p>
            </li>
          </ol>
        </section>

        <section class="security-section" aria-labelledby="security-token-heading">
          <div class="security-section__copy">
            <p class="doc-page__eyebrow">Token Pairing</p>
            <h2 id="security-token-heading">Authenticate devices with a QR code.</h2>
            <p>
              Devices owned by colleagues or family members on the same Wi-Fi cannot connect unless they are authorized. Only the device that scans the QR code can connect.
            </p>
          </div>
          <figure class="doc-page__security-figure">
            <img
              src="/assets/security-qr-pairing-en.png?v=20260712-security-en-images"
              alt="Diagram showing a Mac and smartphone connecting through QR-code authentication and encrypted HTTPS communication"
              width="1600"
              height="797"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div class="doc-page__note-block">
            <div class="doc-page__note">
              <strong>When sharing access</strong>
              <p>
                If you share a URL that contains the token, or if token authentication is turned off, multiple devices on the same Wi-Fi network may be able to access the service.
              </p>
            </div>
            <figure class="doc-page__security-figure">
              <img
                src="/assets/security-shared-wifi-en.png?v=20260712-security-en-images"
                alt="Diagram showing multiple laptops, phones, and tablets on the same Wi-Fi connecting when a token is shared or authentication is turned off"
                width="800"
                height="533"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section class="security-section security-section--checklist" aria-labelledby="security-check-heading">
          <div class="security-section__copy">
            <p class="doc-page__eyebrow">Good Practice</p>
            <h2 id="security-check-heading">Basic habits for safer use.</h2>
          </div>
          <ul class="security-checklist">
            <li>Do not share QR codes or tokenized URLs with people who do not need access.</li>
            <li>On shared Wi-Fi or workplace networks, check the connection state when you are done.</li>
            <li>Use the latest version of browsers such as Safari or Chrome.</li>
          </ul>
        </section>
    `,
    privacy: `
        <header class="doc-page__header">
          <div class="doc-page__header-text">
            <h1>Privacy Policy</h1>
            <p class="doc-page__last-updated">Last updated: May 10, 2026</p>
          </div>
          <a href="./index.html" class="doc-page__top-return">Back to home</a>
        </header>

        <p class="doc-page__lead">
          The SideClip Development Team, which operates SideClip (the "Service"), designs and operates the Service with user privacy as a top priority. This Policy describes how we handle personal information and user information on the official website (<a href="https://sideclip.app/">https://sideclip.app</a>, the "Website") and the applications we provide, including apps for Mac and for smartphones or tablets.
        </p>
        <p class="doc-page__lead">
          This English version is provided for convenience. If there is any inconsistency between the Japanese version and this English version, the Japanese version will prevail.
        </p>

        <section aria-labelledby="privacy-sec1-heading">
          <h2 id="privacy-sec1-heading">1. Basic policy, local-first principle, and information we collect</h2>
          <p>
            As a rule, data created, saved, or copied by users through the Service is not transmitted to or stored on servers managed by us.
          </p>
          <p>
            <strong>(1) Data stored only locally, and not externally transmitted as a rule</strong><br />
            The following data is stored only on the user's device, such as a Mac. We do not view, collect, or use its contents.
          </p>
          <ul>
            <li>Clipboard history, including text, links, and image data</li>
            <li>Favorites data and template information</li>
            <li>OCR image recognition results, with all analysis completed on the user's device</li>
            <li>A unique host name ID used for local communication authentication</li>
          </ul>
          <p>
            <strong>(2) Communication and data processing safety</strong>
          </p>
          <p>
            <strong>Phone integration:</strong>
            Communication is limited to direct communication within the same local network, such as Wi-Fi or LAN. Data is synchronized directly between devices without going through an external relay server.
          </p>
          <p>
            <strong>Authentication:</strong>
            Access from a phone uses token authentication by QR-code scanning and a secure communication path to help prevent unauthorized access.
          </p>
          <p>
            <strong>(3) User information we collect and purposes of use</strong><br />
            We collect and use the following information only within the scope of the stated purposes.
          </p>
          <ul>
            <li>
              <strong>App usage data:</strong>
              Used for quality improvement, defect detection, and feature improvement. We may collect anonymous data such as screen view counts, button tap events, crash logs, and OS versions. Details of transmission and recording follow Section 4. Clipboard contents are never included.
            </li>
            <li>
              <strong>Paid plan purchase information:</strong>
              Used for license authentication, plan status management, and support. Payment processing itself is handled as described in Section 3.
            </li>
            <li>
              <strong>Inquiry information:</strong>
              Used to respond to inquiries and verify identity. We may collect names, email addresses, and inquiry details sent through forms, email, or similar channels.
            </li>
            <li>
              <strong>Other information:</strong>
              Used to provide important notices and prevent conduct that violates the Terms of Use.
            </li>
          </ul>
        </section>

        <section aria-labelledby="privacy-sec2-heading">
          <h2 id="privacy-sec2-heading">2. External services and data synchronization</h2>
          <p>
            The Service communicates externally only within the following scope for specific features and license management.
          </p>
          <p>
            <strong>(1) License authentication, plan settings, and licenses</strong><br />
            For paid plan purchases, license authentication, and ongoing plan status verification, the Service communicates with Lemon Squeezy, a payment platform.
          </p>
          <p>
            <strong>(2) OGP information retrieval and favicon display</strong><br />
            When a user copies a URL, the Service may access that URL's website to display its title and thumbnail image, such as OGP information. For site icons, the Service may use a shared API provided by Google.
          </p>
          <p>
            <strong>(3) Apple Reminders synchronization, Ultra plan</strong><br />
            If Reminders synchronization is enabled in Todo mode, data is uploaded to Apple services such as iCloud through standard macOS frameworks. Apple manages that data under its own privacy policy.
          </p>
        </section>

        <section aria-labelledby="privacy-sec3-heading">
          <h2 id="privacy-sec3-heading">3. Handling of payment information</h2>
          <p>
            Paid plan sales and payment processing are handled through Lemon Squeezy, a Merchant of Record and payment provider under Stripe.<br />
            We do not directly collect or store detailed payment information such as credit card numbers or bank account information. Such information is managed securely under Lemon Squeezy's privacy policy. For license management and support, we receive purchaser email addresses and license key information.
          </p>
        </section>

        <section aria-labelledby="privacy-sec4-heading">
          <h2 id="privacy-sec4-heading">4. Analytics tools, web and app</h2>
          <p>
            We use analytics tools provided by Google LLC, such as Google Analytics, to improve quality.
          </p>
          <p>
            <strong>(1) Analytics in the app</strong><br />
            App usage data, such as the operation logs described in Section 1(3), is not sent by default. It is sent to and recorded on Google's servers only when users explicitly agree from the app settings screen or consent prompt. This data is collected anonymously and does not identify individuals. The data sent is limited to information such as screen view counts, button tap events, OS version, app version, country and region-level location inferred from the access source IP address, and prefecture-capital representative cities used for Google Analytics map rendering. It does not include the IP address itself, clipboard history, copied text, search terms, Todo contents, image data, URLs, file names, app or website names, the user's actual municipality, GPS information, latitude/longitude, or postal codes. Users can stop this data transmission at any time from the app settings screen after consenting.
          </p>
          <p>
            <strong>(2) Website analytics and cookies</strong><br />
            On the Website, cookies may be used to collect browsing history and similar information, which is sent to and recorded on Google's servers.
          </p>
          <p>
            <strong>(3) Google's privacy policy</strong><br />
            Please refer to Google's own website for its handling of data.
          </p>
          <p>
            Google Privacy Policy:
            <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer"
              >https://policies.google.com/privacy</a>
          </p>
          <p>
            How Google uses cookies:
            <a href="https://policies.google.com/technologies/cookies?hl=en" target="_blank" rel="noopener noreferrer"
              >https://policies.google.com/technologies/cookies</a>
          </p>
        </section>

        <section aria-labelledby="privacy-sec5-heading">
          <h2 id="privacy-sec5-heading">5. Security management and third-party provision</h2>
          <p>
            We take necessary and appropriate measures to prevent leakage, loss, or damage of handled information and to otherwise manage information safely.
          </p>
          <p>
            Except where there is a legitimate request based on law, we do not provide personal information to third parties without user consent.<br />
            Because sensitive data such as clipboard contents does not exist on our servers in the first place, it is physically impossible for us to provide such data. Technical data transmission to external services for payment processing and analytics is governed by Sections 2 through 4 of this Policy.
          </p>
        </section>

        <section aria-labelledby="privacy-sec6-heading">
          <h2 id="privacy-sec6-heading">6. Disclaimer for external links</h2>
          <p>
            If a user moves from the Service to another website through a link or similar means, we are not responsible for the information, services, or other content provided by the destination website.
          </p>
        </section>

        <section aria-labelledby="privacy-sec7-heading">
          <h2 id="privacy-sec7-heading">7. Disclosure, correction, suspension of use, and similar requests</h2>
          <p>
            If a user requests disclosure, correction, addition, deletion, suspension of use, or similar handling of their personal information, we will verify identity and respond without delay. This does not apply where we are not obligated to respond under the Act on the Protection of Personal Information or other laws and regulations.
          </p>
        </section>

        <section aria-labelledby="privacy-sec8-heading">
          <h2 id="privacy-sec8-heading">8. Compliance and policy changes</h2>
          <p>
            We comply with applicable Japanese laws, regulations, and other standards. We may revise and improve this Privacy Policy as laws change or our business changes. Revised content becomes effective when posted on the Website. If there are important changes, we will notify users through the Website, in-app notices, or similar means.
          </p>
        </section>

        <section aria-labelledby="privacy-sec9-heading">
          <h2 id="privacy-sec9-heading">9. Contact</h2>
          <p>
            Inquiries about this Policy are accepted through the following form.
          </p>
          <p>
            <a
              href="https://forms.gle/EG9cWVtkDboyVbtt9"
              target="_blank"
              rel="noopener noreferrer"
              >SideClip Contact Form, Google Form</a>
          </p>
        </section>
    `,
    terms: `
        <header class="doc-page__header">
          <div class="doc-page__header-text">
            <h1>Terms of Use</h1>
            <p class="doc-page__last-updated">Last updated: May 21, 2026</p>
          </div>
          <a href="./index.html" class="doc-page__top-return">Back to home</a>
        </header>

        <p class="doc-page__lead">
          These Terms of Use set forth the conditions for using the official website related to SideClip (<a href="https://sideclip.app/">https://sideclip.app</a>, the "Website") and the applications we provide, including apps for Mac and for smartphones or tablets, collectively the "Service." Please read these Terms before using the Service.
        </p>
        <p class="doc-page__lead">
          This English version is provided for convenience. If there is any inconsistency between the Japanese version and this English version, the Japanese version will prevail.
        </p>

        <section aria-labelledby="terms-article-1-heading">
          <h2 id="terms-article-1-heading">1. Application</h2>
          <ol class="terms-sublist">
            <li>
              These Terms govern the rights and obligations between the operator and users regarding use of the Service, and apply to all acts of accessing, viewing, downloading, installing, or using the Service.
            </li>
            <li>By using the Service, users are deemed to have agreed to these Terms.</li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-2-heading">
          <h2 id="terms-article-2-heading">2. Intellectual property rights</h2>
          <ol class="terms-sublist">
            <li>
              Copyrights, patent rights, and all other intellectual property rights relating to all programs, software, designs, UI, images, text, trademarks, logos, and other elements that make up the Service belong to the operator or legitimate rights holders. Users may not copy, modify, decompile, reverse engineer, disassemble, redistribute, analyze without authorization, or make secondary use of the Service without the operator's prior written permission.
            </li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-3-heading">
          <h2 id="terms-article-3-heading">3. Service specifications, communication, and data handling</h2>
          <ol class="terms-sublist">
            <li>
              The Service provides functions that help users manage data between their devices, such as Mac and smartphone, through clipboard history saving and search, OCR, and smartphone integration.
            </li>
            <li>
              As a rule, data synchronization between devices in the Service is performed through the user's local network, such as the same Wi-Fi environment, and clipboard contents are not transmitted to or stored on external servers managed by the operator.
            </li>
            <li>
              Notwithstanding the preceding paragraph, the Service may communicate with external services for certain convenience features, such as retrieving OGP information for URLs and syncing with external reminder features, paid plan license authentication, and anonymized usage analytics for quality improvement. Detailed data handling is governed by the separately established <a href="./privacy.html">Privacy Policy</a>.
            </li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-4-heading">
          <h2 id="terms-article-4-heading">4. Usage environment</h2>
          <ol class="terms-sublist">
            <li>
              Users are responsible, at their own expense, for preparing and maintaining the macOS environment and dependencies, including network environment, required for the Service to operate.
            </li>
            <li>
              The SideClip app for Mac is distributed from the Website (<a href="https://sideclip.app/">https://sideclip.app</a>) and is signed with an Apple Developer ID certificate and notarized by Apple.
            </li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-5-heading">
          <h2 id="terms-article-5-heading">5. Paid plans and payment</h2>
          <ol class="terms-sublist">
            <li>
              Some Service features are provided as paid plans, such as Pro and Ultra. Fees and details of provided features are specified in the Service or on the official website.
            </li>
            <li>Before using a paid plan, please confirm operation with the Free plan.</li>
            <li>
              Payment processing, subscription management, and receipt issuance for paid plans in the app are handled by Lemon Squeezy, a Merchant of Record under Stripe (the "Payment Provider"). Contracts relating to the sale and purchase of paid plans are formed between the user and the Payment Provider, Lemon Squeezy.
            </li>
            <li>
              Users make payments after agreeing to Lemon Squeezy's terms and privacy policy for purchasers.
            </li>
            <li>
              Refunds are not available even if a paid plan feature has a defect. Please report the issue through the
              <a href="https://forms.gle/EG9cWVtkDboyVbtt9" target="_blank" rel="noopener noreferrer">contact form</a>.
              If we determine that the defect can be fixed, we will address and distribute the fix through an application update.
            </li>
            <li>
              Users can manage subscriptions, including checking payment status and cancellation, through the dedicated page below.<br />
              Payment management page:
              <a href="https://sideclip.lemonsqueezy.com/billing" target="_blank" rel="noopener noreferrer"
                >https://sideclip.lemonsqueezy.com/billing</a>
            </li>
            <li>
              One license, or one subscription, may activate up to one Mac. Licenses are managed in association with device IDs. Please subscribe and activate on the Mac where you will use the paid plan.
            </li>
            <li>
              Free trials are limited to one time only on a Mac that uses a paid plan, either Pro or Ultra, for the first time. Duplicate free trials on the same Mac are not permitted.
            </li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-6-heading">
          <h2 id="terms-article-6-heading">6. Prohibited acts</h2>
          <ol class="terms-sublist">
            <li>Users must not engage in any of the following acts when using the Service.</li>
            <li>Acts that violate laws or public order and morals</li>
            <li>Acts that place excessive load on, or interfere with, servers or network systems of the Service</li>
            <li>Acts that threaten Service security, such as unauthorized access, cracking, or malware distribution</li>
            <li>Acts that infringe intellectual property rights or interests of the operator, other users, or third parties</li>
            <li>Acts that cause disadvantage, damage, or discomfort to other users or third parties</li>
            <li>
              Reusing licenses within a company or other organization, or activating one license or one subscription on multiple Macs, exceeding the number of permitted devices specified in Section 5
            </li>
            <li>
              Publishing a license key on internet forums, social media, file-sharing services, or similar places so that third parties can use it
            </li>
            <li>
              If the operator determines that a user has violated any of the preceding items, excluding paragraph 2 of this Section, the operator may invalidate the relevant license and suspend use of the paid plan without prior notice.
            </li>
            <li>Any other act that the operator deems inappropriate</li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-7-heading">
          <h2 id="terms-article-7-heading">7. Disclaimer</h2>
          <ol class="terms-sublist">
            <li>
              Because the Service handles clipboard history, users acknowledge in advance that passwords, API keys, personal information, and other confidential information may be recorded or synchronized. The Service is provided "as is," and the operator makes no express or implied warranties regarding completeness, operation, or availability. The operator does not warrant that the Service will fit a user's specific purpose, be free of defects or bugs, or that clipboard data obtained or synchronized through the Service will be accurate or complete.
            </li>
            <li>
              Users must exercise careful attention when handling passwords, credit card information, personal information, and other confidential information while using the Service. Because the Service stores clipboard history, such information may be recorded. To the extent permitted by law, the operator is not responsible for management of such information or any damages arising in relation to it, including leakage or unauthorized use.
            </li>
            <li>
              If clipboard data fails to synchronize, remains unapplied, disappears, or is damaged due to device failure, software failure, local network communication problems, delay, or interruption, or if data containing confidential information leaks due to the user's device settings, network environment, third-party access, or other user environment causes, the operator bears no liability for damages except where liability is required by the Consumer Contract Act or other laws.
            </li>
            <li>
              The operator is not responsible for defects or data inconsistencies arising from smartphone integration, local network communication, Apple Reminders synchronization, or similar functions of the Service.
            </li>
            <li>
              The operator is not liable for lost profits, business delays, lost opportunities, or other indirect, special, or incidental damages suffered by users due to defects, bugs, or other causes attributable to the Service, except where liability is required by the Consumer Contract Act or other laws.
            </li>
            <li>
              Even for damages not excluded by the preceding paragraph, and even where the operator bears liability for damages under mandatory laws such as the Consumer Contract Act, unless the operator acted intentionally or with gross negligence, the scope of liability is limited to ordinary damages directly and actually incurred by the user, and the maximum amount is the fees paid by that user for the Service during the past 12 months. For free use, liability is disclaimed.
            </li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-8-heading">
          <h2 id="terms-article-8-heading">8. Changes, suspension, and termination of the Service</h2>
          <ol class="terms-sublist">
            <li>
              The operator may change, add to, or terminate all or part of the Service without prior notice to users. The operator may also temporarily suspend the Service for system maintenance, failures, or similar reasons. The operator is not responsible for damages incurred by users as a result.
            </li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-9-heading">
          <h2 id="terms-article-9-heading">9. Changes to these Terms</h2>
          <ol class="terms-sublist">
            <li>
              The operator may change these Terms at any time when it deems necessary. Revised Terms take effect when posted in the Service or on the official website. If a user continues to use the Service after a Terms change, the user is deemed to have agreed to the revised Terms.
            </li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-10-heading">
          <h2 id="terms-article-10-heading">10. Governing law and jurisdiction</h2>
          <ol class="terms-sublist">
            <li>
              These Terms are governed by Japanese law. If a dispute arises in relation to the Service, the district court with jurisdiction over the operator's location will be the exclusive agreed court of first instance.
            </li>
          </ol>
        </section>

        <section aria-labelledby="terms-article-11-heading">
          <h2 id="terms-article-11-heading">11. Contact</h2>
          <ol class="terms-sublist">
            <li>Inquiries about the Service are accepted through the following form.</li>
            <li>
              <a
                href="https://forms.gle/EG9cWVtkDboyVbtt9"
                target="_blank"
                rel="noopener noreferrer"
                >SideClip Contact Form, Google Form</a>
            </li>
          </ol>
        </section>
    `,
    tokushoho: `
        <header class="doc-page__header">
          <div class="doc-page__header-text">
            <h1>Specified Commercial Transactions Act Disclosure</h1>
          </div>
          <a href="./index.html" class="doc-page__top-return">Back to home</a>
        </header>

        <p class="doc-page__lead">
          Subscription payments and sales for SideClip paid plans (the "Service") are processed by Lemon Squeezy (1104 Corporate Way, Sacramento, CA 95831, USA), a Merchant of Record under Stripe.
        </p>
        <p>
          Contracts relating to paid plan purchases are formed between users and Lemon Squeezy. Please check the checkout screen and notices issued by Lemon Squeezy for details such as sales price, payment timing, returns, and cancellation. The following information is provided as information about the provider of the Service.
        </p>
        <p>
          This English version is provided for convenience. If there is any inconsistency between the Japanese version and this English version, the Japanese version will prevail.
        </p>
        <p><strong>Operator: SideClip Development Team</strong></p>
        <br aria-hidden="true" />

        <section aria-labelledby="tokushoho-provider-heading">
          <h2 id="tokushoho-provider-heading">Service provider</h2>
          <p>
            Business name, address, and telephone number:<br />
            Upon request, after confirming a legitimate reason such as purchaser status for the Service, we will disclose this information without delay. If you would like disclosure, please contact us through the form below with your reason.
          </p>
          <p>
            <a href="https://forms.gle/EG9cWVtkDboyVbtt9" target="_blank" rel="noopener noreferrer">SideClip Contact Form</a>
          </p>
        </section>

        <section aria-labelledby="tokushoho-price-heading">
          <h2 id="tokushoho-price-heading">Sales price</h2>
          <p>The price shown on each paid plan purchase screen, the Lemon Squeezy checkout page, applies.</p>
          <p>Please confirm operation with the Free plan before using a paid plan.</p>
        </section>

        <section aria-labelledby="tokushoho-extra-heading">
          <h2 id="tokushoho-extra-heading">Fees required in addition to product price</h2>
          <ul>
            <li>Costs and communication fees for maintaining an internet connection required to use the Service.</li>
            <li>Consumption tax, included in the checkout price or calculated separately.</li>
          </ul>
        </section>

        <section aria-labelledby="tokushoho-paymethod-heading">
          <h2 id="tokushoho-paymethod-heading">Payment method</h2>
          <p>Payment methods provided by Lemon Squeezy, such as credit card and PayPal, are available.</p>
        </section>

        <section aria-labelledby="tokushoho-timing-heading">
          <h2 id="tokushoho-timing-heading">Payment timing</h2>
          <ul>
            <li>Initial purchase: charged when the payment process is completed.</li>
            <li>Subscription renewal: charged automatically on each renewal date for the contract period, monthly or yearly.</li>
          </ul>
        </section>

        <section aria-labelledby="tokushoho-delivery-heading">
          <h2 id="tokushoho-delivery-heading">Service delivery timing</h2>
          <p>After payment is completed, the license becomes effective immediately and paid plan features become available.</p>
        </section>

        <section aria-labelledby="tokushoho-cancel-heading">
          <h2 id="tokushoho-cancel-heading">Returns, cancellation, and mid-term cancellation</h2>
          <p>
            Due to the nature of software and digital content, returns and refunds after purchase, meaning after payment completion, are not accepted as a rule.<br />
            Subscription cancellation can be performed at any time through the payment management page below.
          </p>
          <p>
            Refunds are not available even if a paid plan feature has a defect. Please report the issue through the
            <a href="https://forms.gle/EG9cWVtkDboyVbtt9" target="_blank" rel="noopener noreferrer">contact form</a>.
            If the defect can be fixed, we will distribute the fix through an update.
          </p>
          <p>
            Payment management page:
            <a
              href="https://sideclip.lemonsqueezy.com/billing"
              target="_blank"
              rel="noopener noreferrer"
              >https://sideclip.lemonsqueezy.com/billing</a>
          </p>
          <p>
            If you cancel, billing stops from the next renewal date onward, but paid plan features remain available until the current paid period ends.
          </p>
        </section>

        <section aria-labelledby="tokushoho-env-heading">
          <h2 id="tokushoho-env-heading">Operating environment</h2>
          <p>
            A macOS environment and communication environment in which the Service can operate are required. For specific system requirements, please see the <a href="https://sideclip.app/#faq">official website guidance</a>.
          </p>
        </section>
    `
  };

  function getPageKey() {
    const explicit = document.body?.dataset?.i18nPage;
    if (explicit) return explicit;
    const path = window.location.pathname || "";
    if (path.endsWith("/privacy.html")) return "privacy";
    if (path.endsWith("/terms.html")) return "terms";
    if (path.endsWith("/security.html")) return "security";
    if (path.endsWith("/legal.html")) return "legal";
    if (path.endsWith("/tokushoho.html")) return "tokushoho";
    return "landing";
  }

  function localizedPagePath(lang, pageOverride) {
    const page = pageOverride || getPageKey();
    const englishPaths = {
      landing: "/",
      privacy: "/privacy/",
      terms: "/terms/",
      security: "/security/",
      legal: "/legal/",
      tokushoho: "/tokushoho/"
    };
    const japanesePaths = {
      landing: "/ja/",
      privacy: "/ja/privacy/",
      terms: "/ja/terms/",
      security: "/ja/security/",
      legal: "/ja/legal/",
      tokushoho: "/ja/tokushoho/"
    };
    return (lang === "en" ? englishPaths : japanesePaths)[page] || (lang === "en" ? "/" : "/ja/");
  }

  function getOriginalStore(el) {
    if (!el.__sideclipI18nOriginals) {
      Object.defineProperty(el, "__sideclipI18nOriginals", {
        value: {},
        enumerable: false
      });
    }
    return el.__sideclipI18nOriginals;
  }

  function applyEntry(lang, entry) {
    const [kind, selector, keyOrValue, maybeValue] = entry;
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => {
      const store = getOriginalStore(node);
      if (kind === "html") {
        if (store.html == null) store.html = node.innerHTML;
        node.innerHTML = lang === "en" ? keyOrValue : store.html;
        return;
      }
      if (kind === "text") {
        if (store.text == null) store.text = node.textContent;
        node.textContent = lang === "en" ? keyOrValue : store.text;
        return;
      }
      if (kind === "attr") {
        const attr = keyOrValue;
        const value = maybeValue;
        const storeKey = `attr:${attr}`;
        if (store[storeKey] == null) store[storeKey] = node.getAttribute(attr);
        if (lang === "en") {
          node.setAttribute(attr, value);
        } else if (store[storeKey] == null) {
          node.removeAttribute(attr);
        } else {
          node.setAttribute(attr, store[storeKey]);
        }
      }
    });
  }

  function captureMetaOriginals(page) {
    if (pageMetaOriginals.has(page)) return pageMetaOriginals.get(page);
    const original = {
      title: document.title,
      description: document.querySelector("meta[name='description']")?.getAttribute("content") || "",
      locale: document.querySelector("meta[property='og:locale']")?.getAttribute("content") || "ja_JP",
      ogTitle: document.querySelector("meta[property='og:title']")?.getAttribute("content") || "",
      ogDescription: document.querySelector("meta[property='og:description']")?.getAttribute("content") || "",
      twitterTitle: document.querySelector("meta[name='twitter:title']")?.getAttribute("content") || "",
      twitterDescription: document.querySelector("meta[name='twitter:description']")?.getAttribute("content") || ""
    };
    pageMetaOriginals.set(page, original);
    return original;
  }

  function setMetaAttr(selector, value) {
    const el = document.querySelector(selector);
    if (el && value != null) el.setAttribute("content", value);
  }

  function applyMeta(page, lang) {
    const original = captureMetaOriginals(page);
    const en = metaByPage[page] || metaByPage.landing;
    const source = lang === "en" ? en : original;
    document.title = source.title || original.title;
    setMetaAttr("meta[name='description']", source.description || original.description);
    setMetaAttr("meta[property='og:locale']", source.locale || original.locale);
    setMetaAttr("meta[property='og:title']", source.ogTitle || source.title || original.ogTitle);
    setMetaAttr("meta[property='og:description']", source.ogDescription || source.description || original.ogDescription);
    setMetaAttr("meta[name='twitter:title']", source.twitterTitle || source.title || original.twitterTitle);
    setMetaAttr("meta[name='twitter:description']", source.twitterDescription || source.description || original.twitterDescription);
  }

  function renderSwitch() {
    if (!LANGUAGE_SWITCH_ENABLED) return "";

    return `
      <div class="language-switch" data-language-switch role="group" aria-label="Language selector">
        <button type="button" class="language-switch__option" data-language-option="ja" aria-label="日本語で表示">JP</button>
        <button type="button" class="language-switch__option" data-language-option="en" aria-label="Show in English">EN</button>
      </div>
    `;
  }

  function updateLanguageControls() {
    document.querySelectorAll("[data-language-option]").forEach((button) => {
      const active = button.dataset.languageOption === currentLang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.querySelectorAll("[data-language-switch]").forEach((switchEl) => {
      switchEl.setAttribute(
        "aria-label",
        currentLang === "en" ? "Language selector" : "言語切替"
      );
    });
  }

  function updateLocalizedLinks(page) {
    const linkTargets = currentLang === "en"
      ? {
          "./index.html": "/",
          "/ja/": "/",
          "./security.html": "/security/",
          "/security.html": "/security/",
          "/ja/security/": "/security/",
          "/en/security/": "/security/",
          "./privacy.html": "/privacy/",
          "/privacy.html": "/privacy/",
          "/ja/privacy/": "/privacy/",
          "/en/privacy/": "/privacy/",
          "./terms.html": "/terms/",
          "/terms.html": "/terms/",
          "/ja/terms/": "/terms/",
          "/en/terms/": "/terms/",
          "./legal.html": "/legal/",
          "/legal.html": "/legal/",
          "/ja/legal/": "/legal/",
          "/en/legal/": "/legal/",
          "./tokushoho.html": "/tokushoho/",
          "/tokushoho.html": "/tokushoho/",
          "/ja/tokushoho/": "/tokushoho/",
          "/en/tokushoho/": "/tokushoho/",
          "./plans/": "/plans/",
          "/ja/plans": "/plans/",
          "/ja/plans/": "/plans/",
          "/en/plans": "/plans/",
          "/en/plans/": "/plans/"
        }
      : {
          "./index.html": "/ja/",
          "/": "/ja/",
          "./security.html": "/ja/security/",
          "/security.html": "/ja/security/",
          "/security/": "/ja/security/",
          "/en/security/": "/ja/security/",
          "./privacy.html": "/ja/privacy/",
          "/privacy.html": "/ja/privacy/",
          "/privacy/": "/ja/privacy/",
          "/en/privacy/": "/ja/privacy/",
          "./terms.html": "/ja/terms/",
          "/terms.html": "/ja/terms/",
          "/terms/": "/ja/terms/",
          "/en/terms/": "/ja/terms/",
          "./legal.html": "/ja/legal/",
          "/legal.html": "/ja/legal/",
          "/legal/": "/ja/legal/",
          "/en/legal/": "/ja/legal/",
          "./tokushoho.html": "/ja/tokushoho/",
          "/tokushoho.html": "/ja/tokushoho/",
          "/tokushoho/": "/ja/tokushoho/",
          "/en/tokushoho/": "/ja/tokushoho/",
          "/plans": "/ja/plans/",
          "/plans/": "/ja/plans/",
          "/en/plans": "/ja/plans/",
          "/en/plans/": "/ja/plans/"
        };

    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;
      const hashIndex = href.indexOf("#");
      const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
      const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
      const localized = linkTargets[path];
      if (localized) link.setAttribute("href", `${localized}${hash}`);
    });

    if (page === "landing") {
      document.querySelectorAll('a[href="./security.html"], a[href="/security.html"]').forEach((link) => {
        link.setAttribute("href", currentLang === "en" ? "/security/" : "/ja/security/");
      });
    }
  }

  let languageSuggestionPreviousFocus = null;

  function restoreLanguageSuggestionContext() {
    document.querySelectorAll("[data-language-suggestion-inert]").forEach((element) => {
      element.inert = false;
      element.removeAttribute("data-language-suggestion-inert");
    });
    languageSuggestionPreviousFocus?.focus?.();
    languageSuggestionPreviousFocus = null;
  }

  function dismissLanguageSuggestion() {
    document.querySelector("[data-language-suggestion]")?.remove();
    document.documentElement.classList.remove("language-suggestion-open");
    restoreLanguageSuggestionContext();
    window.__sideclipLanguageSuggestionOpen = false;
    window.__sideclipLanguageSuggestionHandled = true;
    document.dispatchEvent(new CustomEvent("sideclip:language-suggestion-closed"));
  }

  function ensureLanguageSuggestion() {
    if (!LANGUAGE_SWITCH_ENABLED) return;
    const preferred = getBrowserLang();
    if (preferred === currentLang || document.querySelector("[data-language-suggestion]")) return;

    const suggestion = document.createElement("aside");
    suggestion.className = "language-suggestion";
    suggestion.dataset.languageSuggestion = "";
    suggestion.setAttribute("role", "dialog");
    suggestion.setAttribute("aria-modal", "true");
    suggestion.setAttribute("aria-labelledby", "language-suggestion-title");
    suggestion.innerHTML = preferred === "en"
      ? '<div class="language-suggestion__card"><h2 id="language-suggestion-title">View this page in English?</h2><p>Your browser is set to English.</p><div class="language-suggestion__actions"><button type="button" class="language-suggestion__primary" data-language-suggestion-accept>View in English</button><button type="button" class="language-suggestion__dismiss" data-language-suggestion-dismiss>Not now</button></div></div>'
      : '<div class="language-suggestion__card"><h2 id="language-suggestion-title">日本語で表示しますか？</h2><p>ブラウザの言語設定が日本語になっています。</p><div class="language-suggestion__actions"><button type="button" class="language-suggestion__primary" data-language-suggestion-accept>日本語で見る</button><button type="button" class="language-suggestion__dismiss" data-language-suggestion-dismiss>今はしない</button></div></div>';
    suggestion.querySelector("[data-language-suggestion-accept]")?.addEventListener("click", () => setLang(preferred));
    suggestion.querySelector("[data-language-suggestion-dismiss]")?.addEventListener("click", dismissLanguageSuggestion);
    suggestion.addEventListener("keydown", (event) => {
      if (event.key === "Escape") dismissLanguageSuggestion();
      if (event.key !== "Tab") return;
      const focusable = Array.from(suggestion.querySelectorAll("button:not([disabled])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    languageSuggestionPreviousFocus = document.activeElement;
    document.body.appendChild(suggestion);
    Array.from(document.body.children).forEach((element) => {
      if (element === suggestion || element.tagName === "SCRIPT") return;
      element.inert = true;
      element.setAttribute("data-language-suggestion-inert", "");
    });
    document.documentElement.classList.add("language-suggestion-open");
    window.__sideclipLanguageSuggestionOpen = true;
    window.__sideclipLanguageSuggestionHandled = false;
    document.dispatchEvent(new CustomEvent("sideclip:language-suggestion-open"));
    suggestion.querySelector("[data-language-suggestion-accept]")?.focus();
  }

  function initLanguageControls(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-language-option]").forEach((button) => {
      if (button.dataset.languageBound === "1") return;
      button.dataset.languageBound = "1";
      button.addEventListener("click", () => {
        setLang(button.dataset.languageOption);
      });
    });
    updateLanguageControls();
  }

  function ensureDocLanguageSwitch() {
    if (!LANGUAGE_SWITCH_ENABLED) return;

    const header = document.querySelector("article.doc-page .doc-page__header");
    if (!header) return;
    if (header.querySelector("[data-language-switch]")) return;

    const actions = document.createElement("div");
    actions.className = "doc-page__header-actions";
    actions.innerHTML = renderSwitch();

    const topReturn = header.querySelector(".doc-page__top-return");
    if (topReturn) {
      actions.appendChild(topReturn);
    }

    header.appendChild(actions);
  }

  function applyArticleTranslation(page, lang) {
    const html = articleTranslations[page];
    const article = document.querySelector("article.doc-page");
    if (!html || !article) return;

    const store = getOriginalStore(article);
    if (store.html == null) {
      store.html = article.innerHTML;
    }
    article.innerHTML = lang === "en" ? html : store.html;
    ensureDocLanguageSwitch();
  }

  function applyLandingTranslations(lang) {
    landingEntries.forEach((entry) => applyEntry(lang, entry));
  }

  function applyPageTranslations(pageOverride) {
    const page = pageOverride || getPageKey();
    document.documentElement.lang = currentLang;
    document.body?.classList.toggle("is-lang-en", currentLang === "en");
    document.body?.classList.toggle("is-lang-ja", currentLang !== "en");
    applyMeta(page, currentLang);

    if (articleTranslations[page]) {
      applyArticleTranslation(page, currentLang);
    }

    if (page === "landing") {
      applyLandingTranslations(currentLang);
    }

    updateLocalizedLinks(page);
    initLanguageControls(document);
    window.SideClipRegionalPricing?.apply?.();
  }

  function trackLanguageView(lang, source) {
    const trackedLang = normalizeLang(lang);
    if (lastTrackedLang === trackedLang || typeof window.gtag !== "function") return;

    window.gtag("set", { site_language: trackedLang });
    window.gtag("set", "user_properties", { site_language: trackedLang });
    window.gtag("event", "language_view", {
      site_language: trackedLang,
      language_source: source,
      page_path: window.location.pathname,
      page_title: document.title,
      transport_type: "beacon"
    });
    lastTrackedLang = trackedLang;
  }

  function setLang(lang) {
    const next = normalizeLang(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {
      /* ignore */
    }
    dismissLanguageSuggestion();
    if (next === currentLang) return;
    trackLanguageView(next, "switch");
    const target = localizedPagePath(next);
    window.location.assign(`${target}${window.location.search}${window.location.hash}`);
  }

  window.SideClipI18n = {
    getLang: () => currentLang,
    setLang,
    renderSwitch,
    initLanguageControls,
    applyPageTranslations
  };

  document.documentElement.lang = currentLang;
  document.addEventListener("DOMContentLoaded", () => {
    if (articleTranslations[getPageKey()]) ensureDocLanguageSwitch();
    applyPageTranslations();
    trackLanguageView(currentLang, "initial");
    ensureLanguageSuggestion();
  });
})();
