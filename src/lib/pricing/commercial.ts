import { site } from "@/content/site";

/**
 * Termos comerciais e geração de links do WhatsApp num único módulo seguro para o navegador,
 * usado pelos planos, páginas de serviço, contato, dados estruturados e llms.txt.
 * Mudou um preço aqui? Atualize também o contrato e a proposta (projetos/solid-solutions-modelos).
 */

/**
 * Faixas de mercado (Brasil, 2026). O site mostra só o valor inicial (min) ao lado do nosso preço.
 * Use apenas valores com fonte pública e atualize as fontes se mudar os números.
 * - Landing page: R$ 500–1.200 (builder) e R$ 1.200–3.000 (código sob medida), FreelaSemCrise.
 * - Setup de Google Ads: R$ 500 a mais de R$ 3.000, Trafius.
 * - Gestão de tráfego (freelancer júnior, conta pequena): R$ 500–1.200/mês, Trafius.
 * - Site institucional: 5 páginas R$ 1.500–4.000; site completo com blog e formulários
 *   R$ 3.000–8.000, FreelaSemCrise (tabela de 2026).
 * - Google Meu Negócio: sem fonte confiável de preço, por isso não exibimos valor de mercado.
 */
export const marketSources = [
  {
    label: "FreelaSemCrise: quanto cobrar por landing page (2026)",
    url: "https://www.freelasemcrise.com.br/quanto-cobrar/criacao-landing-page",
  },
  {
    label: "FreelaSemCrise: quanto cobrar por site institucional (2026)",
    url: "https://www.freelasemcrise.com.br/quanto-cobrar/criar-site-wordpress",
  },
  {
    label: "Trafius: preço de gestor de tráfego em 2026",
    url: "https://trafius.com.br/blog/preco-de-gestor-de-trafego-em-2026-tabela-por-porte",
  },
] as const;

export type PlanName =
  | "Essencial"
  | "Performance"
  | "Google Ads"
  | "Institucional Start"
  | "Institucional Completo"
  | "Google Meu Negócio";

export interface Offer {
  name: PlanName;
  /** Pagamento único, em reais. */
  price: number;
  purpose: string;
  audience: string;
  reason: string;
  requirement: string | null;
  features: string[];
  /** Objetivo do cliente em primeira pessoa, usado no cartão resumido da página inicial. */
  goal?: string;
  /** Os 4 itens que decidem a compra, usados no cartão resumido da página inicial. */
  highlights?: string[];
}

export interface PricedPlan extends Offer {
  /** Valor inicial praticado no mercado, com a descrição do que foi comparado. */
  market: { min: number; note: string };
}

export const commercialPlans: PricedPlan[] = [
  {
    name: "Essencial",
    price: 250,
    goal: "Quero uma página profissional",
    highlights: [
      "Landing page sob medida, rápida no celular",
      "Contato direto pelo WhatsApp",
      "SEO e dados estruturados (Schema.org)",
      "Hospedagem inclusa, com HTTPS",
    ],
    market: { min: 500, note: "landing page profissional" },
    purpose: "Presença profissional & busca local",
    audience:
      "Para profissionais e negócios que precisam apresentar seus serviços com credibilidade e facilitar o contato.",
    reason:
      "Escolha este plano se sua prioridade é ter uma página profissional e preparar seu negócio para as buscas da sua cidade, sem começar com anúncios.",
    requirement: null,
    features: [
      "Landing page sob medida, rápida e adaptada ao celular",
      "Contato direto pelo WhatsApp",
      "SEO local: títulos, descrições e prévia de compartilhamento",
      "Dados estruturados do negócio (Schema.org)",
      "Hospedagem inclusa, com HTTPS e domínio configurado",
    ],
  },
  {
    name: "Performance",
    price: 550,
    goal: "Quero anunciar e receber clientes",
    highlights: [
      "Tudo do plano Essencial",
      "Campanha no Google Ads criada e configurada",
      "Medição dos contatos gerados pelos anúncios",
      "Primeiro relatório mensal de resultados incluso",
    ],
    market: { min: 1000, note: "landing page + configuração de Google Ads" },
    purpose: "Presença digital & campanhas no Google",
    audience:
      "Para quem deseja investir em anúncios e levar pessoas que já procuram seus serviços até o WhatsApp.",
    reason:
      "Escolha este plano se você tem verba para anúncios e quer começar com uma campanha configurada para atrair e medir novos contatos.",
    requirement: null,
    features: [
      "Tudo do plano Essencial",
      "Criação e configuração da conta e campanha no Google Ads",
      "Pesquisa de palavras-chave da sua região",
      "Palavras negativas para evitar buscas irrelevantes",
      "Tags para medir contatos gerados pelos anúncios",
      "Primeiro relatório mensal de resultados, em linguagem simples",
    ],
  },
  {
    name: "Google Ads",
    price: 300,
    market: { min: 500, note: "configuração de campanha" },
    purpose: "Só a campanha, para quem já tem site",
    audience:
      "Para quem já tem site ou landing page e quer uma campanha de Pesquisa no Google configurada do jeito certo, com medição de contatos.",
    reason:
      "Escolha este plano se seu site já está no ar e você quer começar a anunciar com a conta, as tags e a campanha prontas para gerar e medir contatos.",
    requirement:
      "Requer site ou landing page já publicado. Se você ainda não tem, o plano Performance inclui a página.",
    features: [
      "1 campanha de Pesquisa criada e revisada antes de ir ao ar",
      "Pesquisa de palavras-chave e lista de palavras negativas",
      "Anúncios responsivos, sitelinks e frases de destaque",
      "Google Tag Manager, GA4 e conversão de clique no WhatsApp",
      "Microsoft Clarity para ver como os visitantes usam o site",
      "Teste completo da medição e orientação de verba",
    ],
  },
];

