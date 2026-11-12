import type { MetadataRoute } from "next";
import { niches } from "@/content/niches";
import { projects } from "@/content/projects";
import { seo } from "@/content/seo";
import { services } from "@/content/services";
import { absoluteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${seo.lastUpdated}T12:00:00-03:00`);
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
  ) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });

  return [
    entry("/", 1, "weekly"),
    entry("/servicos", 0.9),
    ...services.map((service) => entry(`/servicos/${service.slug}`, 0.9)),
    ...niches.map((niche) => entry(`/segmentos/${niche.slug}`, 0.8)),
    entry("/projetos", 0.8),
    ...projects.map((project) => entry(`/projetos/${project.slug}`, 0.6)),
    entry("/sobre", 0.6),
    entry("/contato", 0.7),
    entry("/politica-de-privacidade", 0.2, "yearly"),
  ];
}
