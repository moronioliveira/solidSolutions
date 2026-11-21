import { describe, expect, it } from "vitest";
import { faq } from "@/content/faq";
import * as home from "@/content/home";
import { niches } from "@/content/niches";
import { projects } from "@/content/projects";
import { seo } from "@/content/seo";
import { services } from "@/content/services";
import { navigation, site, socialLinks } from "@/content/site";
import {
  adBudget,
  adManagement,
  allOffers,
  businessProfile,
  commercialPlans,
  extraPage,
  formatBRL,
  getPlan,
  institutionalPlans,
  maintenance,
  reportSubscription,
} from "@/lib/pricing/commercial";
import { buildLlmsTxt } from "@/lib/seo/llms";
import { pageGraph, serviceSchema } from "@/lib/seo";

/** Junta todo o texto de um objeto (strings em qualquer profundidade). */
function allText(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allText);
  if (value && typeof value === "object") return Object.values(value).flatMap(allText);
  return [];
}

/** Valores em reais que podem aparecer no site: todos vêm do módulo de preços. */
const allowedPrices = new Set<number>([
  ...commercialPlans.flatMap((plan) => [plan.price, plan.market.min]),
  ...institutionalPlans.flatMap((plan) => [plan.price, plan.market.min]),
  extraPage.price,
  businessProfile.price,
  businessProfile.monthly,
  reportSubscription.monthly,
  reportSubscription.installation,
  adManagement.monthly,
  adManagement.market.min,
  maintenance.monthly,
  maintenance.singleChange,
  adBudget.minimumDaily,
  adBudget.maximumDaily,
  40, // domínio .com.br no Registro.br (custo de terceiro, citado no FAQ)
]);

const copy = [
  ...allText(faq),
  ...allText(home),
  ...allText(niches),
  ...allText(projects),
  ...allText(services),
  ...allText(seo),
  buildLlmsTxt(),
];

describe("Preços escritos nos textos", () => {
  it("usam apenas valores definidos no módulo de preços (nenhum preço antigo esquecido)", () => {
    const found = copy.flatMap((text) =>
      [...text.matchAll(/R\$\s?(\d{1,3}(?:\.\d{3})*)(?:,\d{2})?/g)].map((match) => ({
        value: Number(match[1].replace(/\./g, "")),
        text,
      })),
    );
    expect(found.length).toBeGreaterThan(0);
    for (const { value, text } of found) {
      expect(allowedPrices.has(value), `R$ ${value} não existe nos planos: "${text}"`).toBe(true);
    }
  });

  it("citam o preço certo de cada plano quando falam dele pelo nome", () => {
    for (const plan of commercialPlans) {
      const pattern = new RegExp(`plano ${plan.name}[^.]{0,80}?R\\$\\s?(\\d+)`, "gi");
      for (const text of copy) {
        for (const match of text.matchAll(pattern)) {
          expect(Number(match[1]), `"${match[0]}"`).toBe(plan.price);
        }
      }
    }
  });

  it("formata reais no padrão brasileiro", () => {
    expect(formatBRL(250).replace(/\s/g, " ")).toBe("R$ 250");
    expect(formatBRL(1000).replace(/\s/g, " ")).toBe("R$ 1.000");
  });
});

describe("Ligações entre conteúdos", () => {
  const serviceSlugs = new Set(services.map((service) => service.slug));
  const projectSlugs = new Set(projects.map((project) => project.slug));
  const planNames = new Set(allOffers.map((plan) => plan.name));

  it("cada serviço e segmento aponta para um plano que existe", () => {
    for (const item of [...services, ...niches]) {
      expect(planNames.has(item.planName), `${item.slug} → ${item.planName}`).toBe(true);
    }
  });

  it("cada projeto e segmento aponta para um serviço que existe", () => {
    for (const item of [...projects, ...niches]) {
      expect(serviceSlugs.has(item.serviceSlug), `${item.slug} → ${item.serviceSlug}`).toBe(true);
    }
  });

  it("cada segmento mostra um projeto real do portfólio", () => {
    for (const niche of niches) expect(projectSlugs.has(niche.projectSlug), niche.slug).toBe(true);
  });

  it("não repete endereços (slugs) entre páginas", () => {
    for (const list of [services, projects, niches]) {
      const slugs = list.map((item) => item.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("cada serviço tem o preço do seu plano nos dados estruturados", () => {
    for (const service of services) {
      expect(serviceSchema(service).offers).toMatchObject({
        price: getPlan(service.planName).price,
        priceCurrency: "BRL",
      });
    }
  });
});

describe("Dados da marca", () => {
  it("usa um número de WhatsApp brasileiro válido", () => {
    expect(site.whatsapp.number).toMatch(/^55\d{10,11}$/);
    const digits = site.whatsapp.display.replace(/\D/g, "");
    expect(site.whatsapp.number.endsWith(digits)).toBe(true);
  });

  it("tem o e-mail oficial válido, no llms.txt e nos dados estruturados", () => {
    expect(site.email).toBe("solidsolutionsdigital@gmail.com");
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(buildLlmsTxt()).toContain(site.email);
    const graph = pageGraph({ path: "/", title: "t", description: "d" });
    const organization = (graph["@graph"] as Record<string, unknown>[]).find(
      (node) => node["@id"] === `${site.url}/#organizacao`,
    )!;
    expect(organization.email).toBe(site.email);
    expect(JSON.stringify(organization.contactPoint)).toContain(site.email);
  });

  it("aponta para o domínio oficial com HTTPS", () => {
    expect(site.url).toMatch(/^https:\/\/[^/]+$/);
  });

  it("tem redes sociais com endereço HTTPS e @ do perfil", () => {
    expect(socialLinks.length).toBeGreaterThan(0);
    for (const social of socialLinks) {
      expect(social.url).toMatch(/^https:\/\//);
      expect(social.handle.startsWith("@")).toBe(true);
    }
  });

  it("tem um menu sem itens repetidos", () => {
    const hrefs = navigation.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs[0]).toBe("/");
  });

  it("não cita cidade nem estado nos textos (a marca atende o Brasil todo)", () => {
    expect(copy.join("\n")).not.toMatch(/Teresina|Piau[ií]\b/);
  });

  it("não deixa marcadores de rascunho no texto", () => {
    const text = copy.join("\n");
    expect(text).not.toMatch(/lorem ipsum|\bxxx\b/i);
    // Maiúsculas de propósito: "todo" em português ("todo o Brasil") é texto normal.
    expect(text).not.toMatch(/\bTODO\b|\bFIXME\b|\{\{|\}\}/);
  });

  it("tem perguntas e respostas preenchidas em todos os FAQs", () => {
    for (const item of [...faq, ...services.flatMap((s) => s.faq), ...niches.flatMap((n) => n.faq)]) {
      expect(item.question.trim().endsWith("?"), item.question).toBe(true);
      expect(item.answer.trim().length).toBeGreaterThan(20);
    }
  });
});
