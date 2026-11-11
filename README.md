# Solid Solutions

Site da Solid Solutions, estúdio digital 100% online que cria sites institucionais, landing pages
e campanhas no Google Ads para empresas de todo o Brasil. Toda conversão acontece pelo WhatsApp.

**Stack:** Next.js 15 (App Router), React 19, TypeScript e Tailwind CSS v4 com CSS próprio.
Todas as páginas são geradas estaticamente no build.

## Como rodar

```sh
npm install
npm run dev
```

| Comando         | O que faz                         |
| --------------- | --------------------------------- |
| `npm run build` | Gera a versão de produção         |
| `npm run start` | Roda a versão de produção         |
| `npm run lint`  | Verifica o código com ESLint      |
| `npm test`      | Testes (preços, SEO, sitemap etc) |

## Variáveis de ambiente

| Variável                               | Para que serve                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | Endereço final do site. Usado no canonical, sitemap, Open Graph, JSON-LD e llms |
| `NEXT_PUBLIC_GTM_ID`                   | ID do Google Tag Manager (`GTM-XXXXXXX`). Vazio = GTM não carrega               |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Código de verificação do Google Search Console (meta tag)                       |

## Estrutura

```
app/                       Rotas do Next.js (cada página tem metadata e JSON-LD próprios)
  page.tsx                 Página inicial: só monta as seções na ordem
  servicos/[slug]/         Uma página por serviço (gerada a partir de src/content/services.ts)
  projetos/[slug]/         Um estudo de caso por projeto (src/content/projects.ts)
  sobre/, contato/, politica-de-privacidade/
  robots.ts, sitemap.ts, manifest.ts, llms.txt/route.ts
src/
  content/                 TODOS os textos editáveis: marca, SEO, serviços, projetos, FAQ
  components/layout/       Cabeçalho, rodapé, breadcrumbs, WhatsApp flutuante
  components/sections/     Seções reutilizáveis (hero, serviços, projetos, FAQ...)
  components/pricing/      Planos e preços
  components/seo/          Inserção do JSON-LD
  components/analytics/    Google Tag Manager e rastreamento de cliques
  lib/pricing/             Preços e links do WhatsApp (fonte única)
  lib/seo/                 Metadados, dados estruturados (schema.org) e llms.txt
  styles/                  Tokens da marca (base.css), site, páginas e movimento
  tests/unit/              Testes
```

### Regra geral de manutenção

- **Mudar um texto:** edite o arquivo em `src/content`. Os componentes não precisam mudar.
- **Mudar preços:** edite `src/lib/pricing/commercial.ts` (atualiza página, JSON-LD e llms.txt).
- **Novo serviço ou projeto:** adicione um item em `services.ts` ou `projects.ts`. A página, o
  sitemap, os dados estruturados e o llms.txt são gerados automaticamente.
- **Redes sociais:** preencha `socialLinks` em `src/content/site.ts` (vira `sameAs` no JSON-LD).
- Atualize `seo.lastUpdated` em `src/content/seo.ts` sempre que mudar o conteúdo.

## SEO e GEO

- Title, description, canonical, Open Graph e Twitter por página (`src/lib/seo/metadata.ts`).
- JSON-LD com `@id` estáveis: `Organization`/`OnlineBusiness` (área atendida: Brasil),
  `WebSite`, `WebPage`, `OfferCatalog` com os preços, `Service`, `CreativeWork`,
  `BreadcrumbList` e `FAQPage`.
- Um único `h1` por página, breadcrumbs visíveis, links internos entre serviços e projetos.
- FAQ com `<details>` nativo: respostas no HTML, sem depender de JavaScript.
- `robots.txt` libera buscadores e robôs de IA; `/llms.txt` resume a marca para assistentes de IA
  e é gerado a partir de `src/content`.
- Imagens com `next/image` (AVIF/WebP) e fontes com `next/font` (sem requisição externa).

## Conversão (Google Tag Manager)

Todo botão do WhatsApp usa `WhatsAppLink` e, ao ser clicado, envia ao `dataLayer`:

```js
{ event: "whatsapp_click", cta_location: "hero" | "header" | "plano-essencial" | ..., page_path: "/" }
```

Abrir uma pergunta do FAQ envia `faq_open` com `faq_question`. No GTM, crie um acionador de
evento personalizado `whatsapp_click` e use-o na tag de conversão do Google Ads/GA4.
