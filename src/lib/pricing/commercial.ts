import { site } from "@/content/site";

/**
 * Termos comerciais e geração de links do WhatsApp num único módulo seguro para o navegador,
 * usado pelos planos, páginas de serviço, contato e dados estruturados.
 */
/**
 * Faixas de mercado (Brasil, 2026). O site mostra só o valor inicial (min) ao lado do nosso preço.
 * Use apenas valores com fonte pública e atualize as fontes se mudar os números.
 * - Landing page: R$ 500–1.200 (builder) e R$ 1.200–3.000 (código sob medida), FreelaSemCrise.
 * - Setup de Google Ads: R$ 500 a mais de R$ 3.000, Trafius.
 * - Gestão de tráfego (freelancer júnior, conta pequena): R$ 500–1.200/mês, Trafius.
 */
export const marketSources = [
  {
    label: "FreelaSemCrise: quanto cobrar por landing page (2026)",
    url: "https://www.freelasemcrise.com.br/quanto-cobrar/criacao-landing-page",
  },
  {
    label: "Trafius: preço de gestor de tráfego em 2026",
    url: "https://trafius.com.br/blog/preco-de-gestor-de-trafego-em-2026-tabela-por-porte",
  },
] as const;

export const commercialPlans = [
  {
    name: "Essencial",
    price: 250,
    market: { min: 500, max: 3000, note: "landing page profissional" },
    purpose: "Presença profissional & busca local",
    audience:
      "Para profissionais e negócios que precisam apresentar seus serviços com credibilidade e facilitar o contato.",
    reason:
      "Escolha este plano se sua prioridade é ter uma página profissional e preparar seu negócio para as buscas da sua cidade, sem começar com anúncios.",
    requirement: null as string | null,
    features: [
      "Landing page sob medida, rápida e adaptada ao celular",
      "Contato direto pelo WhatsApp",
      "SEO local: títulos, descrições e prévia de compartilhamento",
      "Dados estruturados do negócio (Schema.org)",
      "Publicação com HTTPS e domínio configurado",
    ],
  },
  {
    name: "Performance",
    price: 550,
    market: { min: 1000, max: 6000, note: "landing page + configuração de Google Ads" },
    purpose: "Presença digital & campanhas no Google",
    audience:
      "Para quem deseja investir em anúncios e levar pessoas que já procuram seus serviços até o WhatsApp.",
    reason:
      "Escolha este plano se você tem verba para anúncios e quer começar com uma campanha configurada para atrair e medir novos contatos.",
    requirement: null as string | null,
    features: [
      "Tudo do plano Essencial",
      "Criação e configuração da conta e campanha no Google Ads",
      "Pesquisa de palavras-chave da sua região",
      "Palavras negativas para evitar buscas irrelevantes",
      "Tags para medir contatos gerados pelos anúncios",
    ],
  },
  {
    name: "Google Ads",
    price: 300,
    market: { min: 500, max: 3000, note: "configuração de campanha" },
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

export type PlanName = (typeof commercialPlans)[number]["name"];

/**
 * Adicionais mensais opcionais, cobrados à parte do plano.
 * Manutenção: hospedagem gerenciada, monitoramento, backups e as pequenas alterações do mês.
 * Sem a manutenção, cada alteração na página é cobrada à parte (singleChange).
 */
export const maintenance = { monthly: 50, singleChange: 30 };

/** Gestão mensal opcional de Google Ads, sem fidelidade. */
export const adManagement = { monthly: 250, market: { min: 500, max: 1200 } };

/** Prazo da garantia de entrega da campanha, em dias úteis após o envio dos acessos. */
export const deliveryGuarantee = { adsDays: 7 };

export const adBudget = { minimumDaily: 10, maximumDaily: 20 };
export const whatsappNumber = site.whatsapp.number;

export function getPlan(name: PlanName) {
  return commercialPlans.find((plan) => plan.name === name)!;
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
