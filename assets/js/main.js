const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((element) => {
  const delay = element.dataset.delay;
  if (delay) {
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const artPanel = document.querySelector(".hero-art");

if (artPanel && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", (event) => {
    const offsetX = (event.clientX / window.innerWidth - 0.5) * 14;
    const offsetY = (event.clientY / window.innerHeight - 0.5) * 14;
    artPanel.style.transform = `translate3d(${offsetX * -0.35}px, ${offsetY * -0.2}px, 0)`;
  });
}
