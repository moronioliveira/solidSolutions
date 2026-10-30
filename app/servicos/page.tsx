import { SiteShell, PageIntro } from "@/components/layout";
import { SolutionsSection, ProcessSection, ContactBand } from "@/components/sections";
import { PlansSection } from "@/components/pricing";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Serviços de criação de sites e desenvolvimento web",
  "Sites institucionais, landing pages e desenvolvimento web sob medida para transformar objetivos de negócio em resultados.",
  "/servicos",
);

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageIntro
        label="SOLUÇÕES / DESIGN + TECNOLOGIA"
        title="Sua ambição. Nossa próxima criação."
        description="Do site que apresenta sua empresa à página que impulsiona uma campanha. Construímos a solução certa para o seu objetivo."
      />
      <PlansSection />
      <SolutionsSection />
      <ProcessSection />
      <ContactBand />
    </SiteShell>
  );
}
