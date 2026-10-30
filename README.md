# Solid Solutions

Portfólio da Solid Solutions, construído com Next.js, TypeScript, React, Tailwind CSS,
Prisma e PostgreSQL. O site apresenta os serviços, projetos conceituais e recebe
solicitações de orçamento.

## Desenvolvimento

```sh
npm install
npm run dev
```

Copie `.env.example` para `.env` e informe uma `DATABASE_URL` apontando para seu
PostgreSQL. Em produção, essa URL precisa apontar para um banco PostgreSQL hospedado
e acessível pela Vercel; `localhost` funciona apenas no desenvolvimento local. Para
enviar notificações ao Discord, informe também `DISCORD_WEBHOOK_URL`.

```sh
npx prisma migrate dev
npm test
npm run build
```

O formulário envia os dados para `app/api/contact/route.ts`; os visitantes nunca
consultam os pedidos salvos. O Prisma concentra o acesso ao banco em
`src/lib/prisma.ts`.

Os metadados, canonical, Open Graph, JSON-LD, sitemap e robots são gerados pelo
App Router. O endereço público pode ser alterado com `NEXT_PUBLIC_SITE_URL`.

## Organização do código

- `app/`: rotas públicas, metadata e endpoints do Next.js.
- `src/components/layout/`: shell global, navegação e introduções de página.
- `src/components/sections/`: seções reutilizáveis de conteúdo do portfólio.
- `src/components/pricing/`: planos, preços e chamadas comerciais.
- `src/components/ui/`: componentes visuais genéricos reutilizáveis.
- `src/assets/`: imagens agrupadas por marca, hero e portfólio.
- `src/lib/`: regras de negócio agrupadas por banco, formulários, preços, SEO e site.
- `src/hooks/`: hooks agrupados por comportamento do site e componentes de UI.
- `src/styles/`: tokens/base, layout, páginas, motion e acessibilidade.
- `src/tests/`: testes separados da implementação por tipo.
