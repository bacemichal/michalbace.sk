document.addEventListener("DOMContentLoaded", () => {
  const banner    = document.getElementById("cookie-banner");
  const btnAccept = document.getElementById("accept-cookies");
  const btnReject = document.getElementById("reject-cookies");
  const btnClose  = document.getElementById("close-banner");
  const btnManage = document.getElementById("manage-cookies");

  // Inicializácia dataLayer a gtag funkcie
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  // Default: nič nedovoľ, kým užívateľ nerozhodne
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied'
  });

  // Funkcia na načítanie GA skriptu
  function loadAnalytics() {
    if (window.gaLoaded) return; // aby sa nenačítalo 2x
    window.gaLoaded = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-D8CXSNXYJC";
    document.head.appendChild(script);

    script.onload = () => {
      gtag("js", new Date());
      gtag("config", "G-D8CXSNXYJC", { debug_mode: true });
      console.log("📡 GA spustený");
    };
  }

  // Funkcia pre nastavenie consentu
  function setConsent(value) {
    localStorage.setItem("cookieConsent", value);
    banner.style.display = "none";

    if (value === "accepted") {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted'
      });
      loadAnalytics();
    } else {
      gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied'
      });
    }
  }

  // Po načítaní stránky skontroluj, či už user rozhodol
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    banner.style.display = "block";
  } else if (consent === "accepted") {
    setConsent("accepted"); // rovno spusti GA
  } else {
    setConsent("rejected");
  }

  // Event listenery
  btnAccept.addEventListener("click", () => setConsent("accepted"));
  btnReject.addEventListener("click", () => setConsent("rejected"));
  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    setConsent("rejected");
  });

  // Manage cookies (ak existuje v HTML)
  if (btnManage) {
    btnManage.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("cookieConsent");
      banner.style.display = "block";
    });
  }
});
