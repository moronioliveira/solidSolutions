import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/actions/button";
import { SiteShell } from "@/components/layout";
import {
  CapabilityBand,
  ProjectsSection,
  SolutionsSection,
  ProcessSection,
  ContactBand,
} from "@/components/sections";
import hero from "@/assets/hero/solid-hero.jpg";
import { PlansSection } from "@/components/pricing";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Criação de sites e landing pages que convertem",
  "A Solid Solutions cria sites institucionais, landing pages e experiências digitais rápidas para empresas que querem crescer.",
  "/",
);

export default function HomePage() {
  return (
    <SiteShell>
      <section className="hero">
        <img
          className="hero-image"
          src={hero.src}
          alt="Escultura tecnológica em metal dourado com três formas conectadas"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        <div className="site-container hero-content">
          <span className="eyebrow">
            <i className="status-dot" /> SOLID SOLUTIONS / ESTÚDIO DIGITAL
          </span>
          <h1>
            <span className="hero-line">
              <span>Sites que conectam.</span>
            </span>
            <span className="hero-line">
              <span>Experiências que</span>
            </span>
            <span className="hero-line hero-line-accent">
              <span>convertem.</span>
            </span>
          </h1>
          <p className="hero-description">
            Unimos design, tecnologia e estratégia para transformar sua presença digital em novas
            oportunidades de negócio.
          </p>
          <div className="hero-actions">
            <Button asChild className="primary-cta">
              <Link href="/contato">
                Vamos criar seu projeto <ArrowUpRight />
              </Link>
            </Button>
            <Link href="/projetos" className="text-cta">
              Conheça nosso trabalho <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="site-container hero-bottom">
          <span>
            <ArrowDown size={13} /> EXPLORE O QUE PODEMOS CRIAR
          </span>
          <span>ESTRATÉGIA + DESIGN + CÓDIGO</span>
        </div>
      </section>
      <CapabilityBand />
      <ProjectsSection />
      <SolutionsSection />
      <PlansSection />
      <ProcessSection />
      <ContactBand />
    </SiteShell>
  );
}
