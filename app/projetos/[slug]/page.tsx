import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageIntro } from "@/components/layout";
import { ContactBand, ProjectCard, SectionHeading } from "@/components/sections";
import { niches } from "@/content/niches";
import { JsonLd } from "@/components/seo/json-ld";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { pageGraph, pageMetadata, projectSchema, type Crumb } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function describe(project: NonNullable<ReturnType<typeof getProject>>) {
  return {
    title: `${project.name}: ${project.category.toLowerCase()}`,
    description: `${project.summary} Projeto da Solid Solutions.`,
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({ ...describe(project), path: `/projetos/${project.slug}`, type: "article" });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const path = `/projetos/${project.slug}`;
  const { title, description } = describe(project);
  const service = getService(project.serviceSlug);
  const niche = niches.find((item) => item.projectSlug === project.slug);
  const others = projects.filter((item) => item.slug !== project.slug).slice(0, 2);
  const crumbs: Crumb[] = [
    { name: "Início", path: "/" },
    { name: "Projetos", path: "/projetos" },
    { name: project.name, path },
  ];

  return (
    <>
      <JsonLd
        data={pageGraph({ path, title, description, crumbs, extra: [projectSchema(project)] })}
      />
      <PageIntro
        crumbs={crumbs}
        label={`${project.category} / ${project.segment}`}
        title={project.name}
        description={project.summary}
      >
        {project.liveUrl && (
          <div className="intro-actions">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-lg"
            >
              Ver o site publicado <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        )}
      </PageIntro>

      <section className="section section-tight site-container" aria-label="Prévia do projeto">
        <figure className="case-figure" data-reveal>
          <Image
            src={project.image}
            alt={project.imageAlt}
            sizes="(max-width: 1280px) 100vw, 1280px"
            placeholder="blur"
            priority
          />
          <figcaption>{project.imageAlt}</figcaption>
        </figure>
      </section>

      <section className="section site-container case-body" aria-label="Estudo de caso">
        <dl className="case-facts" data-reveal>
          <div>
            <dt>Tipo</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Segmento</dt>
            <dd>{project.segment}</dd>
          </div>
          <div>
            <dt>Foco</dt>
            <dd>{project.focus}</dd>
          </div>
          {service && (
            <div>
              <dt>Serviço</dt>
              <dd>
                <Link href={`/servicos/${service.slug}`}>{service.headline}</Link>
              </dd>
            </div>
          )}
        </dl>
        <div className="case-text">
          <div data-reveal>
            <h2>O desafio</h2>
            <p>{project.challenge}</p>
          </div>
          <div data-reveal>
            <h2>A solução</h2>
            <p>{project.solution}</p>
          </div>
          <div data-reveal>
            <h2>Destaques</h2>
            <ul className="case-highlights">
              {project.highlights.map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>
          {niche && (
            <div data-reveal>
              <h2>Quer algo assim?</h2>
              <p>
                Veja como funciona o nosso{" "}
                <Link href={`/segmentos/${niche.slug}`}>{niche.linkLabel.toLowerCase()}</Link>, com
                o que a página precisa ter, cuidados do segmento e preços.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section site-container" aria-labelledby="more-projects">
        <SectionHeading
          id="more-projects"
          eyebrow="Portfólio"
          title="Outros projetos"
          action={
            <Link href="/projetos" className="text-cta heading-link">
              Ver todos <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          }
        />
        <div className="projects-grid">
          {others.map((item) => (
            <ProjectCard key={item.slug} project={item} />
          ))}
        </div>
      </section>

      <ContactBand
        location={`projeto-${project.slug}`}
        message={`Olá! Vi o projeto ${project.name} no site da Solid Solutions e quero algo parecido para o meu negócio.`}
      />
    </>
  );
}
