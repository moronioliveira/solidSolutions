import type { Metadata } from "next";
import { PageIntro } from "@/components/layout";
import { ContactBand, ProjectCard, ProjectFilter } from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/content/site";
import { projects } from "@/content/projects";
import { seo } from "@/content/seo";
import { pageGraph, pageMetadata, type Crumb } from "@/lib/seo";

const page = seo.pages.projects;
const path = "/projetos";
const crumbs: Crumb[] = [
  { name: "Início", path: "/" },
  { name: "Projetos", path },
];

export const metadata: Metadata = pageMetadata({ ...page, path });

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          title: page.title,
          description: page.description,
          type: "CollectionPage",
          crumbs,
          extra: [
            {
              "@type": "ItemList",
              "@id": `${absoluteUrl(path)}#lista`,
              itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: project.name,
                url: absoluteUrl(`/projetos/${project.slug}`),
              })),
            },
          ],
        })}
      />
      <PageIntro
        crumbs={crumbs}
        label="Portfólio / Sites e landing pages"
        title="Portfólio de sites e landing pages"
        description="Projetos para advocacia, odontologia, nutrição e construção civil. Abra cada um para ver o desafio, a solução e o site publicado."
      />
      <section className="section section-tight site-container" aria-label="Projetos">
        <ProjectFilter
          items={projects.map((project) => ({
            key: project.slug,
            category: project.category,
            node: <ProjectCard project={project} headingLevel="h2" />,
          }))}
        />
      </section>
      <ContactBand location="projetos-final" />
    </>
  );
}
