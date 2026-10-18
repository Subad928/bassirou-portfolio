import { useEffect } from "react";

// Moves every [data-speed] element relative to its section as the page scrolls.
// Positive speed drifts down (feels farther away); negative drifts up (feels closer).
// Add data-parallax="down" to only drift down once the section reaches the top of the
// screen, so items near a section's top edge never get pushed up out of view.
export default function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const items = [...document.querySelectorAll("[data-speed]")]
      .map((el) => ({
        el,
        speed: Number(el.dataset.speed),
        downOnly: el.dataset.parallax === "down",
        root: el.closest("section, header"),
      }))
      .filter((item) => item.speed && item.root);

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      items.forEach(({ el, speed, downOnly, root }) => {
        const rect = root.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const offset = downOnly ? Math.max(0, -rect.top) : -rect.top;
        el.style.transform = `translate3d(0, ${(offset * speed).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}
