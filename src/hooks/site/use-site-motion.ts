import { useEffect, type RefObject } from "react";

/** Progressive enhancement: content stays readable without JavaScript or motion. */
export function useSiteMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    function initialize() {
      dispose();
      if (!root || preference.matches) return;
      const targets = Array.from(
        root.querySelectorAll<HTMLElement>(
          ".capability-band, .section, .section-heading, .project, .solution, .process-step, .concept-note, .contact-band, .contact-band-inner > *, .footer-top > *, .page-intro > *, .about-content > *, .contact-aside, .contact-options, .capability-inner > span, .plan-card, .management-band, .plans-details, .plans-help",
        ),
      );
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
      );

      targets.forEach((element) => {
        const siblings = Array.from(element.parentElement?.children ?? []);
        const index = siblings.indexOf(element);
        element.style.setProperty("--motion-delay", `${Math.min(index, 3) * 95}ms`);
        element.setAttribute("data-motion", "reveal");
        observer.observe(element);
      });

      const hero = root.querySelector<HTMLElement>(".hero");
      let frame = 0;
      function updateScroll() {
        frame = 0;
        if (!root) return;
        const maximum = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty(
          "--reading-progress",
          `${maximum > 0 ? Math.min(1, window.scrollY / maximum) : 0}`,
        );
        if (hero) {
          const bounds = hero.getBoundingClientRect();
          if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
            hero.style.setProperty("--hero-scroll", `${Math.max(0, -bounds.top) * 0.13}px`);
          }
        }
      }
      function onScroll() {
        if (!frame) frame = window.requestAnimationFrame(updateScroll);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      updateScroll();

      const cards = Array.from(root.querySelectorAll<HTMLElement>(".project-art"));
      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse") return;
        const card = event.currentTarget;
        if (!(card instanceof HTMLElement)) return;
        const bounds = card.getBoundingClientRect();
        card.style.setProperty(
          "--tilt-x",
          `${((event.clientY - bounds.top) / bounds.height - 0.5) * -7}deg`,
        );
        card.style.setProperty(
          "--tilt-y",
          `${((event.clientX - bounds.left) / bounds.width - 0.5) * 7}deg`,
        );
      }
      function reset(event: PointerEvent) {
        const card = event.currentTarget;
        if (!(card instanceof HTMLElement)) return;
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      }
      cards.forEach((card) => {
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", reset);
      });

      dispose = () => {
        observer.disconnect();
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        targets.forEach((element) => {
          element.removeAttribute("data-motion");
          element.removeAttribute("data-visible");
          element.style.removeProperty("--motion-delay");
        });
        hero?.style.removeProperty("--hero-scroll");
        root.style.removeProperty("--reading-progress");
        cards.forEach((card) => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", reset);
          card.style.removeProperty("--tilt-x");
          card.style.removeProperty("--tilt-y");
        });
      };
    }

    initialize();
    preference.addEventListener("change", initialize);
    return () => {
      dispose();
      preference.removeEventListener("change", initialize);
    };
  }, [rootRef]);
}
