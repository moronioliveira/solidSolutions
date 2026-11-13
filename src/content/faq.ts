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
      "O plano Essencial custa R$ 250 de pagamento único e o plano Performance, com landing page e campanha no Google Ads, custa R$ 550. Para quem já tem site, o plano Google Ads configura só a campanha por R$ 300. Todos são pagamento único; a manutenção mensal (R$ 50) e a gestão de anúncios (R$ 250/mês) são adicionais opcionais, cobrados à parte.",
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
      "Não precisa se preocupar. Publicamos a página com HTTPS em uma hospedagem no seu nome, que na maioria dos casos é gratuita. Se quiser que a gente cuide da hospedagem, do monitoramento e das alterações, a manutenção mensal opcional custa R$ 50. O domínio (seunegocio.com.br) custa cerca de R$ 40 por ano no Registro.br, e orientamos o registro.",
  },
  {
    question: "Posso pedir alterações depois que o site estiver no ar?",
    answer:
      "Sim. Com a manutenção mensal (R$ 50, paga uma vez por mês), todas as pequenas alterações de textos, fotos e telefones daquele mês estão incluídas. Sem a manutenção, cada alteração custa R$ 30. Mudanças maiores, como novas páginas, são orçadas à parte.",
  },
];
