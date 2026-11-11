import { faq } from "@/content/faq";
import { projects } from "@/content/projects";
import { seo } from "@/content/seo";
import { services } from "@/content/services";
import { absoluteUrl, site } from "@/content/site";
import { adBudget, adManagement, commercialPlans, formatBRL } from "@/lib/pricing/commercial";

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
    "- Serviços: criação de landing pages, criação de sites institucionais, configuração e gestão de Google Ads.",
    "- Todo projeto inclui SEO on-page, dados estruturados (Schema.org), versão para celular e botão de WhatsApp.",
    "",
    "## Planos e preços",
    "",
    ...commercialPlans.map(
      (plan) =>
        `- Plano ${plan.name} (${plan.purpose}): ${formatBRL(plan.price)} de pagamento único + ${formatBRL(plan.monthly)}/mês de hospedagem, manutenção e suporte. Inclui: ${plan.features.join("; ")}.`,
    ),
    `- Gestão mensal de Google Ads (opcional): ${formatBRL(adManagement.monthly)}/mês, além da manutenção.`,
    `- Verba de anúncios paga diretamente ao Google; sugestão inicial de ${formatBRL(adBudget.minimumDaily)} a ${formatBRL(adBudget.maximumDaily)} por dia.`,
    "",
    "## Páginas de serviço",
    "",
    ...services.map((service) => `- [${service.headline}](${absoluteUrl(`/servicos/${service.slug}`)}): ${service.summary}`),
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
