import { describe, expect, it } from "vitest";
import robots from "../../../app/robots";
import sitemap from "../../../app/sitemap";
import { faq } from "@/content/faq";
import { projects } from "@/content/projects";
import { seo } from "@/content/seo";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { buildLlmsTxt } from "@/lib/seo/llms";
import { pageGraph, pageMetadata, serviceSchema } from "@/lib/seo";

type Node = Record<string, unknown>;
const graphOf = (data: ReturnType<typeof pageGraph>) => data["@graph"] as Node[];
const typesOf = (graph: Node[]) => graph.flatMap((node) => [node["@type"]].flat());

describe("SEO content", () => {
  it("keeps page titles and descriptions within search snippet limits", () => {
    for (const page of Object.values(seo.pages)) {
      expect(page.title.length).toBeLessThanOrEqual(65);
      expect(page.description.length).toBeLessThanOrEqual(160);
    }
    const suffix = " | Solid Solutions".length;
    for (const service of services) {
      expect(service.seoTitle.length + suffix).toBeLessThanOrEqual(65);
      expect(service.seoDescription.length).toBeLessThanOrEqual(160);
    }
  });

  it("uses unique slugs for services and projects", () => {
    const slugs = [...services, ...projects].map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("Structured data", () => {
  it("describes the organization, website, offers and FAQ on the home page", () => {
    const graph = graphOf(pageGraph({ path: "/", title: "t", description: "d", faq }));
    const types = typesOf(graph);
    for (const type of ["Organization", "OnlineBusiness", "WebSite", "WebPage", "OfferCatalog", "FAQPage"]) {
      expect(types).toContain(type);
    }
    const organization = graph.find((node) => node["@id"] === `${site.url}/#organizacao`)!;
    expect(organization.telephone).toBe(`+${site.whatsapp.number}`);
    expect(organization.areaServed).toEqual({ "@type": "Country", name: "Brasil" });
    expect(organization.address).toBeUndefined();
  });

  it("never mentions a city or state in public content", () => {
    const text = JSON.stringify(pageGraph({ path: "/", title: "t", description: "d", faq })) + buildLlmsTxt() + JSON.stringify(seo);
    expect(text).not.toMatch(/Teresina|Piau[ií]/i);
  });

  it("adds breadcrumbs that point to absolute URLs", () => {
    const graph = graphOf(
      pageGraph({
        path: "/servicos",
        title: "t",
        description: "d",
        crumbs: [
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ],
      }),
    );
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList")!;
    expect(breadcrumb.itemListElement).toEqual([
      expect.objectContaining({ position: 1, item: site.url }),
      expect.objectContaining({ position: 2, item: `${site.url}/servicos` }),
    ]);
  });

  it("prices each service with its plan", () => {
    const schema = serviceSchema(services.find((item) => item.slug === "google-ads")!);
    expect(schema.offers).toMatchObject({ price: 550, priceCurrency: "BRL" });
  });
});

describe("Crawling files", () => {
  it("lists every public page in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(site.url);
    for (const service of services) expect(urls).toContain(`${site.url}/servicos/${service.slug}`);
    for (const project of projects) expect(urls).toContain(`${site.url}/projetos/${project.slug}`);
  });

  it("allows search engines and AI crawlers", () => {
    const rules = [robots().rules].flat();
    expect(rules[0]).toMatchObject({ userAgent: "*", allow: "/" });
    expect(JSON.stringify(rules)).toContain("GPTBot");
    expect(robots().sitemap).toBe(`${site.url}/sitemap.xml`);
  });

  it("summarizes prices, services and contact in llms.txt", () => {
    const text = buildLlmsTxt();
    expect(text).toContain("# Solid Solutions");
    expect(text).toContain("R$ 250");
    expect(text).toContain(site.whatsapp.display);
    for (const service of services) expect(text).toContain(service.headline);
  });

  it("sets a relative canonical resolved against metadataBase", () => {
    const metadata = pageMetadata({ title: "Contato", description: "d", path: "/contato" });
    expect(metadata.alternates?.canonical).toBe("/contato");
  });
});
