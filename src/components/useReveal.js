import { useEffect } from "react";
import anime from "animejs";

// Animates every [data-reveal] element into view the first time it scrolls on screen.
export default function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => (el.style.opacity = 1));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const anim = anime({
            targets: entry.target,
            translateY: [40, 0],
            rotate: [entry.target.dataset.reveal === "tilt" ? -3 : 0, 0],
            opacity: [0, 1],
            duration: 900,
            delay: Number(entry.target.dataset.delay || 0),
            easing: "easeOutExpo",
            // hand transform back to CSS so :hover effects work
            complete: () => (entry.target.style.transform = ""),
          });
          // If animation frames are throttled (background tab), still finish the reveal.
          setTimeout(() => !anim.completed && anim.seek(anim.duration), 2000 + anim.delay);
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => {
      el.style.opacity = 0;
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
      items.forEach((el) => (el.style.opacity = 1));
    };
  }, []);
}
