import type { StaticImageData } from "next/image";
import advocacia from "@/assets/portfolio/preview-almeida-ferraz.jpg";
import odonto from "@/assets/portfolio/preview-clinica-odonto.jpg";
import nutri from "@/assets/portfolio/preview-nutricionista.jpg";
import construtora from "@/assets/portfolio/preview-alvorada.jpg";

export type ProjectCategory = "Landing page" | "Site institucional";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  segment: string;
  /** Endereço publicado do projeto. Vazio = sem botão "ver site". */
  liveUrl: string;
  image: StaticImageData;
  imageAlt: string;
  focus: string;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  /** Serviço relacionado em src/content/services.ts */
  serviceSlug: string;
}

/**
 * Projetos do portfólio. Cada um ganha uma página própria em /projetos/[slug],
 * que funciona como estudo de caso e pode aparecer no Google.
 */
export const projects: Project[] = [
  {
    slug: "almeida-ferraz-advocacia",
    name: "Almeida & Ferraz Advocacia",
    category: "Landing page",
    segment: "Advocacia",
    liveUrl: "https://advogado-teresina.vercel.app/",
    image: advocacia,
    imageAlt: "Landing page do escritório Almeida & Ferraz Advocacia exibida em navegador",
    focus: "Imagem e credibilidade",
    summary:
      "Landing page para escritório de advocacia, com foco em imagem, identidade e apresentação das áreas de atuação.",
    challenge:
      "Escritórios de advocacia precisam transmitir seriedade e confiança logo no primeiro contato, respeitando as regras de publicidade da OAB.",
    solution:
      "Layout sóbrio, tipografia elegante e seções que apresentam o escritório, as áreas de atuação e a equipe, com contato direto pelo WhatsApp.",
    highlights: [
      "Identidade visual sóbria",
      "Apresentação das áreas de atuação",
      "Contato direto pelo WhatsApp",
    ],
    serviceSlug: "criacao-de-landing-page",
  },
  {
    slug: "clinica-odontologica-sorriso",
    name: "Clínica Odontológica Sorriso",
    category: "Landing page",
    segment: "Odontologia",
    liveUrl: "https://sorriso-page.vercel.app/",
    image: odonto,
    imageAlt: "Landing page da Clínica Odontológica Sorriso exibida em navegador",
    focus: "Profissionalismo e confiança",
    summary:
      "Landing page para clínica odontológica, mostrando tratamentos, equipe e informações de contato.",
    challenge:
      "Pacientes escolhem uma clínica pela confiança. A página precisava apresentar tratamentos e equipe de forma clara e acolhedora.",
    solution:
      "Seções de tratamentos, apresentação da equipe e chamadas para agendamento pelo WhatsApp, com visual leve e foco no celular.",
    highlights: ["Tratamentos bem explicados", "Apresentação da equipe", "Agendamento pelo WhatsApp"],
    serviceSlug: "criacao-de-landing-page",
  },
  {
    slug: "nutricionista-camilia-rodrigues",
    name: "Dra. Camilia Rodrigues, Nutricionista",
    category: "Landing page",
    segment: "Nutrição",
    liveUrl: "https://nutricionista-lake-eight.vercel.app/",
    image: nutri,
    imageAlt: "Landing page da nutricionista Dra. Camilia Rodrigues exibida em navegador",
    focus: "Saúde e bem-estar",
    summary:
      "Landing page para nutricionista, apresentando perfil profissional, serviços e formas de contato.",
    challenge:
      "Profissionais de saúde dependem de autoridade pessoal. A página precisava aproximar a profissional dos pacientes.",
    solution:
      "Perfil profissional em destaque, explicação dos atendimentos e chamadas diretas para marcar consulta.",
    highlights: ["Perfil profissional em destaque", "Serviços e atendimentos", "Marcação pelo WhatsApp"],
    serviceSlug: "criacao-de-landing-page",
  },
  {
    slug: "construtora-alvorada",
    name: "Construtora Alvorada",
    category: "Site institucional",
    segment: "Construção civil",
    liveUrl: "https://construtora-alvorada.vercel.app/",
    image: construtora,
    imageAlt: "Site institucional da Construtora Alvorada exibido em navegador",
    focus: "Projetos e qualidade",
    summary:
      "Site institucional para construtora, destacando empreendimentos, serviços e informações sobre a empresa.",
    challenge:
      "Construtoras fecham contratos de alto valor. O site precisava transmitir solidez e mostrar obras e serviços com detalhes.",
    solution:
      "Estrutura com várias seções para empreendimentos, serviços e história da empresa, com visual robusto e fotos em destaque.",
    highlights: ["Vitrine de empreendimentos", "Serviços organizados", "Apresentação institucional"],
    serviceSlug: "criacao-de-site-institucional",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
