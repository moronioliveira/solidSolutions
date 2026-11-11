import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

/** Card do portfólio com moldura de navegador. Leva ao estudo de caso do projeto. */
export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  // Endereço ilustrativo na moldura; o link real fica só na página do projeto.
  const host = `${project.slug}.com.br`;
  return (
    <article className="project" data-reveal>
      <Link href={`/projetos/${project.slug}`} className="project-link">
        <div className="project-art" aria-hidden="true">
          <div className="project-screen">
            <div className="project-browser">
              <i />
              <i />
              <i />
              <span>{host}</span>
            </div>
            <div className="mock-photo">
              <Image
                src={project.image}
                alt=""
                sizes="(max-width: 760px) 100vw, 50vw"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className="project-meta">
          <div>
            <Heading>{project.name}</Heading>
            <p>
              {project.category} · {project.segment}
            </p>
          </div>
          <ArrowUpRight aria-hidden="true" />
        </div>
      </Link>
    </article>
  );
}
