import type { PlanName } from "@/lib/pricing/commercial";
import type { FaqItem } from "./faq";

export type ServiceIcon = "globe" | "pointer" | "chart" | "pin";

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
  planName: PlanName;
  /** Mostra os pacotes de site institucional (Start e Completo) na página do serviço. */
  pricingBlock?: "institutional";
  /** Mostra o exemplo do relatório do Painel Solid na página do serviço. */
  showReport?: boolean;
  /** Texto sob "Tudo o que você recebe". Se vazio, usa a frase padrão do plano. */
  pricingNote?: string;
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
      "Landing page sob medida, rápida no celular, com SEO, dados estruturados e botão de WhatsApp. A partir de R$ 250, pagamento único.",
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
      "Publicação com HTTPS e domínio configurado",
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
          "Na Solid Solutions, a landing page do plano Essencial custa R$ 250 de pagamento único, com hospedagem inclusa. A manutenção mensal, com monitoramento, suporte e as pequenas alterações do mês, é opcional e custa R$ 50 por mês, cobrada à parte.",
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
      "Hospedagem inclusa, com HTTPS e domínio configurado",
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
    planName: "Institucional Start",
    pricingBlock: "institutional",
    pricingNote:
      "Dois pacotes com preço publicado, por número de páginas, e prazo de 15 dias a 1 mês depois de recebermos o conteúdo. Manutenção mensal é opcional e cobrada à parte.",
    whatsappMessage:
      "Olá! Vi a página de sites institucionais da Solid Solutions e quero uma proposta para o site da minha empresa.",
    faq: [
      {
        question: "Quanto custa um site institucional?",
        answer:
          "O pacote Institucional Start (até 5 páginas) custa R$ 990 e o Institucional Completo (até 10 páginas) custa R$ 1.990, ambos em pagamento único e com hospedagem inclusa. Cada página extra custa R$ 120. Você recebe uma proposta com o escopo e o prazo depois de uma conversa pelo WhatsApp.",
      },
      {
        question: "Em quanto tempo o site institucional fica pronto?",
        answer:
          "De 15 dias a 1 mês, contados depois de recebermos textos, fotos e informações da empresa. O prazo vai na proposta e está coberto pela garantia de entrega.",
      },
      {
        question: "Quantas páginas um site institucional precisa ter?",
        answer:
          "Em geral: início, serviços (uma página para cada serviço principal), sobre e contato. Definimos a estrutura ideal conforme o que seus clientes procuram no Google.",
      },
      {
        question: "Vou conseguir atualizar o site?",
        answer:
          "Com a manutenção mensal (R$ 50 por mês), as pequenas alterações de textos, fotos e telefones daquele mês estão incluídas, além de monitoramento e suporte. A hospedagem não depende dela, pois já está inclusa. Sem a manutenção, cada alteração custa R$ 30. Basta pedir pelo WhatsApp.",
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
      "Google Tag Manager, GA4 e Microsoft Clarity configurados",
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
    planName: "Google Ads",
    showReport: true,
    whatsappMessage:
      "Olá! Vi a página de Google Ads da Solid Solutions e quero saber mais sobre a configuração da minha campanha.",
    faq: [
      {
        question: "Quanto custa configurar uma campanha no Google Ads?",
        answer:
          "O plano Google Ads custa R$ 300 de pagamento único e inclui a campanha de Pesquisa, palavras-chave, palavras negativas, anúncios, Google Tag Manager, GA4 e a conversão de cliques no WhatsApp. É para quem já tem site; quem ainda não tem pode escolher o plano Performance, que inclui a landing page por R$ 550.",
      },
      {
        question: "Quanto preciso investir no Google Ads?",
        answer:
          "Recomendamos começar com R$ 10 a R$ 20 por dia. A verba é paga diretamente ao Google e é separada dos valores dos serviços.",
      },
      {
        question: "A gestão mensal é obrigatória?",
        answer:
          "Não. Os planos Performance e Google Ads já incluem a configuração inicial. A gestão contínua, com otimização semanal e relatório mensal, é opcional, sem fidelidade, e custa R$ 250 por mês.",
      },
      {
        question: "Como vou saber se os anúncios estão dando resultado?",
        answer:
          "Com a gestão mensal (R$ 250 por mês), você recebe todo mês um relatório em linguagem simples, com os contatos que chegaram, quanto custou cada um e quanto voltou do que foi investido. No plano Performance, o primeiro relatório já está incluso. A Solid Solutions mostra um exemplo de relatório, com dados fictícios, na página de Google Ads.",
      },
      {
        question: "Posso receber só o relatório, sem a gestão dos anúncios?",
        answer:
          "Sim. O relatório avulso custa R$ 79 por mês, mais R$ 120 de instalação, paga uma única vez, sem fidelidade. Instalamos a leitura da sua conta do Google Ads, conferimos se a medição de contatos está funcionando e você passa a receber o relatório todo mês. É só leitura: não alteramos campanhas nem fazemos recomendações. Para otimizar os anúncios, existe a gestão mensal.",
      },
      {
        question: "Vocês garantem resultados no Google Ads?",
        answer:
          "Não existe garantia de quantidade de contatos. Os resultados dependem da procura, da concorrência, da oferta e da verba. Nosso trabalho é configurar e otimizar a campanha para aproveitar melhor cada real investido.",
      },
    ],
  },
  {
    slug: "google-meu-negocio",
    icon: "pin",
    name: "Google Meu Negócio",
    headline: "Configuração e otimização do Google Meu Negócio",
    seoTitle: "Google Meu Negócio: Configuração e Otimização",
    seoDescription:
      "Configuramos e otimizamos o seu Perfil da Empresa no Google (Google Meu Negócio) para aparecer no Maps e na busca local. Configuração por R$ 200.",
    summary:
      "Seu negócio no Google Maps e nas buscas locais, com um perfil completo, medido e pronto para receber avaliações.",
    intro:
      "Quando alguém procura um serviço perto de si, o Google mostra primeiro o mapa com os negócios que têm Perfil da Empresa, o antigo Google Meu Negócio. Um perfil completo, com as categorias certas, fotos, horários e avaliações respondidas, passa confiança e leva o cliente direto para ligar, chamar no WhatsApp ou traçar a rota até você. Nós criamos ou reivindicamos o perfil, preenchemos tudo do jeito que o Google valoriza e deixamos a medição pronta.",
    idealFor: [
      "Negócios com endereço físico, como consultórios, clínicas, escritórios, lojas e oficinas",
      "Profissionais que atendem em uma área definida, como serviços a domicílio",
      "Quem já tem site ou landing page e quer ser encontrado no Maps",
      "Negócios que dependem de avaliações para fechar com novos clientes",
    ],
    deliverables: [
      "Criação ou reivindicação do Perfil da Empresa no Google",
      "Acompanhamento da verificação exigida pelo Google",
      "Categoria principal e secundárias, descrição, horários e serviços",
      "Link do site com medição de origem (UTM)",
      "Orientação de fotos e capa, com publicação das primeiras fotos",
      "3 postagens iniciais",
      "Link e QR code para pedir avaliações, com modelos de resposta",
      "Conferência de nome, endereço e telefone entre o perfil e o site",
    ],
    benefits: [
      {
        title: "Mais visível no Maps",
        text: "Quem procura perto de si encontra o seu negócio no mapa, com telefone, rota e WhatsApp à mão.",
      },
      {
        title: "Mais confiança",
        text: "Fotos, horários e avaliações respondidas mostram que a empresa é séria e está em atividade.",
      },
      {
        title: "Fácil de medir",
        text: "O link com identificação de origem mostra quantas visitas chegam do perfil ao seu site.",
      },
    ],
    planName: "Google Meu Negócio",
    pricingNote:
      "Configuração em até 5 dias úteis, em pagamento único. A gestão mensal do perfil é opcional (R$ 100 por mês, sem fidelidade) e cobrada à parte.",
    whatsappMessage:
      "Olá! Vi a página de Google Meu Negócio da Solid Solutions e quero uma proposta para o perfil da minha empresa.",
    faq: [
      {
        question: "O que é o Google Meu Negócio?",
        answer:
          "É o perfil gratuito do seu negócio no Google, que aparece no Maps e nas buscas. O nome oficial hoje é Perfil da Empresa no Google, mas muita gente ainda o chama de Google Meu Negócio.",
      },
      {
        question: "Quanto custa configurar o Google Meu Negócio?",
        answer:
          "A configuração e otimização custa R$ 200, em pagamento único. A gestão mensal do perfil, com postagens, respostas às avaliações e resumo mensal, é opcional e custa R$ 100 por mês, sem fidelidade. O perfil em si é gratuito no Google.",
      },
      {
        question: "Em quanto tempo o perfil fica pronto?",
        answer:
          "A configuração leva até 5 dias úteis depois de recebermos as informações e os acessos. A verificação do Google pode levar mais tempo, e esse prazo não depende de nós.",
      },
      {
        question: "Qualquer negócio pode ter um perfil no Google?",
        answer:
          "Não. O Google exige que o negócio tenha endereço físico com atendimento ao cliente ou uma área de atendimento definida. Empresas 100% online, sem endereço, não são elegíveis. Conferimos isso antes de começar.",
      },
      {
        question: "Vocês garantem que meu perfil vai aparecer em primeiro no Maps?",
        answer:
          "Não. A posição depende de proximidade, relevância, avaliações e concorrência, e a verificação do perfil é decisão do Google. Preparamos o perfil do jeito certo e não compramos nem criamos avaliações, o que as regras do Google proíbem.",
      },
      {
        question: "Preciso ter um site para ter o perfil?",
        answer:
          "Não é obrigatório, mas ajuda. O perfil leva o cliente ao seu site ou landing page. Se você ainda não tem, o plano Essencial inclui a página.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
