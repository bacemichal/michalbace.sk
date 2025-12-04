window.addEventListener("load", () => {

  if (sessionStorage.getItem("heroPlayed")) {
    document.querySelector(".hero-title").style.opacity = 1;
    return;
  }

  sessionStorage.setItem("heroPlayed", true);

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  const split = new SplitText(".hero-title", { type: "lines" });

  gsap.set(".hero-title", { opacity: 1 });

  tl.from(split.lines, {
    opacity: 0,
    y: "0.25em",
    duration: 1.2,
    stagger: 0.035
  });

});
