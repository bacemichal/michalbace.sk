document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const buttons = {
    accept: document.getElementById("accept-cookies"),
    reject: document.getElementById("reject-cookies"),
    close:  document.getElementById("close-banner"),
    manage: document.getElementById("manage-cookies"),
  };

  // Spustenie GA4
  const enableAnalytics = () => {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-D8CXSNXYJC";
    document.head.appendChild(s);
    s.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args) => dataLayer.push(args);
      gtag("js", new Date());
      gtag("config", "G-D8CXSNXYJC");
    };
  };

  // Helper na uloženie voľby
  const setConsent = (value) => {
    localStorage.setItem("cookieConsent", value);
    banner.style.display = "none";
    if (value === "accepted") enableAnalytics();
  };

  // Pri načítaní
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    banner.style.display = "block";
  } else if (consent === "accepted") {
    enableAnalytics();
  }

  // Eventy
  buttons.accept.onclick = () => setConsent("accepted");
  buttons.reject.onclick = () => setConsent("rejected");
  buttons.close.onclick  = (e) => { e.preventDefault(); setConsent("rejected"); };
  buttons.manage.onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem("cookieConsent");
    banner.style.display = "block";
  };
});
