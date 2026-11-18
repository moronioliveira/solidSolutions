import { describe, expect, it } from "vitest";
import { faq } from "@/content/faq";
import { services } from "@/content/services";
import { buildLlmsTxt } from "@/lib/seo/llms";
import {
  allOffers,
  businessProfile,
  commercialPlans,
  extraPage,
  getPlan,
  hosting,
  institutionalPlans,
  maintenance,
  reportSubscription,
} from "@/lib/pricing/commercial";

describe("Preços e pacotes", () => {
  it("publica os valores combinados", () => {
    expect(institutionalPlans.map((plan) => [plan.name, plan.price, plan.pages])).toEqual([
      ["Institucional Start", 990, 5],
      ["Institucional Completo", 1990, 10],
    ]);
    expect(extraPage.price).toBe(120);
    expect(businessProfile).toMatchObject({ price: 200, monthly: 100 });
    expect(reportSubscription).toEqual({ monthly: 79, installation: 120 });
  });

  it("mostra um preço de mercado maior que o nosso em todo plano que o cita", () => {
    for (const plan of [...commercialPlans, ...institutionalPlans]) {
      expect(plan.market.min, plan.name).toBeGreaterThan(plan.price);
    }
  });

  it("não usa nomes repetidos entre planos", () => {
    const names = allOffers.map((offer) => offer.name);
    expect(new Set(names).size).toBe(names.length);
    expect(getPlan("Institucional Completo").price).toBe(1990);
  });

  it("não cita valor de mercado para o Google Meu Negócio (sem fonte confiável)", () => {
    expect("market" in businessProfile).toBe(false);
  });
});

describe("Hospedagem e manutenção", () => {
  it("separa a hospedagem da manutenção de R$ 50", () => {
    expect(maintenance.monthly).toBe(50);
    expect(hosting.detail).toMatch(/inclusa/i);
    const hostingFaq = faq.find((item) => /hospedagem/i.test(item.question))!;
    expect(hostingFaq.answer).toMatch(/não depende da manutenção/i);
    expect(hostingFaq.answer).not.toMatch(/hospedagem gerenciada/i);
  });

  it("não vende hospedagem como parte da manutenção em nenhum texto público", () => {
    const text = [JSON.stringify(faq), JSON.stringify(services), buildLlmsTxt()].join("\n");
    expect(text).not.toMatch(/hospedagem gerenciada/i);
    expect(text).not.toMatch(/manutenção[^.]{0,60}com hospedagem/i);
  });

  it("inclui hospedagem nos planos com site e não no plano só de anúncios", () => {
    for (const plan of [commercialPlans[0], ...institutionalPlans]) {
      expect(plan.features.join(" "), plan.name).toMatch(/hospedagem inclusa/i);
    }
    expect(getPlan("Google Ads").features.join(" ")).not.toMatch(/hospedagem/i);
  });
});

describe("Relatório de resultados", () => {
  it("entra no plano Performance e fica fora do plano só de anúncios", () => {
    expect(getPlan("Performance").features.join(" ")).toMatch(/primeiro relatório mensal/i);
    expect(getPlan("Google Ads").features.join(" ")).not.toMatch(/relatório/i);
  });

  it("aparece no llms.txt com o preço do relatório avulso e a demonstração", () => {
    const text = buildLlmsTxt();
    expect(text).toContain("R$ 79");
    expect(text).toContain("R$ 120");
    expect(text).toMatch(/painel\.solidsolutionsdigital\.com\.br\/demo/);
  });
});

describe("Google Meu Negócio", () => {
  it("tem página de serviço própria, com exigência de elegibilidade e sem promessa de posição", () => {
    const service = services.find((item) => item.slug === "google-meu-negocio")!;
    expect(service.planName).toBe("Google Meu Negócio");
    const text = JSON.stringify(service);
    expect(text).toMatch(/endereço físico/i);
    expect(text).toMatch(/não garantimos|Não\. A posição/i);
    expect(text).toMatch(/não compramos nem criamos avaliações/i);
  });
});
