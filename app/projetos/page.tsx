import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProjectsPage from "./projects-page";

export const metadata: Metadata = pageMetadata(
  "Projetos de sites e landing pages",
  "Conheça projetos conceituais de sites institucionais e landing pages criados pela Solid Solutions.",
  "/projetos",
);

export default ProjectsPage;
