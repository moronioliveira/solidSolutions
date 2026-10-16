import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageIntro, pageHead } from "@/components/site-shell";
import { SolutionsSection, ProcessSection, ContactBand } from "@/components/portfolio-sections";
import { PlansSection } from "@/components/plans-section";
export const Route = createFileRoute("/servicos")({ head: () => pageHead("Soluções e planos para seu negócio", "Compare os planos Essencial e Performance da Solid Solutions: landing pages, SEO local e Google Ads, com preços claros e gestão opcional de anúncios.", "/servicos"), component: Services });
function Services() { return <SiteShell><PageIntro label="SOLUÇÕES / DESIGN + TECNOLOGIA" title="Sua ambição. Nossa próxima criação." description="Do site que apresenta sua empresa à página que impulsiona uma campanha. Construímos a solução certa para o seu objetivo." /><PlansSection /><SolutionsSection /><ProcessSection /><ContactBand /></SiteShell>; }