# Solid Solutions

Portfólio da Solid Solutions, construído com Next.js, TypeScript, React e Tailwind CSS.
O site apresenta os serviços, projetos conceituais e direciona os pedidos diretamente
para o WhatsApp.

## Desenvolvimento

```sh
npm install
npm run dev
```

```sh
npm test
npm run build
```

Não existe mais submissão de formulário ou notificação ao Discord. Os botões de contato
usam links do WhatsApp com mensagens pré-preenchidas, sem enviar dados para a aplicação.

Os metadados, canonical, Open Graph, JSON-LD, sitemap e robots são gerados pelo
App Router. O endereço público pode ser alterado com `NEXT_PUBLIC_SITE_URL`.

## Organização do código

- `app/`: rotas públicas e metadata do Next.js.
- `src/components/layout/`: shell global, navegação e introduções de página.
- `src/components/sections/`: seções reutilizáveis de conteúdo do portfólio.
- `src/components/pricing/`: planos, preços e chamadas comerciais.
- `src/components/ui/`: componentes visuais genéricos reutilizáveis.
- `src/assets/`: imagens agrupadas por marca, hero e portfólio.
- `src/lib/`: regras de negócio agrupadas por preços, SEO e site.
- `src/hooks/`: hooks agrupados por comportamento do site e componentes de UI.
- `src/styles/`: tokens/base, layout, páginas, motion e acessibilidade.
- `src/tests/`: testes separados da implementação por tipo.
