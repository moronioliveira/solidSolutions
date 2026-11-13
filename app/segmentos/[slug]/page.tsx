import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/layout";
import {
  ContactBand,
  FaqSection,
  ProcessSection,
  ProjectCard,
  SectionHeading,
} from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { getNiche, niches } from "@/content/niches";
import { getProject } from "@/content/projects";
import { getService } from "@/content/services";
import { formatBRL, getPlan } from "@/lib/pricing/commercial";
import { nicheSchema, pageGraph, pageMetadata, type Crumb } from "@/lib/seo";

interface NichePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return niches.map((niche) => ({ slug: niche.slug }));
}

export async function generateMetadata({ params }: NichePageProps): Promise<Metadata> {
  const niche = getNiche((await params).slug);
  if (!niche) return {};
  return pageMetadata({
    title: niche.seoTitle,
    description: niche.seoDescription,
    path: `/segmentos/${niche.slug}`,
  });
}

export default async function NichePage({ params }: NichePageProps) {
  const niche = getNiche((await params).slug);
  if (!niche) notFound();

  const path = `/segmentos/${niche.slug}`;
  const plan = getPlan(niche.planName);
  const project = getProject(niche.projectSlug);
  const service = getService(niche.serviceSlug);
  const others = niches.filter((item) => item.slug !== niche.slug);
  const crumbs: Crumb[] = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: niche.name, path },
  ];

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          title: niche.seoTitle,
          description: niche.seoDescription,
          crumbs,
          faq: niche.faq,
          extra: [nicheSchema(niche)],
        })}
      />
      <PageIntro
        crumbs={crumbs}
        label={`Segmento / ${niche.name}`}
        title={niche.headline}
        description={niche.summary}
      >
        <div className="intro-actions">
          <WhatsAppLink
            location={`segmento-${niche.slug}-topo`}
            message={niche.whatsappMessage}
            className="btn btn-primary btn-lg"
          >
            Pedir orçamento no WhatsApp <ArrowUpRight aria-hidden="true" />
          </WhatsAppLink>
          <span className="intro-price">
            A partir de <strong>{formatBRL(plan.price)}</strong> (pagamento único)
          </span>
        </div>
      </PageIntro>

      <section className="section site-container service-overview" aria-labelledby="niche-why">
        <div className="service-overview-text" data-reveal>
          <h2 id="niche-why">Por que ter uma página própria</h2>
          {niche.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <aside className="service-ideal" data-reveal aria-labelledby="niche-care-title">
          <h3 id="niche-care-title">
            <ShieldCheck size={18} aria-hidden="true" /> {niche.care.title}
          </h3>
          <p>{niche.care.text}</p>
        </aside>
      </section>

      <section className="solutions-section" aria-labelledby="niche-essentials">
        <div className="section site-container service-deliverables">
          <SectionHeading
            id="niche-essentials"
            eyebrow={`Feito para ${niche.name.toLowerCase()}`}
            title="O que a sua página precisa ter"
            description={`Tudo isso entra no plano ${plan.name}: ${formatBRL(plan.price)} de pagamento único. Manutenção mensal é opcional e cobrada à parte.`}
          />
          <div className="benefits-grid">
            {niche.essentials.map((item) => (
              <article key={item.title} className="differential" data-reveal>
                <h3>
                  <Check size={18} aria-hidden="true" /> {item.title}
                </h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <Link href="/servicos#planos" className="text-cta">
            Comparar planos e preços <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {project && (
        <section className="section site-container" aria-labelledby="niche-project">
          <SectionHeading
            id="niche-project"
            eyebrow="Projeto real"
            title={`Exemplo para ${niche.name.toLowerCase()}`}
            description={project.solution}
            action={
              <Link href="/projetos" className="text-cta heading-link">
                Ver portfólio completo <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            }
          />
          <div className="projects-grid">
            <ProjectCard project={project} />
          </div>
        </section>
      )}

      <ProcessSection eyebrow="Como trabalhamos" />
      <FaqSection
        items={niche.faq}
        eyebrow="Perguntas frequentes"
        title={`Dúvidas de ${niche.name.toLowerCase()}`}
      />

      <section className="section site-container" aria-labelledby="niche-related">
        <SectionHeading
          id="niche-related"
          eyebrow="Veja também"
          title="Outros segmentos e serviços"
        />
        <ul className="related-links">
          {service && (
            <li>
              <Link href={`/servicos/${service.slug}`}>
                <span>{service.headline}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          )}
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/segmentos/${item.slug}`}>
                <span>{item.linkLabel}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactBand location={`segmento-${niche.slug}-final`} message={niche.whatsappMessage} />
    </>
  );
}
