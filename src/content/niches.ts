import type { FaqItem } from "./faq";

/**
 * Páginas por segmento (nicho). Cada uma mira a busca de um tipo de cliente
 * ("landing page para advogados") e mostra o projeto real daquele segmento.
 * Regra: todo texto aqui é próprio do nicho. Não copie blocos entre segmentos,
 * porque páginas repetidas não ranqueiam e podem ser vistas como conteúdo duplicado.
 */
export interface Niche {
  slug: string;
  /** Nome curto do público, usado em links e breadcrumbs. */
  name: string;
  /** Texto curto dos links (rodapé e páginas relacionadas). */
  linkLabel: string;
  /** H1 e palavra-chave principal. */
  headline: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  intro: string[];
  /** O que a página precisa ter para esse público. */
  essentials: { title: string; text: string }[];
  /** Cuidados próprios do segmento (regras de conselho, tom, etc.). */
  care: { title: string; text: string };
  /** Projeto do portfólio em src/content/projects.ts */
  projectSlug: string;
  /** Serviço relacionado em src/content/services.ts */
  serviceSlug: string;
  planName: "Essencial" | "Performance";
  whatsappMessage: string;
  faq: FaqItem[];
}

export const niches: Niche[] = [
  {
    slug: "landing-page-para-advogados",
    name: "Advogados",
    linkLabel: "Landing page para advogados",
    headline: "Landing page para advogados e escritórios de advocacia",
    seoTitle: "Landing Page para Advogados e Escritórios",
    seoDescription:
      "Landing page para advogados, sóbria e dentro das regras da OAB, com áreas de atuação, contato pelo WhatsApp e SEO. Plano a partir de R$ 250.",
    summary:
      "Uma página sóbria, que transmite confiança no primeiro contato, apresenta suas áreas de atuação e leva o cliente até o WhatsApp, respeitando as regras de publicidade da OAB.",
    intro: [
      "Quem procura um advogado está, quase sempre, preocupado com um problema real: uma demissão, um divórcio, uma cobrança, um processo. A primeira coisa que essa pessoa avalia é se pode confiar em você. Uma landing page bem feita responde a isso em poucos segundos: quem é o profissional, em que área atua, como funciona o atendimento e como falar com ele.",
      "Para escritórios que querem atrair clientes de uma área específica, como trabalhista, previdenciário ou família, uma página dedicada funciona melhor do que um site genérico. Ela fala direto com quem tem aquele problema, aparece nas buscas certas e serve como destino para campanhas no Google Ads.",
    ],
    essentials: [
      {
        title: "Áreas de atuação explicadas com clareza",
        text: "Cada área com uma explicação curta, em linguagem que o cliente entende, sem juridiquês e sem prometer resultado.",
      },
      {
        title: "Apresentação do advogado ou da equipe",
        text: "Foto, número da OAB, formação e experiência. É o que faz o visitante sentir que está falando com uma pessoa real.",
      },
      {
        title: "Como funciona o atendimento",
        text: "Se é presencial, online ou nos dois formatos, em que cidades ou em todo o Brasil, e qual é o primeiro passo.",
      },
      {
        title: "Contato direto e discreto pelo WhatsApp",
        text: "Botão com mensagem pronta, para o cliente iniciar a conversa sem precisar expor o caso num formulário.",
      },
      {
        title: "Conteúdo informativo que responde dúvidas",
        text: "Perguntas frequentes da área de atuação, que ajudam o cliente e fazem a página aparecer em mais buscas no Google.",
      },
    ],
    care: {
      title: "Dentro das regras de publicidade da OAB",
      text: "A publicidade na advocacia segue o Código de Ética e o Provimento 205/2021 do Conselho Federal da OAB: o tom precisa ser informativo e discreto, sem promessa de resultado, sem captação de clientela e sem divulgar valores de honorários de forma mercantil. A página é escrita com esse cuidado desde o início, e o texto final é sempre aprovado por você antes de ir ao ar.",
    },
    projectSlug: "almeida-ferraz-advocacia",
    serviceSlug: "criacao-de-landing-page",
    planName: "Essencial",
    whatsappMessage:
      "Olá! Vi a página de landing page para advogados da Solid Solutions e quero um orçamento.",
    faq: [
      {
        question: "Advogado pode ter landing page e fazer anúncios no Google?",
        answer:
          "Sim. O Provimento 205/2021 da OAB permite o marketing jurídico com caráter informativo, incluindo site, landing page e anúncios patrocinados, desde que sem promessa de resultado, sem mercantilização e sem captação indevida de clientes.",
      },
      {
        question: "Posso colocar preço de honorários na landing page?",
        answer:
          "As regras da OAB não permitem divulgar honorários de forma mercantil, como promoções ou tabelas de preço chamativas. Por isso, a página leva o cliente para uma conversa no WhatsApp, onde você avalia o caso e apresenta a proposta.",
      },
      {
        question: "Faz sentido ter uma página só para uma área, como trabalhista?",
        answer:
          "Faz, principalmente se você quer anunciar no Google. Uma página focada em uma área conversa direto com quem tem aquele problema e costuma gerar mais contatos do que um site geral do escritório.",
      },
      {
        question: "Quanto custa a landing page para advogado?",
        answer:
          "No plano Essencial, a landing page custa R$ 250 de pagamento único. A manutenção mensal de R$ 50 é opcional e cobrada à parte. Com a campanha no Google Ads configurada, o plano Performance custa R$ 550.",
      },
    ],
  },
  {
    slug: "site-para-dentistas",
    name: "Dentistas",
    linkLabel: "Site para dentistas",
    headline: "Site e landing page para dentistas e clínicas odontológicas",
    seoTitle: "Site para Dentistas e Clínicas",
    seoDescription:
      "Site para dentista e clínica odontológica com tratamentos, equipe e agendamento pelo WhatsApp, rápido no celular e pronto para o Google. Desde R$ 250.",
    summary:
      "Uma página acolhedora que apresenta tratamentos e equipe, passa segurança para o paciente e transforma a visita em agendamento pelo WhatsApp.",
    intro: [
      "Boa parte dos pacientes escolhe o dentista pelo celular: pesquisa no Google, olha a página da clínica e decide em poucos minutos se vai marcar ou não. Quem tem medo de dentista, e muita gente tem, procura sinais de cuidado e de profissionalismo antes de mandar a primeira mensagem.",
      "Um site bem feito mostra os tratamentos de forma clara, apresenta quem vai atender e deixa o agendamento a um toque de distância. Para clínicas que querem crescer em um tratamento específico, como implantes, aparelho ortodôntico ou clareamento, uma landing page dedicada também é o destino ideal para anúncios.",
    ],
    essentials: [
      {
        title: "Tratamentos explicados sem termos técnicos",
        text: "O que é, para quem serve e como funciona cada tratamento, em linguagem simples que tira o medo e as dúvidas do paciente.",
      },
      {
        title: "Equipe e estrutura da clínica",
        text: "Fotos reais dos profissionais e do consultório, com número do CRO. Paciente confia em quem consegue ver.",
      },
      {
        title: "Agendamento rápido pelo WhatsApp",
        text: "Botões com mensagem pronta em toda a página, para o paciente marcar a avaliação sem precisar ligar.",
      },
      {
        title: "Localização, convênios e horários",
        text: "Endereço com mapa, como chegar, convênios aceitos e horário de atendimento, que são as perguntas mais comuns antes de marcar.",
      },
      {
        title: "Visual leve e foco no celular",
        text: "A maioria dos pacientes acessa pelo celular. A página carrega rápido e é fácil de navegar com uma mão só.",
      },
    ],
    care: {
      title: "Publicidade dentro das normas do CFO",
      text: "A odontologia tem regras próprias de publicidade definidas pelo Conselho Federal de Odontologia, com cuidados sobre o uso de imagens de pacientes, promessas de resultado e divulgação de preços. A página é planejada para respeitar essas normas, e você aprova todo o conteúdo antes da publicação.",
    },
    projectSlug: "clinica-odontologica-sorriso",
    serviceSlug: "criacao-de-landing-page",
    planName: "Essencial",
    whatsappMessage:
      "Olá! Vi a página de site para dentistas da Solid Solutions e quero um orçamento para a minha clínica.",
    faq: [
      {
        question: "Dentista precisa de site se já tem Instagram?",
        answer:
          "O Instagram é ótimo para relacionamento, mas não aparece bem nas buscas do Google. O site é o que encontra o paciente que pesquisa por dentista ou por um tratamento, e é o destino certo para anúncios.",
      },
      {
        question: "O site ajuda a clínica a aparecer no Google Maps?",
        answer:
          "Ajuda. O site é ligado ao Perfil da Empresa no Google, com nome, endereço e telefone iguais nos dois, o que reforça a presença da clínica nas buscas locais e no Maps.",
      },
      {
        question: "Posso ter uma página só para implantes ou ortodontia?",
        answer:
          "Pode, e costuma valer a pena para quem quer anunciar um tratamento específico. A página fala só daquele tratamento, responde as dúvidas mais comuns e leva o paciente direto para a avaliação.",
      },
      {
        question: "Quanto custa o site para dentista?",
        answer:
          "A landing page do plano Essencial custa R$ 250 de pagamento único. A manutenção mensal de R$ 50 é opcional e cobrada à parte. Com campanha no Google Ads, o plano Performance custa R$ 550.",
      },
    ],
  },
  {
    slug: "site-para-nutricionistas",
    name: "Nutricionistas",
    linkLabel: "Site para nutricionistas",
    headline: "Site e landing page para nutricionistas",
    seoTitle: "Site e Landing Page para Nutricionistas",
    seoDescription:
      "Site para nutricionista com perfil profissional, tipos de atendimento e marcação de consulta pelo WhatsApp, presencial ou online. A partir de R$ 250.",
    summary:
      "Uma página que coloca você em destaque, explica seus atendimentos presenciais e online e facilita a marcação da primeira consulta.",
    intro: [
      "Na nutrição, o paciente escolhe a pessoa, não a clínica. Ele quer saber quem você é, como você trabalha e se o seu jeito de atender combina com o objetivo dele, seja emagrecer, ganhar massa, cuidar de uma condição de saúde ou melhorar a alimentação da família.",
      "Uma landing page bem feita apresenta sua formação e sua abordagem, explica como funcionam as consultas e o acompanhamento, e deixa claro se você atende online. Esse último ponto é importante: com o atendimento online, você pode receber pacientes de qualquer cidade, e o site é o que permite ser encontrada por eles.",
    ],
    essentials: [
      {
        title: "Perfil profissional em destaque",
        text: "Sua foto, formação, CRN e especialidades logo no início. É a sua autoridade que convence o paciente a marcar.",
      },
      {
        title: "Tipos de atendimento e acompanhamento",
        text: "Consulta presencial, online, retornos e acompanhamento entre consultas, explicados de forma simples.",
      },
      {
        title: "Para quem é o seu atendimento",
        text: "Emagrecimento, esporte, gestantes, crianças, intolerâncias. Mostrar seu público ajuda a atrair os pacientes certos.",
      },
      {
        title: "Marcação de consulta pelo WhatsApp",
        text: "Botão com mensagem pronta para o paciente marcar a primeira consulta em poucos segundos.",
      },
      {
        title: "Conteúdo que responde dúvidas",
        text: "Perguntas frequentes sobre a consulta, o que levar e como funciona o online, que também ajudam a página a aparecer no Google.",
      },
    ],
    care: {
      title: "Respeito ao Código de Ética do CFN",
      text: "A divulgação do trabalho do nutricionista segue o Código de Ética e Conduta do Conselho Federal de Nutricionistas, que pede cuidado com promessas de resultado e com o uso de imagens de pacientes. A página é escrita com esse cuidado, focando na sua formação e na sua forma de atender, e você aprova o texto antes da publicação.",
    },
    projectSlug: "nutricionista-camilia-rodrigues",
    serviceSlug: "criacao-de-landing-page",
    planName: "Essencial",
    whatsappMessage:
      "Olá! Vi a página de site para nutricionistas da Solid Solutions e quero um orçamento.",
    faq: [
      {
        question: "Nutricionista que atende online precisa de site?",
        answer:
          "Precisa ainda mais. Quem atende online pode receber pacientes de qualquer cidade, e é o site que aparece quando essas pessoas pesquisam por nutricionista online no Google.",
      },
      {
        question: "Dá para usar a landing page no link da bio do Instagram?",
        answer:
          "Dá, e é um dos melhores usos. Em vez de vários links soltos, o seguidor chega numa página que explica seus atendimentos e leva direto para a marcação no WhatsApp.",
      },
      {
        question: "Preciso ter conteúdo pronto para fazer a página?",
        answer:
          "Não precisa ter tudo pronto. Você envia suas informações, fotos e formas de atendimento, e os textos são organizados para explicar seu trabalho com clareza.",
      },
      {
        question: "Quanto custa o site para nutricionista?",
        answer:
          "A landing page do plano Essencial custa R$ 250 de pagamento único. A manutenção mensal de R$ 50 é opcional e cobrada à parte. Com campanha no Google Ads, o plano Performance custa R$ 550.",
      },
    ],
  },
  {
    slug: "site-para-construtoras",
    name: "Construtoras",
    linkLabel: "Site para construtoras",
    headline: "Site institucional para construtoras e empresas de construção",
    seoTitle: "Site Institucional para Construtoras",
    seoDescription:
      "Site institucional para construtora com obras, empreendimentos, serviços e contato pelo WhatsApp, feito para transmitir solidez. Planos a partir de R$ 250.",
    summary:
      "Um site que mostra suas obras e empreendimentos com destaque, apresenta a empresa com seriedade e ajuda a fechar contratos de alto valor.",
    intro: [
      "Construir ou reformar é uma das decisões mais caras na vida de uma pessoa ou de uma empresa. Antes de pedir orçamento, o cliente quer ver obras entregues, entender que serviços a construtora oferece e ter certeza de que está lidando com uma empresa sólida, com CNPJ, história e responsável técnico.",
      "Por isso, construtoras costumam precisar de um site institucional, com mais de uma seção: empreendimentos, serviços, sobre a empresa e contato. É o lugar para reunir fotos e informações das obras, receber pedidos de orçamento e passar a imagem de solidez que um contrato grande exige.",
    ],
    essentials: [
      {
        title: "Vitrine de obras e empreendimentos",
        text: "Fotos grandes e organizadas de obras entregues e em andamento, com tipo de projeto, local e principais números.",
      },
      {
        title: "Serviços bem divididos",
        text: "Construção, reforma, projetos, incorporação. Cada serviço explicado, para o cliente saber se você faz o que ele precisa.",
      },
      {
        title: "Apresentação da empresa",
        text: "História, equipe, responsável técnico e diferenciais, que dão a segurança necessária para contratos de alto valor.",
      },
      {
        title: "Pedido de orçamento simples",
        text: "Contato direto pelo WhatsApp, com mensagem pronta, para o cliente descrever a obra e receber retorno rápido.",
      },
      {
        title: "Visual robusto e rápido",
        text: "Mesmo com muitas fotos, o site carrega rápido no celular, porque as imagens são otimizadas automaticamente.",
      },
    ],
    care: {
      title: "Informações que passam segurança",
      text: "No setor de construção, a credibilidade vem de dados concretos: CNPJ, responsável técnico com registro no CREA ou CAU, obras com fotos reais e tempo de mercado. O site é organizado para deixar essas informações visíveis, sem exageros e sem promessas de prazo ou preço que dependem de cada projeto.",
    },
    projectSlug: "construtora-alvorada",
    serviceSlug: "criacao-de-site-institucional",
    planName: "Essencial",
    whatsappMessage:
      "Olá! Vi a página de site para construtoras da Solid Solutions e quero um orçamento.",
    faq: [
      {
        question: "Construtora precisa de site institucional ou landing page?",
        answer:
          "Na maioria dos casos, site institucional, porque a construtora precisa mostrar várias obras, serviços e a história da empresa. A landing page é indicada para divulgar um empreendimento específico ou uma campanha de anúncios.",
      },
      {
        question: "Dá para ter uma página para cada empreendimento?",
        answer:
          "Dá. Cada empreendimento pode ter sua própria página, com fotos, características e contato, o que também ajuda essas páginas a aparecerem nas buscas pelo nome do empreendimento.",
      },
      {
        question: "Muitas fotos deixam o site lento?",
        answer:
          "Não, se elas forem otimizadas. As imagens são convertidas e redimensionadas automaticamente para cada tela, então o site continua rápido mesmo com galerias grandes.",
      },
      {
        question: "Quanto custa o site para construtora?",
        answer:
          "O valor depende do número de páginas e seções. Os planos começam em R$ 250 de pagamento único, com manutenção mensal opcional de R$ 50 cobrada à parte, e sites institucionais maiores têm o valor definido na proposta.",
      },
    ],
  },
];

export function getNiche(slug: string) {
  return niches.find((niche) => niche.slug === slug);
}
