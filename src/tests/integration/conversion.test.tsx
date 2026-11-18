import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HomePage from "../../../app/page";
import ServicesPage from "../../../app/servicos/page";
import ServicePage from "../../../app/servicos/[slug]/page";
import { InteractionTracker } from "@/components/analytics/interaction-tracker";
import { site } from "@/content/site";

afterEach(cleanup);

/** Blocos de primeiro nível da página, na ordem em que aparecem (ignora o JSON-LD). */
function blocks(container: HTMLElement) {
  return [...container.children].filter((element) => element.tagName !== "SCRIPT");
}

const hasWhatsApp = (element: Element) => element.querySelector('[data-cta="whatsapp"]') !== null;

/** Texto visível com espaços normais: o formatBRL usa espaço não separável ("R$ 990"). */
const plain = (element: Element | null) => (element?.textContent ?? "").replace(/\s+/g, " ");

describe("Regras de conversão da página inicial", () => {
  it("nunca passa de duas seções seguidas sem um botão de WhatsApp", () => {
    const { container } = render(<HomePage />);
    let run = 0;
    let longest = 0;
    for (const block of blocks(container)) {
      run = hasWhatsApp(block) ? 0 : run + 1;
      longest = Math.max(longest, run);
    }
    expect(longest).toBeLessThanOrEqual(2);
  });

  it("mostra só três cartões de preço na seção de planos (sem sobrecarregar a escolha)", () => {
    const { container } = render(<HomePage />);
    const plans = container.querySelector("#planos")!;
    expect(plans.querySelectorAll("article.plan-card")).toHaveLength(3);
    expect(plans.querySelector('a[href="/servicos#planos"]')).not.toBeNull();
  });

  it("traz a garantia de entrega perto do botão principal", () => {
    const { container } = render(<HomePage />);
    const hero = container.querySelector(".hero")!;
    expect(hero.querySelector('[data-cta="whatsapp"]')).not.toBeNull();
    expect(hero.textContent).toMatch(/devolvemos o que você pagou/);
  });

  it("mostra o relatório de exemplo sempre identificado como dados fictícios", () => {
    const { container } = render(<HomePage />);
    const report = container.querySelector(".report-section")!;
    expect(report.textContent).toMatch(/dados fictícios/i);
    const demo = report.querySelector<HTMLAnchorElement>('a[data-cta="demo"]')!;
    expect(demo.href).toBe(site.reportDemoUrl);
    expect(demo.rel).toContain("noopener");
  });

  it("não repete a seção de diferenciais, que já é coberta pela comparação", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector("#differentials-title")).toBeNull();
    expect(container.querySelector("#comparison-title")).not.toBeNull();
  });
});

describe("Rastreamento dos botões novos", () => {
  it("o clique no relatório de exemplo vira o evento demo_click no GTM", () => {
    window.dataLayer = [];
    const { container } = render(
      <>
        <HomePage />
        <InteractionTracker />
      </>,
    );
    fireEvent.click(container.querySelector('.report-section a[data-cta="demo"]')!);
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: "demo_click", cta_location: "relatorio-home" }),
    );
    expect(window.dataLayer?.some((event) => event.event === "whatsapp_click")).toBe(false);
  });

  it("o clique em um botão de plano continua virando whatsapp_click com o local certo", () => {
    window.dataLayer = [];
    const { container } = render(
      <>
        <HomePage />
        <InteractionTracker />
      </>,
    );
    fireEvent.click(container.querySelector('#planos [data-cta="whatsapp"]')!);
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: "whatsapp_click", cta_location: "plano-essencial" }),
    );
  });
});

describe("Página de serviços completa", () => {
  it("reúne pacotes do institucional, serviços avulsos e adicionais", () => {
    const { container } = render(<ServicesPage />);
    const plans = container.querySelector("#planos")!;
    expect(plans.querySelectorAll(".institutional article.plan-card")).toHaveLength(2);
    expect(plans.querySelectorAll(".addon-card")).toHaveLength(2);
    expect(plain(plans)).toContain("R$ 990");
    expect(plain(plans)).toContain("R$ 1.990");
    expect(plain(plans)).toContain("R$ 120");
    expect(plain(plans)).toContain("R$ 79/mês");
  });
});

describe("Páginas de serviço", () => {
  const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

  it("o institucional mostra os pacotes e não mostra mais o preço de R$ 250", async () => {
    const { container } = render(await ServicePage(params("criacao-de-site-institucional")));
    expect(container.querySelectorAll(".institutional article.plan-card")).toHaveLength(2);
    expect(plain(container.querySelector(".intro-price"))).toContain("R$ 990");
    expect(plain(container)).not.toMatch(/R\$ ?250/);
  });

  it("o Google Ads mostra o relatório de exemplo", async () => {
    const { container } = render(await ServicePage(params("google-ads")));
    expect(container.querySelector(".report-section")).not.toBeNull();
  });

  it("o Google Meu Negócio avisa a regra de elegibilidade e mostra o preço", async () => {
    const { container } = render(await ServicePage(params("google-meu-negocio")));
    expect(plain(container.querySelector(".intro-price"))).toContain("R$ 200");
    expect(container.textContent).toMatch(/endereço físico/);
  });
});
