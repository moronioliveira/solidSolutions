export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Perguntas frequentes gerais. Aparecem na página inicial e em /servicos
 * e viram dados estruturados (FAQPage), que ajudam buscadores e assistentes de IA.
 * Escreva respostas diretas, que façam sentido mesmo lidas fora do site.
 */
export const faq: FaqItem[] = [
  {
    question: "Quanto custa criar um site ou landing page com a Solid Solutions?",
    answer:
      "O plano Essencial custa R$ 250 de pagamento único e o plano Performance, com campanha no Google Ads, custa R$ 550. Os dois têm manutenção de R$ 50 por mês, que inclui hospedagem, HTTPS, monitoramento e suporte para pequenas alterações.",
  },
  {
    question: "Em quanto tempo meu site fica pronto?",
    answer:
      "Uma landing page leva em média de 5 a 10 dias úteis depois do envio de textos, fotos e informações. Sites institucionais com mais páginas têm prazo definido na proposta.",
  },
  {
    question: "Vocês atendem minha cidade?",
    answer:
      "Sim. A Solid Solutions é um estúdio 100% online e atende empresas de todo o Brasil, com conversas pelo WhatsApp e reuniões por vídeo. Não é preciso nenhum encontro presencial.",
  },
  {
    question: "O site vai aparecer no Google?",
    answer:
      "Todo projeto é entregue com SEO on-page, dados estruturados (Schema.org), sitemap e boa performance no celular, que são a base para aparecer no Google. Nenhuma empresa séria garante posição, porque ela também depende da concorrência e do tempo de indexação.",
  },
  {
    question: "Preciso ter domínio e hospedagem?",
    answer:
      "Não. A hospedagem está incluída na manutenção mensal. Se você ainda não tem domínio (seunegocio.com.br), orientamos o registro, que custa cerca de R$ 40 por ano no Registro.br.",
  },
  {
    question: "Posso pedir alterações depois que o site estiver no ar?",
    answer:
      "Sim. Pequenas alterações de textos, fotos e telefones estão incluídas na manutenção mensal. Mudanças maiores, como novas páginas, são orçadas à parte.",
  },
];
