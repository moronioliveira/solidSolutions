import type { ReactElement } from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HomePage from "../../../app/page";
import ServicesPage from "../../../app/servicos/page";
import ServicePage, {
  generateMetadata as serviceMetadata,
  generateStaticParams as serviceParams,
} from "../../../app/servicos/[slug]/page";
import ProjectsPage from "../../../app/projetos/page";
import ProjectPage, {
  generateMetadata as projectMetadata,
  generateStaticParams as projectParams,
} from "../../../app/projetos/[slug]/page";
import NichePage, {
  generateMetadata as nicheMetadata,
  generateStaticParams as nicheParams,
} from "../../../app/segmentos/[slug]/page";
import AboutPage from "../../../app/sobre/page";
import ContactPage from "../../../app/contato/page";
import PrivacyPage from "../../../app/politica-de-privacidade/page";
import NotFound from "../../../app/not-found";
import sitemap from "../../../app/sitemap";
import { NOT_FOUND_ERROR } from "@/tests/stubs/next-navigation";
import { site } from "@/content/site";

type SlugPage = (props: { params: Promise<{ slug: string }> }) => Promise<ReactElement> | ReactElement;

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

/** Todas as rotas públicas, com o componente que as desenha. */
const routes: {
  path: string;
  page: () => Promise<ReactElement> | ReactElement;
  /** false: página sem botão de WhatsApp no conteúdo (o cabeçalho e o rodapé já têm). */
  cta?: boolean;
}[] = [
  { path: "/", page: () => <HomePage /> },
  { path: "/servicos", page: () => <ServicesPage /> },
  { path: "/projetos", page: () => <ProjectsPage /> },
  { path: "/sobre", page: () => <AboutPage /> },
  { path: "/contato", page: () => <ContactPage /> },
  { path: "/politica-de-privacidade", page: () => <PrivacyPage />, cta: false },
  ...serviceParams().map(({ slug }) => ({
    path: `/servicos/${slug}`,
    page: () => (ServicePage as SlugPage)(params(slug)),
  })),
  ...projectParams().map(({ slug }) => ({
    path: `/projetos/${slug}`,
    page: () => (ProjectPage as SlugPage)(params(slug)),
  })),
  ...nicheParams().map(({ slug }) => ({
    path: `/segmentos/${slug}`,
    page: () => (NichePage as SlugPage)(params(slug)),
  })),
];

const knownPaths = new Set(routes.map((route) => route.path));

async function renderRoute(page: () => Promise<ReactElement> | ReactElement) {
  // Páginas com [slug] são componentes assíncronos de servidor: resolvemos antes de desenhar.
  const element = await page();
  return render(element);
}

afterEach(cleanup);

describe("Rotas públicas", () => {
  it("cobre todas as páginas do sitemap", () => {
    const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname.replace(/(.)\/$/, "$1"));
    expect([...knownPaths].sort()).toEqual([...new Set(sitemapPaths)].sort());
  });
});

