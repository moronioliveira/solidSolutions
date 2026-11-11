import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "./section-heading";

export function ProjectsSection({ eyebrow = "02 / Projetos selecionados" }: { eyebrow?: string }) {
  return (
    <section className="section site-container" aria-labelledby="projects-title">
      <SectionHeading
        id="projects-title"
        eyebrow={eyebrow}
        title={
          <>
            Ideias que ganham
            <br />
            forma. E presença.
          </>
        }
        action={
          <Link href="/projetos" className="text-cta heading-link">
            Ver todos os projetos <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        }
      />
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
