(function () {
  if (window.__sideclipAnalyticsBootstrapped || typeof window.gtag === "function") return;
  window.__sideclipAnalyticsBootstrapped = true;

  const measurementId = "G-D3JVLNHHMQ";
  const path = window.location.pathname.toLowerCase();
  const siteLanguage = path === "/ja" || path.startsWith("/ja/") ? "ja" : "en";

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
  window.gtag("js", new Date());
  window.gtag("set", { site_language: siteLanguage });
  window.gtag("set", "user_properties", { site_language: siteLanguage });
  window.gtag("config", measurementId, { site_language: siteLanguage });

  const tagScript = document.createElement("script");
  tagScript.async = true;
  tagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(tagScript);
})();
