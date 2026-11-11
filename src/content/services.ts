import type { FaqItem } from "./faq";

export type ServiceIcon = "globe" | "pointer" | "chart";

export interface Service {
  slug: string;
  icon: ServiceIcon;
  name: string;
  /** Nome usado no H1 e no title da página do serviço (palavra-chave principal). */
  headline: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  intro: string;
  idealFor: string[];
  deliverables: string[];
  benefits: { title: string; text: string }[];
  /** Plano relacionado em src/lib/pricing/commercial.ts */
  planName: "Essencial" | "Performance";
  whatsappMessage: string;
  faq: FaqItem[];
}

export const services: Service[] = [
  {
    slug: "criacao-de-landing-page",
    icon: "pointer",
    name: "Landing pages",
    headline: "Criação de landing page profissional",
    seoTitle: "Criação de Landing Page Profissional",
    seoDescription:
      "Landing page sob medida, rápida no celular, com SEO, dados estruturados e botão de WhatsApp. A partir de R$ 250 com hospedagem e suporte inclusos.",
    summary:
      "Uma página, um objetivo. Transformamos sua oferta em uma página clara, rápida e pensada para levar o visitante até o WhatsApp.",
    intro:
      "Landing page é uma página única, focada em uma oferta e em uma ação: falar com você. Ela funciona tanto para quem chega pelo Google quanto para quem vem de anúncios e redes sociais, e é o jeito mais rápido e econômico de colocar um negócio na internet com aparência profissional.",
    idealFor: [
      "Profissionais liberais: advogados, dentistas, nutricionistas, psicólogos",
      "Negócios locais que vendem pelo WhatsApp",
      "Campanhas de Google Ads e Meta Ads",
      "Lançamento de um serviço ou produto específico",
    ],
    deliverables: [
      "Layout exclusivo, criado para a sua marca",
      "Versão otimizada para celular, tablet e computador",
      "Textos organizados para explicar a oferta e tirar dúvidas",
      "Botões de WhatsApp com mensagem pronta",
      "SEO on-page: título, descrição, headings e prévia de compartilhamento",
      "Dados estruturados (Schema.org) do seu negócio",
      "Hospedagem, domínio configurado, HTTPS e monitoramento",
    ],
    benefits: [
      {
        title: "Carrega rápido",
        text: "Página leve, com imagens otimizadas. Menos espera, menos visitantes desistindo.",
      },
      {
        title: "Fácil de encontrar",
        text: "Estrutura técnica pensada para o Google entender o que você faz e onde atende.",
      },
      {
        title: "Feita para converter",
        text: "Cada seção leva o visitante para a próxima, até o botão do WhatsApp.",
      },
    ],
    planName: "Essencial",
    whatsappMessage:
      "Olá! Vi a página de landing pages da Solid Solutions e quero um orçamento para a minha.",
    faq: [
      {
        question: "Quanto custa uma landing page?",
        answer:
          "Na Solid Solutions, a landing page do plano Essencial custa R$ 250 de pagamento único, mais R$ 50 por mês de hospedagem, HTTPS, monitoramento e suporte para pequenas alterações.",
      },
      {
        question: "Em quanto tempo a landing page fica pronta?",
        answer:
          "Depois de recebermos textos, fotos e informações do negócio, o prazo médio é de 5 a 10 dias úteis, incluindo uma rodada de ajustes.",
      },
      {
        question: "Landing page aparece no Google?",
        answer:
          "Sim. Ela é entregue com SEO on-page, dados estruturados e sitemap. O posicionamento depende também da concorrência e do tempo de indexação, por isso não garantimos posição, mas preparamos a base técnica correta.",
      },
      {
        question: "Qual a diferença entre landing page e site institucional?",
        answer:
          "A landing page tem uma única página focada em uma oferta e uma ação. O site institucional tem várias páginas (serviços, sobre, contato) e apresenta a empresa como um todo.",
      },
    ],
  },
  {
    slug: "criacao-de-site-institucional",
    icon: "globe",
    name: "Sites institucionais",
    headline: "Criação de site institucional",
    seoTitle: "Criação de Site Institucional para Empresas",
    seoDescription:
      "Site institucional com várias páginas, design exclusivo, SEO local e alta performance. Apresente sua empresa com credibilidade e receba contatos pelo WhatsApp.",
    summary:
      "Sua empresa apresentada à altura do que entrega: páginas de serviços, sobre e contato, com estrutura pronta para o Google.",
    intro:
      "O site institucional é a sede da sua empresa na internet. Com páginas separadas para cada serviço, ele responde às dúvidas do cliente, aumenta a confiança na marca e cria mais portas de entrada pelo Google, porque cada página pode aparecer em buscas diferentes.",
    idealFor: [
      "Empresas com vários serviços ou unidades",
      "Construtoras, clínicas, escritórios e indústrias",
      "Negócios que querem aparecer em mais buscas no Google",
      "Marcas que precisam transmitir solidez para fechar contratos maiores",
    ],
    deliverables: [
      "Arquitetura de páginas planejada para SEO",
      "Página dedicada para cada serviço principal",
      "Design exclusivo alinhado à identidade da marca",
      "Portfólio, galeria ou cases da empresa",
      "SEO local: Google, mapas e buscas na sua cidade",
      "Dados estruturados, sitemap e robots configurados",
      "Hospedagem, HTTPS, monitoramento e suporte",
    ],
    benefits: [
      {
        title: "Mais buscas, mais páginas",
        text: "Cada serviço ganha uma página própria, que pode ranquear para termos diferentes.",
      },
      {
        title: "Credibilidade",
        text: "Um site completo mostra que a empresa é séria e facilita o fechamento de negócios.",
      },
      {
        title: "Cresce com você",
        text: "Código moderno e organizado, pronto para novas páginas, blog e integrações.",
      },
    ],
    planName: "Essencial",
    whatsappMessage:
      "Olá! Vi a página de sites institucionais da Solid Solutions e quero um orçamento para o site da minha empresa.",
    faq: [
      {
        question: "Quanto custa um site institucional?",
        answer:
          "O valor depende da quantidade de páginas e funcionalidades. Projetos partem do plano Essencial (R$ 250 + R$ 50/mês) e recebem uma proposta personalizada após uma conversa pelo WhatsApp.",
      },
      {
        question: "Quantas páginas um site institucional precisa ter?",
        answer:
          "Em geral: início, serviços (uma página para cada serviço principal), sobre e contato. Definimos a estrutura ideal conforme o que seus clientes procuram no Google.",
      },
      {
        question: "Vou conseguir atualizar o site?",
        answer:
          "Pequenas alterações de textos, fotos e telefones estão incluídas na manutenção mensal. Basta pedir pelo WhatsApp.",
      },
    ],
  },
  {
    slug: "google-ads",
    icon: "chart",
    name: "Google Ads",
    headline: "Configuração e gestão de Google Ads",
    seoTitle: "Google Ads para Pequenas Empresas",
    seoDescription:
      "Campanha no Google Ads configurada com pesquisa de palavras-chave, palavras negativas e medição de contatos no WhatsApp. Gestão mensal opcional.",
    summary:
      "Leve até a sua página quem já está procurando pelo seu serviço, com campanha configurada e contatos medidos.",
    intro:
      "Enquanto o SEO constrói tráfego orgânico a médio prazo, o Google Ads coloca seu negócio no topo da busca desde o primeiro dia. Configuramos a conta e a campanha, escolhemos as palavras-chave da sua região e medimos cada contato que chega pelo WhatsApp.",
    idealFor: [
      "Negócios que precisam de contatos no curto prazo",
      "Serviços com procura ativa no Google",
      "Quem já tem landing page e quer acelerar resultados",
      "Empresas que querem medir o retorno de cada real investido",
    ],
    deliverables: [
      "Criação e configuração da conta no Google Ads",
      "Pesquisa de palavras-chave da sua região",
      "Lista de palavras negativas para evitar cliques inúteis",
      "Anúncios escritos para o seu público",
      "Tags de conversão para medir cliques no WhatsApp",
      "Landing page inclusa no plano Performance",
    ],
    benefits: [
      {
        title: "Resultado desde o início",
        text: "Seu anúncio aparece para quem já está buscando o seu serviço.",
      },
      {
        title: "Verba sob controle",
        text: "Você define quanto investir por dia e paga direto ao Google.",
      },
      {
        title: "Tudo medido",
        text: "Saiba quais palavras e anúncios geram conversas no WhatsApp.",
      },
    ],
    planName: "Performance",
    whatsappMessage:
      "Olá! Vi a página de Google Ads da Solid Solutions e quero saber mais sobre o plano Performance.",
    faq: [
      {
        question: "Quanto preciso investir no Google Ads?",
        answer:
          "Recomendamos começar com R$ 10 a R$ 20 por dia. A verba é paga diretamente ao Google e é separada dos valores dos serviços.",
      },
      {
        question: "A gestão mensal é obrigatória?",
        answer:
          "Não. O plano Performance já inclui a configuração inicial. A gestão contínua, com otimização semanal e relatório mensal, é opcional e custa R$ 150 por mês.",
      },
      {
        question: "Vocês garantem resultados no Google Ads?",
        answer:
          "Não existe garantia de quantidade de contatos. Os resultados dependem da procura, da concorrência, da oferta e da verba. Nosso trabalho é configurar e otimizar a campanha para aproveitar melhor cada real investido.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
