/**
 * Dados da marca usados em toda a aplicação: páginas, SEO, dados estruturados e llms.txt.
 * Altere aqui e a mudança aparece em todos os lugares.
 */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://solidsolutionsdigital.com.br").replace(
    /\/$/,
    "",
  ),
  name: "Solid Solutions",
  tagline: "Ideias ambiciosas. Soluções sólidas.",
  shortDescription:
    "Estúdio digital 100% online que cria sites institucionais, landing pages e campanhas no Google Ads para pequenas e médias empresas de todo o Brasil.",
  /** A marca atende online, sem região específica. */
  serviceArea: "Brasil",
  country: "BR",
  whatsapp: {
    number: "5586994291131",
    display: "(86) 99429-1131",
    defaultMessage:
      "Olá! Conheci a Solid Solutions pelo site e gostaria de conversar sobre um projeto.",
  },
  /** Deixe vazio enquanto não houver um e-mail profissional. */
  email: "",
  ogImage: "/og-image.jpg",
  logo: "/brand/solid-solutions-logo.jpg",
  symbol: "/brand/solid-solutions-symbol.jpg",
  ctaLabel: "Pedir orçamento no WhatsApp",
} as const;

/**
 * Perfis oficiais da marca. Cada link adicionado aqui entra no `sameAs` dos dados
 * estruturados, o que ajuda Google e assistentes de IA a confirmar a identidade da marca.
 */
export const socialLinks: { label: string; url: string }[] = [];

export const navigation = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;

export function absoluteUrl(path = "/") {
  return path === "/" ? site.url : `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
