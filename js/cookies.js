document.addEventListener("DOMContentLoaded", () => {
  const banner    = document.getElementById("cookie-banner");
  const btnAccept = document.getElementById("accept-cookies");
  const btnReject = document.getElementById("reject-cookies");
  const btnClose  = document.getElementById("close-banner");
  const btnManage = document.getElementById("manage-cookies");

  function enableAnalytics() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-D8CXSNXYJC";
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", "G-D8CXSNXYJC", { debug_mode: true });
    };
    document.head.appendChild(script);
  }

  function setConsent(value) {
    localStorage.setItem("cookieConsent", value);
    banner.style.display = "none";
    if (value === "accepted") enableAnalytics();
  }

  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    banner.style.display = "block";
  } else if (consent === "accepted") {
    enableAnalytics();
  } else {
    banner.style.display = "none";
  }

  btnAccept.addEventListener("click", () => setConsent("accepted"));
  btnReject.addEventListener("click", () => setConsent("rejected"));
  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    setConsent("rejected");
  });
  btnManage.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("cookieConsent");
    banner.style.display = "block";
  });
});
