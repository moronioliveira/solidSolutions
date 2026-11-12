"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

const CAMPAIGN_KEY = "utm_campaign";

/** utm_campaign da visita (guardado na sessão para sobreviver a navegação); "organico" se não houver. */
function getCampaign(): string {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("utm_campaign");
    if (fromUrl) {
      sessionStorage.setItem(CAMPAIGN_KEY, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(CAMPAIGN_KEY) ?? "organico";
  } catch {
    return "organico";
  }
}

/**
 * Envia para o dataLayer:
 * - `whatsapp_click` em todo link marcado com data-cta="whatsapp";
 * - `faq_open` quando uma pergunta frequente é aberta.
 * Um único ouvinte no documento evita transformar os botões em componentes de cliente.
 */
export function InteractionTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLElement>('[data-cta="whatsapp"]');
      if (!link) return;
      trackEvent("whatsapp_click", {
        cta_location: link.dataset.ctaLocation ?? "desconhecido",
        campaign: getCampaign(),
        page_path: window.location.pathname,
      });
    }
    function onToggle(event: Event) {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open) return;
      if (!details.closest("[data-faq]")) return;
      trackEvent("faq_open", { faq_question: details.querySelector("summary")?.textContent ?? "" });
    }
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);
  return null;
}
