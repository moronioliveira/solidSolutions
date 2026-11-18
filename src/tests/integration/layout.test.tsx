import type { ReactElement } from "react";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import HomePage from "../../../app/page";
import ServicesPage from "../../../app/servicos/page";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { InteractionTracker } from "@/components/analytics/interaction-tracker";
import { FaqSection } from "@/components/sections";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { setPathname } from "@/tests/stubs/next-navigation";
import { faq } from "@/content/faq";
import { navigation, site, socialLinks } from "@/content/site";

/** Páginas que podem ser destino de um link com âncora (#) no cabeçalho ou rodapé. */
const anchorTargets: Record<string, () => ReactElement> = {
  "/": () => <HomePage />,
  "/servicos": () => <ServicesPage />,
};

afterEach(() => {
  cleanup();
  setPathname("/");
  window.dataLayer = [];
  sessionStorage.clear();
  window.history.replaceState(null, "", "/");
});

describe("Cabeçalho", () => {
  it("mostra todos os itens de navegação e marca a página atual", () => {
    setPathname("/servicos/landing-page");
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Navegação principal" });
    for (const item of navigation) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }
    expect(within(nav).getByRole("link", { name: "Serviços" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Início" })).not.toHaveAttribute("aria-current");
  });

  it("abre e fecha o menu do celular pelo botão e pela tecla Esc", () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    const mobileNav = document.getElementById("mobile-nav")!;
    expect(mobileNav).not.toBeVisible();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Fechar menu");
    expect(mobileNav).toBeVisible();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(mobileNav).not.toBeVisible();
  });

  it("fecha o menu do celular ao escolher um link", () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    const mobileNav = screen.getByRole("navigation", { name: "Navegação móvel" });
    fireEvent.click(within(mobileNav).getByRole("link", { name: /Projetos/ }));
    expect(document.getElementById("mobile-nav")).not.toBeVisible();
  });
});

describe("Rodapé", () => {
  it("traz WhatsApp e redes sociais oficiais", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText(site.whatsapp.display)).toBeInTheDocument();
    for (const social of socialLinks) {
      const link = footer.querySelector<HTMLAnchorElement>(`a[data-social="${social.network}"]`)!;
      expect(link.href).toBe(social.url);
      expect(link.rel).toContain("noopener");
    }
  });

  it("mostra o ano atual no aviso de direitos", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo").textContent).toContain(String(new Date().getFullYear()));
  });
});

describe("Links com âncora no cabeçalho e no rodapé", () => {
  it("apontam para seções que existem na página de destino", () => {
    const { container } = render(
      <>
        <SiteHeader />
        <SiteFooter />
      </>,
    );
    const hashLinks = [...container.querySelectorAll<HTMLAnchorElement>('a[href*="#"]')]
      .map((link) => link.getAttribute("href")!)
      .filter((href) => href.startsWith("/"));
    cleanup();
    for (const href of new Set(hashLinks)) {
      const url = new URL(href, site.url);
      const page = anchorTargets[url.pathname];
      expect(page, `adicione ${url.pathname} em anchorTargets para conferir ${href}`).toBeDefined();
      const { container: target, unmount } = render(page());
      expect(target.querySelector(url.hash), `âncora inexistente: ${href}`).not.toBeNull();
      unmount();
    }
  });
});

describe("Rastreamento de conversões (dataLayer do GTM)", () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it("envia whatsapp_click com o local do botão, a página e a campanha orgânica", () => {
    window.history.replaceState(null, "", "/servicos");
    render(
      <>
        <InteractionTracker />
        <WhatsAppLink location="teste-hero">Falar no WhatsApp</WhatsAppLink>
      </>,
    );
    fireEvent.click(screen.getByText("Falar no WhatsApp"));
    expect(window.dataLayer).toEqual([
      { event: "whatsapp_click", cta_location: "teste-hero", campaign: "organico", page_path: "/servicos" },
    ]);
  });

  it("guarda a campanha do anúncio (utm_campaign) durante a visita", () => {
    window.history.replaceState(null, "", "/?utm_campaign=search-brasil");
    const { unmount } = render(
      <>
        <InteractionTracker />
        <FloatingWhatsApp />
      </>,
    );
    fireEvent.click(screen.getByRole("link", { name: /WhatsApp/ }));
    unmount();

    // Em outra página, já sem o utm na URL, a campanha continua sendo atribuída.
    window.history.replaceState(null, "", "/contato");
    render(
      <>
        <InteractionTracker />
        <FloatingWhatsApp />
      </>,
    );
    fireEvent.click(screen.getByRole("link", { name: /WhatsApp/ }));
    expect(window.dataLayer?.map((event) => event.campaign)).toEqual(["search-brasil", "search-brasil"]);
    expect(window.dataLayer?.[1]).toMatchObject({ cta_location: "flutuante", page_path: "/contato" });
  });

  it("ignora cliques fora dos botões de WhatsApp", () => {
    render(
      <>
        <InteractionTracker />
        <a href="/sobre">Sobre</a>
      </>,
    );
    fireEvent.click(screen.getByText("Sobre"));
    expect(window.dataLayer).toEqual([]);
  });

  it("envia faq_open quando uma pergunta frequente é aberta", () => {
    const { container } = render(
      <>
        <InteractionTracker />
        <FaqSection items={faq.slice(0, 1)} />
      </>,
    );
    const details = container.querySelector("details")!;
    act(() => {
      details.open = true;
      details.dispatchEvent(new Event("toggle"));
    });
    expect(window.dataLayer).toEqual([{ event: "faq_open", faq_question: faq[0].question }]);
  });

  it("para de rastrear quando o componente sai da tela", () => {
    const { unmount } = render(<InteractionTracker />);
    unmount();
    render(<WhatsAppLink location="depois">Depois</WhatsAppLink>);
    fireEvent.click(screen.getByText("Depois"));
    expect(window.dataLayer).toEqual([]);
  });
});
