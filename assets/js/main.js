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

const companySlides = document.querySelectorAll("[data-company-slide]");
const companyDots = document.querySelectorAll(".showcase-dot");
const showcase = document.querySelector(".hero-showcase");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (companySlides.length && companyDots.length) {
  let activeIndex = 0;
  let slideTimer = null;

  const setActiveSlide = (index) => {
    activeIndex = index;

    companySlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    companyDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });
  };

  const startSlideTimer = () => {
    if (reduceMotion.matches) return;

    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % companySlides.length;
      setActiveSlide(nextIndex);
    }, 4200);
  };

  const stopSlideTimer = () => {
    window.clearInterval(slideTimer);
  };

  companyDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveSlide(index);
      startSlideTimer();
    });
  });

  if (showcase) {
    showcase.addEventListener("pointerenter", stopSlideTimer);
    showcase.addEventListener("pointerleave", startSlideTimer);
    showcase.addEventListener("focusin", stopSlideTimer);
    showcase.addEventListener("focusout", startSlideTimer);
  }

  setActiveSlide(0);
  startSlideTimer();
}
