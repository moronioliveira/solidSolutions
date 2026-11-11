/** Textos da página inicial e de blocos reutilizados em outras páginas. */

export const hero = {
  eyebrow: "Estúdio digital · Atendimento online em todo o Brasil",
  /** H1 da página: deve conter a palavra-chave principal. */
  title: ["Criação de sites e", "landing pages que", "geram clientes."],
  description:
    "Unimos design, tecnologia e SEO para criar páginas rápidas, encontráveis no Google e feitas para levar o visitante direto ao seu WhatsApp.",
  proof: ["Pronto em poucos dias", "Hospedagem e suporte inclusos", "A partir de R$ 250"],
} as const;

export const capabilities = [
  { icon: "layers", label: "Design sob medida" },
  { icon: "zap", label: "Alta performance" },
  { icon: "smartphone", label: "Feito para celular" },
  { icon: "search", label: "SEO e GEO" },
] as const;

export const differentials = [
  {
    title: "SEO técnico desde a primeira linha",
    text: "Títulos, descrições, headings, sitemap e dados estruturados entregues em todo projeto, não como extra.",
  },
  {
    title: "Pronto para buscas com IA",
    text: "Conteúdo organizado e dados estruturados que ajudam ChatGPT, Gemini e Perplexity a entender e citar o seu negócio.",
  },
  {
    title: "Velocidade que o Google mede",
    text: "Páginas leves, imagens otimizadas e código moderno para boas notas no Core Web Vitals.",
  },
  {
    title: "Preço claro, sem surpresa",
    text: "Valores publicados no site. Você sabe quanto vai pagar antes da primeira conversa.",
  },
] as const;

/** Etapas do processo. `deliverable` diz o que o cliente tem em mãos ao fim de cada etapa. */
export const processSteps = [
  {
    icon: "chat",
    title: "Entender",
    text: "Conversamos pelo WhatsApp para entender seu negócio, seu cliente e o que o site precisa conquistar.",
    deliverable: "Proposta com escopo, prazo e valor",
  },
  {
    icon: "pen",
    title: "Criar",
    text: "Planejamos a estrutura das páginas e desenhamos uma identidade digital única para a sua marca.",
    deliverable: "Layout para você aprovar",
  },
  {
    icon: "code",
    title: "Desenvolver",
    text: "Damos vida ao design com código rápido, SEO técnico e uma experiência fluida em todas as telas.",
    deliverable: "Site testado no celular e no computador",
  },
  {
    icon: "rocket",
    title: "Lançar",
    text: "Revisamos, publicamos, enviamos ao Google e seguimos com hospedagem, monitoramento e suporte.",
    deliverable: "Site no ar, indexado e com suporte",
  },
] as const;

/** O que o cliente tem em todo projeto, usado na chamada final. */
export const promises = [
  "Preço publicado antes da primeira conversa",
  "Contato direto com quem cria o seu site",
  "SEO técnico e dados estruturados inclusos",
  "Hospedagem, HTTPS e suporte no mesmo plano",
] as const;

/**
 * Comparação com as alternativas que o cliente costuma considerar.
 * Descreve o cenário típico de cada opção, sem citar empresas.
 * `yes` = sim, `no` = não, `partial` = depende / custa à parte.
 */
export type ComparisonValue = "yes" | "no" | "partial";

export const comparison = {
  columns: ["Solid Solutions", "Construtor de sites (faça você mesmo)", "Agência tradicional"],
  /** Nomes curtos usados nos cards do celular. */
  shortColumns: ["Solid Solutions", "Construtor de sites", "Agência"],
  rows: [
    {
      label: "Preço publicado, sem orçamento surpresa",
      values: ["yes", "yes", "no"],
      note: "Agências costumam passar valor só depois de reuniões.",
    },
    {
      label: "Design exclusivo para a sua marca",
      values: ["yes", "partial", "yes"],
      note: "Construtores partem de modelos usados por milhares de sites.",
    },
    {
      label: "SEO técnico e dados estruturados (Schema.org)",
      values: ["yes", "partial", "partial"],
      note: "Em muitas opções é configuração manual ou serviço à parte.",
    },
    {
      label: "Preparado para buscas com IA (GEO)",
      values: ["yes", "no", "partial"],
    },
    {
      label: "Código leve, rápido no celular",
      values: ["yes", "partial", "yes"],
      note: "Construtores carregam scripts da plataforma em todas as páginas.",
    },
    {
      label: "Você não precisa montar nem configurar nada",
      values: ["yes", "no", "yes"],
    },
    {
      label: "Hospedagem e suporte no mesmo valor mensal",
      values: ["yes", "partial", "partial"],
    },
    {
      label: "Conversa direta com quem cria, pelo WhatsApp",
      values: ["yes", "no", "partial"],
    },
  ] satisfies { label: string; values: ComparisonValue[]; note?: string }[],
};
