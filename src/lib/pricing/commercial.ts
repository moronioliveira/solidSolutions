import { site } from "@/content/site";

/**
 * Termos comerciais e geração de links do WhatsApp num único módulo seguro para o navegador,
 * usado pelos planos, páginas de serviço, contato e dados estruturados.
 */
export const commercialPlans = [
  {
    name: "Essencial",
    originalPrice: 450,
    price: 250,
    monthly: 50,
    purpose: "Presença profissional & busca local",
    audience:
      "Para profissionais e negócios que precisam apresentar seus serviços com credibilidade e facilitar o contato.",
    reason:
      "Escolha este plano se sua prioridade é ter uma página profissional e preparar seu negócio para as buscas da sua cidade, sem começar com anúncios.",
    features: [
      "Landing page sob medida, rápida e adaptada ao celular",
      "Contato direto pelo WhatsApp",
      "SEO local: títulos, descrições e prévia de compartilhamento",
      "Dados estruturados do negócio (Schema.org)",
      "Hospedagem, HTTPS, monitoramento e suporte",
    ],
  },
  {
    name: "Performance",
    originalPrice: 750,
    price: 550,
    monthly: 50,
    purpose: "Presença digital & campanhas no Google",
    audience:
      "Para quem deseja investir em anúncios e levar pessoas que já procuram seus serviços até o WhatsApp.",
    reason:
      "Escolha este plano se você tem verba para anúncios e quer começar com uma campanha configurada para atrair e medir novos contatos.",
    features: [
      "Tudo do plano Essencial",
      "Criação e configuração da conta e campanha no Google Ads",
      "Pesquisa de palavras-chave da sua região",
      "Palavras negativas para evitar buscas irrelevantes",
      "Tags para medir contatos gerados pelos anúncios",
    ],
  },
] as const;

export type PlanName = (typeof commercialPlans)[number]["name"];

export const adManagement = { originalMonthly: 250, monthly: 150 };
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
