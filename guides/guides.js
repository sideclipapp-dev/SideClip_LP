(function () {
  // Keep local previews out of the production analytics property.
  const isProduction = /^(www\.)?sideclip\.app$/.test(window.location.hostname);
  if (isProduction) {
    const script = document.createElement("script");
    script.src = "/site-analytics.js?v=20260806";
    document.head.appendChild(script);
  }

  const mobile = navigator.userAgentData?.mobile === true
    || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")
    || (/Macintosh/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 1);

  document.querySelectorAll("[data-guide-download]").forEach((link) => {
    if (mobile) {
      link.href = "/ja/#download";
      link.textContent = "Macへのダウンロード案内";
    }
    link.addEventListener("click", () => {
      if (!isProduction || typeof window.gtag !== "function") return;
      const params = {
        cta_id: link.dataset.ctaId,
        section: link.dataset.ctaSection,
        article_id: document.body.dataset.articleId || "guides_index",
        page_path: window.location.pathname,
        site_language: "ja",
        link_url: link.href,
        transport_type: "beacon"
      };
      window.gtag("event", "cta_click", params);
      if (!mobile) window.gtag("event", "mac_download", params);
    });
  });
})();
