/**
 * Seção "relatório de resultados" (prova de transparência). Os números abaixo são FICTÍCIOS,
 * iguais aos da demonstração pública do Painel Solid, e a página sempre avisa isso.
 * Fica fora de home.ts de propósito: os testes de preço só olham para valores de planos.
 */
export const reportSection = {
  eyebrow: "02 / Prova de resultado",
  title: "Você vê quanto cada real investido trouxe de volta.",
  description:
    "Nos planos com anúncios no Google, você recebe um relatório em linguagem simples: quantos contatos chegaram, quanto custou cada um e quanto voltou do que você investiu. Sem planilha e sem termo técnico.",
  points: [
    "Contatos, custo por contato e retorno do investimento",
    "Quais buscas trouxeram os contatos",
    "Link de leitura: abre no celular e salva em PDF",
    "O primeiro relatório já vem no plano Performance",
  ],
  note: "Exemplo com dados fictícios. Resultados reais dependem da procura, da concorrência, da oferta e da verba.",
} as const;

export const reportExample = {
  business: "Seu negócio (exemplo)",
  title: "Relatório de anúncios no Google",
  contacts: 75,
  contactsLabel: "contatos pelos seus anúncios no Google no mês",
  costPerContact: "R$ 13",
  invested: "R$ 1.005",
  trend: "21% mais contatos que no mês anterior, e cada um saiu 16% mais barato.",
  returnPerReal: "R$ 5,97",
  weeks: [
    { label: "Dias 1 a 7", value: 15 },
    { label: "Dias 8 a 14", value: 16 },
    { label: "Dias 15 a 21", value: 18 },
    { label: "Dias 22 a 28", value: 18 },
    { label: "Dias 29 a 31", value: 8 },
  ],
} as const;
