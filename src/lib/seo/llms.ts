import { faq } from "@/content/faq";
import { niches } from "@/content/niches";
import { projects } from "@/content/projects";
import { seo } from "@/content/seo";
import { services } from "@/content/services";
import { absoluteUrl, site } from "@/content/site";
import {
  adBudget,
  adManagement,
  allOffers,
  businessProfile,
  extraPage,
  formatBRL,
  hosting,
  maintenance,
  reportSubscription,
} from "@/lib/pricing/commercial";

/**
 * Gera o /llms.txt: um resumo em Markdown com os fatos principais da marca,
 * no formato proposto em llmstxt.org. Ajuda assistentes de IA (GEO) a citar
 * a Solid Solutions com informações corretas. É montado a partir de src/content,
 * então fica sempre igual ao que está no site.
 */
export function buildLlmsTxt() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.shortDescription}`,
    "",
    "## Fatos principais",
    "",
    "- Atendimento: 100% online, para empresas de todo o Brasil, com conversas pelo WhatsApp e reuniões por vídeo.",
    `- Contato: WhatsApp ${site.whatsapp.display} (https://wa.me/${site.whatsapp.number})${site.email ? `, ${site.email}` : ""}.`,
    "- Serviços: criação de landing pages, criação de sites institucionais, configuração e gestão de Google Ads e configuração do Google Meu Negócio (Perfil da Empresa no Google).",
    "- Todo projeto inclui SEO on-page, dados estruturados (Schema.org), versão para celular e botão de WhatsApp.",
    "",
    "## Planos e preços",
    "",
    ...allOffers.map(
      (plan) =>
        `- ${plan.name} (${plan.purpose}): ${formatBRL(plan.price)} de pagamento único. Inclui: ${plan.features.join("; ")}.${plan.requirement ? ` ${plan.requirement}` : ""}`,
    ),
    `- Página extra em site institucional: ${formatBRL(extraPage.price)} por página.`,
    `- ${hosting.detail}`,
    `- Adicionais mensais opcionais, fora do valor dos planos e sem fidelidade: manutenção da página por ${formatBRL(maintenance.monthly)}/mês, com monitoramento, suporte e as alterações do mês incluídas (sem manutenção, ${formatBRL(maintenance.singleChange)} por alteração; a hospedagem não depende dela); gestão de Google Ads por ${formatBRL(adManagement.monthly)}/mês, com relatório mensal de resultados em linguagem simples; gestão do Google Meu Negócio por ${formatBRL(businessProfile.monthly)}/mês.`,
    "- O plano Performance inclui o primeiro relatório mensal de resultados dos anúncios.",
    `- Relatório de resultados avulso (Painel Solid), para quem anuncia sem a gestão da Solid Solutions: ${formatBRL(reportSubscription.monthly)}/mês mais ${formatBRL(reportSubscription.installation)} de instalação única, sem fidelidade. É só leitura: não altera campanhas nem dá recomendações. Exemplo com dados fictícios: ${site.reportDemoUrl}`,
    `- Verba de anúncios paga diretamente ao Google; sugestão inicial de ${formatBRL(adBudget.minimumDaily)} a ${formatBRL(adBudget.maximumDaily)} por dia.`,
    "",
    "## Páginas de serviço",
    "",
    ...services.map(
      (service) =>
        `- [${service.headline}](${absoluteUrl(`/servicos/${service.slug}`)}): ${service.summary}`,
    ),
    "",
    "## Páginas por segmento",
    "",
    ...niches.map(
      (niche) =>
        `- [${niche.headline}](${absoluteUrl(`/segmentos/${niche.slug}`)}): ${niche.summary}`,
    ),
    "",
    "## Portfólio",
    "",
    ...projects.map(
      (project) =>
        `- [${project.name}](${absoluteUrl(`/projetos/${project.slug}`)}): ${project.category} para ${project.segment.toLowerCase()}.`,
    ),
    "",
    "## Perguntas frequentes",
    "",
    ...faq.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
    "## Outras páginas",
    "",
    `- [Início](${absoluteUrl("/")})`,
    `- [Serviços e planos](${absoluteUrl("/servicos")})`,
    `- [Sobre](${absoluteUrl("/sobre")})`,
    `- [Contato](${absoluteUrl("/contato")})`,
    "",
    `Última atualização: ${seo.lastUpdated}.`,
    "",
  ];
  return lines.join("\n");
}
