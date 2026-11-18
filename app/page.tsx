import type { Metadata } from "next";
import { PlansSection } from "@/components/pricing";
import {
  CapabilityBand,
  ComparisonSection,
  ContactBand,
  FaqSection,
  Hero,
  InlineCta,
  ProcessSection,
  ProjectsSection,
  ReportSection,
  ServicesSection,
} from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { faq } from "@/content/faq";
import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { pageGraph, pageMetadata } from "@/lib/seo";

const page = seo.pages.home;

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/",
  absoluteTitle: true,
});

/**
 * Página inicial, na ordem em que o visitante decide: promessa, o que fazemos, prova de resultado,
 * prova de trabalho, comparação, preço, como funciona, dúvidas e chamada final.
 * Regra de conversão (testada em src/tests/integration/conversion.test.tsx): nunca mais de duas
 * seções seguidas sem um botão de WhatsApp. Para mudar a ordem, reordene os componentes abaixo.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/", title: page.title, description: page.description, faq })} />
      <Hero />
      <CapabilityBand />
      <ServicesSection />
      <ReportSection />
      <ProjectsSection eyebrow="03 / Projetos selecionados" />
      <InlineCta
        location="home-apos-projetos"
        title="Gostou do que viu? O próximo projeto pode ser o seu."
        label="Quero um projeto assim"
        message="Olá! Vi os projetos da Solid Solutions e quero um projeto assim para o meu negócio."
      />
      <ComparisonSection />
      <InlineCta
        location="home-apos-comparacao"
        title="Convencido? A proposta é grátis e sem compromisso."
        label={site.ctaLabel}
        message={site.whatsapp.defaultMessage}
      />
      <PlansSection variant="summary" />
      <ProcessSection />
      <FaqSection items={faq} />
      <ContactBand />
    </>
  );
}