describe.each(routes.map((route) => route.path))("Página %s", (path) => {
  const route = routes.find((item) => item.path === path)!;

  it("é renderizada sem erros e com um único h1", async () => {
    const { container } = await renderRoute(route.page);
    const headings = container.querySelectorAll("h1");
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent?.trim()).not.toBe("");
  });

  it("não mostra valores quebrados no texto", async () => {
    const { container } = await renderRoute(route.page);
    const visible = container.cloneNode(true) as HTMLElement;
    visible.querySelectorAll("script").forEach((script) => script.remove());
    const text = visible.textContent ?? "";
    expect(text).not.toMatch(/\bundefined\b|\bNaN\b|\[object Object\]|R\$\s*NaN|\{\{|\}\}/);
  });

  it("tem links internos que apontam para páginas que existem", async () => {
    const { container } = await renderRoute(route.page);
    const anchors = [...container.querySelectorAll<HTMLAnchorElement>("a")];
    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of anchors) {
      const href = anchor.getAttribute("href");
      expect(href, `link sem href: "${anchor.textContent}"`).toBeTruthy();
      if (!href!.startsWith("/")) continue;
      const url = new URL(href!, site.url);
      const target = url.pathname.replace(/(.)\/$/, "$1");
      expect(knownPaths.has(target), `link quebrado em ${path}: ${href}`).toBe(true);
      // Âncoras na mesma página (ex.: /#planos) precisam existir na página de destino.
      if (url.hash && target === path) {
        expect(container.querySelector(url.hash), `âncora inexistente: ${href}`).not.toBeNull();
      }
    }
  });

  it("abre links externos com segurança", async () => {
    const { container } = await renderRoute(route.page);
    for (const anchor of container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')) {
      expect(anchor.getAttribute("href")).toMatch(/^https:\/\//);
      if (anchor.target === "_blank") expect(anchor.rel).toContain("noopener");
    }
  });

  it("tem botões de WhatsApp com número, mensagem e local de rastreamento", async () => {
    const { container } = await renderRoute(route.page);
    const ctas = [...container.querySelectorAll<HTMLAnchorElement>('[data-cta="whatsapp"]')];
    if (route.cta !== false) {
      expect(ctas.length, "toda página precisa de ao menos um botão de WhatsApp").toBeGreaterThan(0);
    }
    for (const cta of ctas) {
      const url = new URL(cta.href);
      expect(url.origin).toBe("https://wa.me");
      expect(url.pathname).toBe(`/${site.whatsapp.number}`);
      expect(url.searchParams.get("text")?.trim()).toBeTruthy();
      expect(cta.dataset.ctaLocation?.trim()).toBeTruthy();
      expect(cta.textContent?.trim() || cta.getAttribute("aria-label")).toBeTruthy();
    }
  });

  it("descreve todas as imagens (alt) e não tem imagem sem endereço", async () => {
    const { container } = await renderRoute(route.page);
    for (const image of container.querySelectorAll("img")) {
      expect(image.hasAttribute("alt")).toBe(true);
      expect(image.getAttribute("src")).toBeTruthy();
    }
  });

  it("tem dados estruturados (JSON-LD) válidos e seguros", async () => {
    const { container } = await renderRoute(route.page);
    const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')];
    expect(scripts).toHaveLength(1);
    const raw = scripts[0].innerHTML;
    // "<" escapado impede que um texto feche a tag <script> e quebre a página.
    expect(raw).not.toContain("<");
    const data = JSON.parse(raw);
    expect(data["@context"]).toBe("https://schema.org");
    expect(Array.isArray(data["@graph"])).toBe(true);
    expect(raw).not.toMatch(/undefined|NaN/);
  });

  it("não repete ids na página (âncoras e acessibilidade dependem disso)", async () => {
    const { container } = await renderRoute(route.page);
    const ids = [...container.querySelectorAll("[id]")].map((element) => element.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("liga cada aria-labelledby a um elemento existente", async () => {
    const { container } = await renderRoute(route.page);
    for (const element of container.querySelectorAll("[aria-labelledby]")) {
      for (const id of element.getAttribute("aria-labelledby")!.split(/\s+/)) {
        expect(container.querySelector(`#${CSS.escape(id)}`), `aria-labelledby="${id}"`).not.toBeNull();
      }
    }
  });
});

describe("Metadados das páginas dinâmicas", () => {
  const dynamic = [
    { base: "/servicos", slugs: serviceParams(), metadata: serviceMetadata },
    { base: "/projetos", slugs: projectParams(), metadata: projectMetadata },
    { base: "/segmentos", slugs: nicheParams(), metadata: nicheMetadata },
  ];

  it("gera título, descrição e canonical próprios para cada página", async () => {
    const titles = new Set<string>();
    for (const { base, slugs, metadata } of dynamic) {
      expect(slugs.length).toBeGreaterThan(0);
      for (const { slug } of slugs) {
        const meta = await metadata(params(slug));
        const title = typeof meta.title === "string" ? meta.title : JSON.stringify(meta.title);
        expect(title, `${base}/${slug}`).toBeTruthy();
        expect(meta.description, `${base}/${slug}`).toBeTruthy();
        expect(meta.alternates?.canonical).toBe(`${base}/${slug}`);
        expect(titles.has(title), `título repetido: ${title}`).toBe(false);
        titles.add(title);
      }
    }
  });

  it("devolve 404 para endereços que não existem", async () => {
    for (const page of [ServicePage, ProjectPage, NichePage] as SlugPage[]) {
      await expect(Promise.resolve().then(() => page(params("nao-existe")))).rejects.toThrow(NOT_FOUND_ERROR);
    }
    for (const metadata of [serviceMetadata, projectMetadata, nicheMetadata]) {
      expect(await metadata(params("nao-existe"))).toEqual({});
    }
  });
});

describe("Página 404", () => {
  it("oferece caminhos de volta que existem", () => {
    const { container } = render(<NotFound />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    const links = [...container.querySelectorAll<HTMLAnchorElement>("a")];
    expect(links.length).toBeGreaterThan(1);
    for (const link of links) expect(knownPaths.has(link.getAttribute("href")!)).toBe(true);
  });
});
