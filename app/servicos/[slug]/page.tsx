import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageIntro } from "@/components/layout";
import {
  ContactBand,
  FaqSection,
  ProcessSection,
  ProjectCard,
  SectionHeading,
  serviceIcons,
} from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { projects } from "@/content/projects";
import { getService, services } from "@/content/services";
import { formatBRL, getPlan } from "@/lib/pricing/commercial";
import { pageGraph, pageMetadata, serviceSchema, type Crumb } from "@/lib/seo";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/servicos/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const path = `/servicos/${service.slug}`;
  const plan = getPlan(service.planName);
  const Icon = serviceIcons[service.icon];
  const related = projects.filter((project) => project.serviceSlug === service.slug).slice(0, 2);
  const others = services.filter((item) => item.slug !== service.slug);
  const crumbs: Crumb[] = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: service.name, path },
  ];

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          title: service.seoTitle,
          description: service.seoDescription,
          crumbs,
          faq: service.faq,
          extra: [serviceSchema(service)],
        })}
      />
      <PageIntro
        crumbs={crumbs}
        label={`Serviço / ${service.name}`}
        title={service.headline}
        description={service.summary}
      >
        <div className="intro-actions">
          <WhatsAppLink
            location={`servico-${service.slug}-topo`}
            message={service.whatsappMessage}
            className="btn btn-primary btn-lg"
          >
            Pedir orçamento no WhatsApp <ArrowUpRight aria-hidden="true" />
          </WhatsAppLink>
          <span className="intro-price">
            A partir de <strong>{formatBRL(plan.price)}</strong> + {formatBRL(plan.monthly)}/mês
          </span>
        </div>
      </PageIntro>

      <section className="section site-container service-overview" aria-labelledby="service-what">
        <div className="service-overview-text" data-reveal>
          <Icon aria-hidden="true" className="service-icon" />
          <h2 id="service-what">O que é e para que serve</h2>
          <p>{service.intro}</p>
        </div>
        <aside className="service-ideal" data-reveal aria-labelledby="service-ideal-title">
          <h3 id="service-ideal-title">Ideal para</h3>
          <ul>
            {service.idealFor.map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="solutions-section" aria-labelledby="service-deliverables">
        <div className="section site-container service-deliverables">
          <SectionHeading
            id="service-deliverables"
            eyebrow="O que está incluído"
            title="Tudo o que você recebe"
            description={`Incluído no plano ${plan.name}: ${formatBRL(plan.price)} de pagamento único e ${formatBRL(plan.monthly)}/mês de hospedagem, manutenção e suporte.`}
          />
          <ul className="deliverables-list">
            {service.deliverables.map((item) => (
              <li key={item} data-reveal>
                <Check aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
          <div className="benefits-grid">
            {service.benefits.map((benefit) => (
              <article key={benefit.title} className="differential" data-reveal>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
          <Link href="/servicos#planos" className="text-cta">
            Comparar planos e preços <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section site-container" aria-labelledby="service-projects">
          <SectionHeading
            id="service-projects"
            eyebrow="Projetos"
            title="Exemplos deste serviço"
            action={
              <Link href="/projetos" className="text-cta heading-link">
                Ver portfólio completo <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            }
          />
          <div className="projects-grid">
            {related.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      <ProcessSection eyebrow="Como trabalhamos" />
      <FaqSection
        items={service.faq}
        eyebrow="Perguntas frequentes"
        title={`Dúvidas sobre ${service.name.toLowerCase()}`}
      />

      <section className="section site-container" aria-labelledby="other-services">
        <SectionHeading id="other-services" eyebrow="Veja também" title="Outros serviços" />
        <ul className="related-links">
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/servicos/${item.slug}`}>
                <span>{item.headline}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactBand location={`servico-${service.slug}-final`} message={service.whatsappMessage} />
    </>
  );
}
