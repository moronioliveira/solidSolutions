import { useEffect } from "react";

/**
 * Melhoria progressiva: elementos com [data-reveal] surgem ao entrar na tela,
 * a barra de leitura acompanha a rolagem e os cards de projeto inclinam com o mouse.
 * Sem JavaScript, ou com movimento reduzido, tudo fica visível e estático.
 * Reexecuta a cada troca de rota para observar o novo conteúdo.
 */
export function useSiteMotion(routeKey: string) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let dispose = () => {};

    function initialize() {
      dispose();
      if (preference.matches) return;

      const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
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
        const index = Math.max(siblings.indexOf(element), 0);
        element.style.setProperty("--motion-delay", `${Math.min(index, 3) * 90}ms`);
        element.setAttribute("data-motion", "reveal");
        observer.observe(element);
      });

      const hero = document.querySelector<HTMLElement>(".hero");
      let frame = 0;
      function updateScroll() {
        frame = 0;
        const maximum = root.scrollHeight - window.innerHeight;
        root.style.setProperty(
          "--reading-progress",
          `${maximum > 0 ? Math.min(1, window.scrollY / maximum) : 0}`,
        );
        if (hero) {
          const bounds = hero.getBoundingClientRect();
          if (bounds.bottom > 0) {
            hero.style.setProperty("--hero-scroll", `${Math.max(0, -bounds.top) * 0.13}px`);
          }
        }
      }
      function onScroll() {
        if (!frame) frame = window.requestAnimationFrame(updateScroll);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      updateScroll();

      const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-art"));
      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse") return;
        const card = event.currentTarget as HTMLElement;
        const bounds = card.getBoundingClientRect();
        const x = ((event.clientY - bounds.top) / bounds.height - 0.5) * -6;
        const y = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6;
        card.style.setProperty("--tilt-x", `${x}deg`);
        card.style.setProperty("--tilt-y", `${y}deg`);
      }
      function reset(event: PointerEvent) {
        const card = event.currentTarget as HTMLElement;
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
        });
      };
    }

    initialize();
    preference.addEventListener("change", initialize);
    return () => {
      dispose();
      preference.removeEventListener("change", initialize);
    };
  }, [routeKey]);
}
