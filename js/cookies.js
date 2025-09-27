document.addEventListener("DOMContentLoaded", () => {
  const banner    = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");
  const closeBtn  = document.getElementById("close-banner");
  const manageBtn = document.getElementById("manage-cookies");

  // 🔑 Funkcia na spustenie GA4
  function enableAnalytics() {
    // vloží GA script dynamicky
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-D8CXSNXYJC";
    document.head.appendChild(script);

    // inicializácia
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-D8CXSNXYJC');
  }

  // 1. Pri načítaní pozri, či už user rozhodol
  const consent = localStorage.getItem("cookieConsent");

  if (consent === null) {
    banner.style.display = "block"; // ešte nič → ukáž banner
  } else {
    banner.style.display = "none"; // už rozhodol → skry banner
    if (consent === "accepted") {
      enableAnalytics(); // spusti GA ak je súhlas
    }
  }

  // 2. Klik na Accept
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
    enableAnalytics(); // spusti GA4
  });

  // 3. Klik na Reject
  rejectBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "rejected");
    banner.style.display = "none";
  });

  // 4. Klik na Close (funguje ako Reject)
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("cookieConsent", "rejected");
    banner.style.display = "none";
  });

  // 5. Manage cookies – reset
  manageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("cookieConsent");
    banner.style.display = "block";
  });
});
