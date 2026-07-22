(function () {
  if (window.__sideclipAnalyticsBootstrapped || typeof window.gtag === "function") return;
  window.__sideclipAnalyticsBootstrapped = true;

  const measurementId = "G-D3JVLNHHMQ";
  const consentKey = "sideclip_cookie_consent_v1";
  const path = window.location.pathname.toLowerCase();
  const siteLanguage = path === "/ja" || path.startsWith("/ja/") ? "ja" : "en";
  let savedConsent = null;

  try {
    savedConsent = window.localStorage.getItem(consentKey);
  } catch (_) {
    /* Browsing still works when storage access is unavailable. */
  }

  const analyticsConsent = siteLanguage === "ja" || savedConsent === "accepted"
    ? "granted"
    : "denied";

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    analytics_storage: analyticsConsent,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });
  window.gtag("js", new Date());
  window.gtag("set", { site_language: siteLanguage });
  window.gtag("set", "user_properties", { site_language: siteLanguage });
  window.gtag("config", measurementId, { site_language: siteLanguage });

  const tagScript = document.createElement("script");
  tagScript.async = true;
  tagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(tagScript);

  function updateConsent(granted) {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
  }

  function saveConsent(value) {
    try {
      window.localStorage.setItem(consentKey, value);
    } catch (_) {
      /* The selected state applies to this page even without storage. */
    }
  }

  function showConsentBanner() {
    if (siteLanguage !== "en" || savedConsent || document.querySelector("[data-site-analytics-consent]")) return;

    const style = document.createElement("style");
    style.textContent = `
      [data-site-analytics-consent] { position:fixed; left:50%; bottom:18px; z-index:6000; display:flex; width:min(720px,calc(100% - 28px)); align-items:center; justify-content:space-between; gap:18px; padding:16px 18px; transform:translateX(-50%); border:1px solid rgba(7,29,69,.14); border-radius:8px; background:#fff; box-shadow:0 16px 44px rgba(7,29,69,.2); color:#071d45; font:600 14px/1.5 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
      [data-site-analytics-consent] p { margin:0; }
      [data-site-analytics-consent] div { display:flex; flex:none; gap:8px; }
      [data-site-analytics-consent] button { min-height:40px; padding:9px 16px; border:1px solid rgba(7,29,69,.16); border-radius:999px; background:#fff; color:#071d45; font:700 13px/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; cursor:pointer; }
      [data-site-analytics-consent] button[data-consent-choice="accepted"] { border-color:#0071e3; background:#0071e3; color:#fff; }
      @media (max-width:640px) { [data-site-analytics-consent] { align-items:stretch; flex-direction:column; } [data-site-analytics-consent] div { width:100%; } [data-site-analytics-consent] button { flex:1; } }
    `;
    const banner = document.createElement("aside");
    banner.setAttribute("data-site-analytics-consent", "");
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent banner");
    banner.innerHTML = '<p>We use analytics cookies to improve this site.</p><div><button type="button" data-consent-choice="rejected">Decline</button><button type="button" data-consent-choice="accepted">Accept</button></div>';
    banner.addEventListener("click", (event) => {
      const choice = event.target.closest("[data-consent-choice]")?.dataset.consentChoice;
      if (!choice) return;
      const granted = choice === "accepted";
      saveConsent(choice);
      updateConsent(granted);
      if (granted) {
        window.gtag("event", "consent_choice", {
          consent_status: choice,
          consent_method: "banner",
          page_path: window.location.pathname,
          transport_type: "beacon"
        });
        window.gtag("event", "page_view", {
          page_location: window.location.href,
          page_path: window.location.pathname,
          page_title: document.title,
          site_language: siteLanguage
        });
      }
      banner.remove();
      style.remove();
    });
    document.head.appendChild(style);
    document.body.appendChild(banner);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showConsentBanner, { once: true });
  } else {
    showConsentBanner();
  }
})();
