import type { FaqItem } from "@/content/faq";
import type { Niche } from "@/content/niches";
import type { Project } from "@/content/projects";
import { seo } from "@/content/seo";
import type { Service } from "@/content/services";
import { absoluteUrl, site, socialLinks } from "@/content/site";
import { adManagement, commercialPlans, getPlan } from "@/lib/pricing/commercial";

/**
 * Dados estruturados (schema.org) do site.
 * Ajudam Google e assistentes de IA (GEO) a entender quem é a Solid Solutions,
 * o que ela vende, por quanto, onde atende e quais perguntas cada página responde.
 * Todas as entidades usam @id estável para se conectarem entre páginas.
 */
export const schemaIds = {
  organization: `${site.url}/#organizacao`,
  website: `${site.url}/#website`,
  catalog: `${site.url}/#catalogo`,
};

export interface Crumb {
  name: string;
  path: string;
}

const priceRange = `R$ ${commercialPlans[0].price} – R$ ${commercialPlans[commercialPlans.length - 1].price}`;

function organization() {
  return {
    // Organization + OnlineBusiness: empresa 100% online, sem endereço físico ou região.
    "@type": ["Organization", "OnlineBusiness"],
    "@id": schemaIds.organization,
    name: site.name,
    // "Solid Solutions Digital" casa com o domínio e diferencia a marca de outras "Solid Solutions".
    alternateName: ["Solid Solutions Digital", "Solid Solutions Estúdio Digital"],
    slogan: site.tagline,
    description: site.shortDescription,
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl(site.logo), width: 1672, height: 941 },
    image: absoluteUrl(site.ogImage),
    telephone: `+${site.whatsapp.number}`,
    ...(site.email ? { email: site.email } : {}),
    priceRange,
    currenciesAccepted: "BRL",
    areaServed: { "@type": "Country", name: site.serviceArea },
    knowsAbout: [
      "Criação de sites",
      "Landing pages",
      "Sites institucionais",
      "Desenvolvimento web",
      "SEO",
      "Generative Engine Optimization (GEO)",
      "Google Ads",
      "Next.js",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${site.whatsapp.number}`,
      url: `https://wa.me/${site.whatsapp.number}`,
      availableLanguage: "pt-BR",
      areaServed: "BR",
    },
    hasOfferCatalog: { "@id": schemaIds.catalog },
    ...(socialLinks.length ? { sameAs: socialLinks.map((link) => link.url) } : {}),
  };
}

function offerCatalog() {
  return {
    "@type": "OfferCatalog",
    "@id": schemaIds.catalog,
    name: "Planos Solid Solutions",
    itemListElement: [
      ...commercialPlans.map((plan) => ({
        "@type": "Offer",
        name: `Plano ${plan.name}`,
        description: plan.audience,
        price: plan.price,
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/servicos#planos"),
        itemOffered: {
          "@type": "Service",
          name: `Plano ${plan.name}: ${plan.purpose}`,
          provider: { "@id": schemaIds.organization },
        },
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: plan.price, priceCurrency: "BRL" },
          {
            "@type": "UnitPriceSpecification",
            price: plan.monthly,
            priceCurrency: "BRL",
            name: "Manutenção mensal",
            unitCode: "MON",
          },
        ],
      })),
      {
        "@type": "Offer",
        name: "Gestão mensal de Google Ads",
        price: adManagement.monthly,
        priceCurrency: "BRL",
        url: absoluteUrl("/servicos/google-ads"),
        itemOffered: {
          "@type": "Service",
          name: "Gestão contínua de campanhas no Google Ads",
          provider: { "@id": schemaIds.organization },
        },
      },
    ],
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: site.url,
    name: site.name,
    alternateName: "Solid Solutions Digital",
    description: site.shortDescription,
    inLanguage: "pt-BR",
    publisher: { "@id": schemaIds.organization },
  };
}

function breadcrumb(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(crumbs[crumbs.length - 1].path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqPage(items: FaqItem[], path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#perguntas-frequentes`,
    inLanguage: "pt-BR",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

interface PageGraphInput {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  crumbs?: Crumb[];
  faq?: FaqItem[];
  extra?: Record<string, unknown>[];
}

/** Monta o grafo JSON-LD completo de uma página. */
export function pageGraph({
  path,
  title,
  description,
  type = "WebPage",
  crumbs,
  faq,
  extra = [],
}: PageGraphInput) {
  const url = absoluteUrl(path);
  const isHome = path === "/";
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      ...(isHome ? [website(), offerCatalog()] : [offerCatalog()]),
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": schemaIds.website },
        about: { "@id": schemaIds.organization },
        publisher: { "@id": schemaIds.organization },
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(site.ogImage) },
        dateModified: seo.lastUpdated,
        ...(crumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
        ...(faq ? { mainEntity: { "@id": `${url}#perguntas-frequentes` } } : {}),
      },
      ...(isHome ? [] : [website()]),
      ...(crumbs ? [breadcrumb(crumbs)] : []),
      ...(faq ? [faqPage(faq, path)] : []),
      ...extra,
    ],
  };
}

export function serviceSchema(service: Service) {
  const plan = getPlan(service.planName);
  const url = absoluteUrl(`/servicos/${service.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#servico`,
    name: service.headline,
    serviceType: service.name,
    description: service.intro,
    url,
    provider: { "@id": schemaIds.organization },
    areaServed: { "@type": "Country", name: site.serviceArea },
    audience: { "@type": "BusinessAudience", audienceType: service.idealFor.join("; ") },
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url,
      description: `Plano ${plan.name}: ${plan.purpose}. Manutenção de R$ ${plan.monthly}/mês.`,
    },
  };
}

export function projectSchema(project: Project) {
  const url = absoluteUrl(`/projetos/${project.slug}`);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#projeto`,
    name: project.name,
    genre: project.category,
    about: project.segment,
    description: project.summary,
    url,
    image: absoluteUrl(project.image.src),
    inLanguage: "pt-BR",
    creator: { "@id": schemaIds.organization },
  };
}

export function nicheSchema(niche: Niche) {
  const plan = getPlan(niche.planName);
  const url = absoluteUrl(`/segmentos/${niche.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#servico`,
    name: niche.headline,
    serviceType: "Criação de sites e landing pages",
    description: niche.summary,
    url,
    provider: { "@id": schemaIds.organization },
    areaServed: { "@type": "Country", name: site.serviceArea },
    audience: { "@type": "BusinessAudience", audienceType: niche.name },
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url,
      description: `Plano ${plan.name}: ${plan.purpose}. Manutenção de R$ ${plan.monthly}/mês.`,
    },
  };
}
