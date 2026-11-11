import type { Metadata } from "next";
import { PageIntro } from "@/components/layout";
import { PlansSection } from "@/components/pricing";
import {
  ComparisonSection,
  ContactBand,
  FaqSection,
  ProcessSection,
  ServicesSection,
} from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { faq } from "@/content/faq";
import { seo } from "@/content/seo";
import { services } from "@/content/services";
import { pageGraph, pageMetadata, serviceSchema, type Crumb } from "@/lib/seo";

const page = seo.pages.services;
const path = "/servicos";
const crumbs: Crumb[] = [
  { name: "Início", path: "/" },
  { name: "Serviços", path },
];

export const metadata: Metadata = pageMetadata({ ...page, path });

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          title: page.title,
          description: page.description,
          type: "CollectionPage",
          crumbs,
          faq,
          extra: services.map(serviceSchema),
        })}
      />
      <PageIntro
        crumbs={crumbs}
        label="Serviços / Design + tecnologia + SEO"
        title="Criação de sites, landing pages e campanhas no Google"
        description="Do site que apresenta sua empresa à página que impulsiona uma campanha. Construímos a solução certa para o seu objetivo, com preço publicado e SEO incluso."
      />
      <ServicesSection eyebrow="01 / Serviços" />
      <ComparisonSection eyebrow="02 / Compare antes de decidir" />
      <PlansSection eyebrow="03 / Planos e preços" />
      <ProcessSection eyebrow="04 / Como trabalhamos" />
      <FaqSection items={faq} eyebrow="05 / Perguntas frequentes" />
      <ContactBand location="servicos-final" />
    </>
  );
}
