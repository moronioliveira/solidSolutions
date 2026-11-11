import type { Metadata } from "next";
import { PlansSection } from "@/components/pricing";
import {
  CapabilityBand,
  ComparisonSection,
  ContactBand,
  DifferentialsSection,
  FaqSection,
  Hero,
  ProcessSection,
  ProjectsSection,
  ServicesSection,
} from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { faq } from "@/content/faq";
import { seo } from "@/content/seo";
import { pageGraph, pageMetadata } from "@/lib/seo";

const page = seo.pages.home;

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/",
  absoluteTitle: true,
});

/** Página inicial. Para mudar a ordem das seções, reordene os componentes abaixo. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/", title: page.title, description: page.description, faq })} />
      <Hero />
      <CapabilityBand />
      <ServicesSection />
      <ProjectsSection />
      <DifferentialsSection />
      <ComparisonSection />
      <PlansSection />
      <ProcessSection />
      <FaqSection items={faq} />
      <ContactBand />
    </>
  );
}
