import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, pageHead } from "@/components/site-shell";
import { CapabilityBand, ProjectsSection, SolutionsSection, ProcessSection, ContactBand } from "@/components/portfolio-sections";
import hero from "@/assets/solid-hero.jpg";
import { PlansSection } from "@/components/plans-section";
export const Route = createFileRoute("/")({
  component: Index,
  head: () => pageHead("Sites e landing pages que conectam e convertem", "Solid Solutions: design, desenvolvimento e estratégia para criar sites e landing pages profissionais, rápidos e orientados ao seu negócio.", "/"),
});
function Index() {
   return <SiteShell><section className="hero"><img className="hero-image" src={hero} alt="Escultura tecnológica em metal dourado com três formas conectadas" width={1920} height={1088} fetchPriority="high" /><div className="site-container hero-content"><span className="eyebrow"><i className="status-dot" /> SOLID SOLUTIONS / ESTÚDIO DIGITAL</span><h1><span className="hero-line"><span>Sites que conectam.</span></span><span className="hero-line"><span>Experiências que</span></span><span className="hero-line hero-line-accent"><span>convertem.</span></span></h1><p className="hero-description">Unimos design, tecnologia e estratégia para transformar sua presença digital em novas oportunidades de negócio.</p><div className="hero-actions"><Button asChild className="primary-cta"><Link to="/contato">Vamos criar seu projeto <ArrowUpRight /></Link></Button><Link to="/projetos" className="text-cta">Conheça nosso trabalho <ArrowUpRight size={16} /></Link></div></div><div className="site-container hero-bottom"><span><ArrowDown size={13} /> EXPLORE O QUE PODEMOS CRIAR</span><span>ESTRATÉGIA + DESIGN + CÓDIGO</span></div></section><CapabilityBand /><ProjectsSection /><SolutionsSection /><PlansSection /><ProcessSection /><ContactBand /></SiteShell>;
}