/**
 * Pacotes de site institucional, por número de páginas. Página extra: `extraPage`.
 * O prazo fica na proposta (depende do conteúdo enviado pelo cliente).
 */
export const institutionalPlans: (PricedPlan & { pages: number })[] = [
  {
    name: "Institucional Start",
    price: 990,
    pages: 5,
    goal: "Quero um site com várias páginas",
    highlights: [
      "Até 5 páginas, planejadas para o Google",
      "Design exclusivo, com a sua marca",
      "SEO, sitemap e dados estruturados",
      "Hospedagem inclusa, com HTTPS",
    ],
    market: { min: 1500, note: "site institucional de 5 páginas" },
    purpose: "Site institucional enxuto",
    audience:
      "Para empresas e profissionais que precisam de mais de uma página para apresentar serviços, quem são e como falar com você.",
    reason:
      "Escolha este pacote se sua empresa tem poucos serviços e você quer um site completo, sem pagar por páginas que não vai usar.",
    requirement: null,
    features: [
      "Até 5 páginas, planejadas para o Google (ex.: início, serviços, sobre e contato)",
      "Design exclusivo, com a identidade da sua marca",
      "Rápido e adaptado ao celular",
      "SEO on-page, sitemap e dados estruturados (Schema.org)",
      "Botões de contato direto pelo WhatsApp",
      "Hospedagem inclusa, com HTTPS e domínio configurado",
    ],
  },
  {
    name: "Institucional Completo",
    price: 1990,
    pages: 10,
    market: { min: 3000, note: "site institucional completo" },
    purpose: "Site institucional para aparecer em mais buscas",
    audience:
      "Para empresas com vários serviços ou segmentos, que querem aparecer no Google por mais buscas diferentes.",
    reason:
      "Escolha este pacote se cada serviço seu merece uma página própria e você quer medir de onde vêm os contatos.",
    requirement: null,
    features: [
      "Tudo do pacote Start, com até 10 páginas",
      "Uma página para cada serviço ou segmento que você atende",
      "Perguntas frequentes com dados estruturados",
      "Google Tag Manager e GA4, com medição dos cliques no WhatsApp",
      "Hospedagem inclusa, com HTTPS e domínio configurado",
    ],
  },
];

/** Página adicional de um site institucional, em pagamento único. */
export const extraPage = { price: 120 };

/** Google Meu Negócio (Perfil da Empresa no Google): configuração única + gestão mensal opcional. */
export const businessProfile: Offer & { monthly: number } = {
  name: "Google Meu Negócio",
  price: 200,
  monthly: 100,
  purpose: "Perfil da empresa no Google e no Maps",
  audience:
    "Para negócios com endereço físico ou área de atendimento que querem aparecer no Google Maps e nas buscas locais.",
  reason:
    "Escolha este serviço se seus clientes procuram o seu tipo de negócio perto deles, ou pelo nome da sua empresa, direto no Google.",
  requirement:
    "Exige endereço físico ou área de atendimento, regra do Google. A verificação do perfil é feita por você e a decisão final é do Google.",
  features: [
    "Criação ou reivindicação do perfil, com acompanhamento da verificação",
    "Categorias, descrição, horários e serviços preenchidos",
    "Link do site com medição de origem (UTM)",
    "Orientação de fotos e as primeiras postagens",
    "Link e QR code para pedir avaliações, com modelos de resposta",
  ],
};

/** Todos os itens vendidos com preço de pagamento único. */
export const allOffers: Offer[] = [...commercialPlans, ...institutionalPlans, businessProfile];

/**
 * Adicionais mensais opcionais, cobrados à parte do plano.
 * Manutenção: monitoramento do site no ar, suporte e as pequenas alterações do mês.
 * A hospedagem NÃO faz parte da manutenção: é inclusa nos planos com site (ver `hosting`).
 * Sem a manutenção, cada alteração na página é cobrada à parte (singleChange).
 */
export const maintenance = { monthly: 50, singleChange: 30 };

/** Hospedagem inclusa nos planos com site, enquanto o projeto couber no plano gratuito da plataforma. */
export const hosting = {
  short: "Hospedagem inclusa",
  detail:
    "Hospedagem inclusa nos planos com site, sem mensalidade, enquanto o projeto estiver dentro dos limites do plano gratuito da plataforma.",
};

/**
 * Relatório de resultados avulso (Painel Solid), para quem anuncia por conta própria.
 * Só leitura: não altera campanhas nem dá recomendações. A instalação (única) cobre o script de
 * leitura na conta de Google Ads e a conferência da medição de contatos.
 */
export const reportSubscription = { monthly: 79, installation: 120 };

/** Gestão mensal opcional de Google Ads, sem fidelidade. Inclui o relatório mensal do Painel Solid. */
export const adManagement = { monthly: 250, market: { min: 500 } };

/** Prazo da garantia de entrega da campanha, em dias úteis após o envio dos acessos. */
export const deliveryGuarantee = { adsDays: 7 };

export const adBudget = { minimumDaily: 10, maximumDaily: 20 };
export const whatsappNumber = site.whatsapp.number;

export function getPlan(name: PlanName): Offer {
  return allOffers.find((plan) => plan.name === name)!;
}

export function whatsappUrl(message: string = site.whatsapp.defaultMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
