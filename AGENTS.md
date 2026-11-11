## Application architecture
- Next.js App Router with fully static pages. All editable copy lives in `src/content` (brand, SEO, services, projects, FAQ); service and case-study pages are generated from it via `generateStaticParams`, so adding an item creates the page, sitemap entry, JSON-LD and llms.txt line.
- The brand is a 100% online studio serving all of Brazil: never add a city, state or physical address to copy, metadata or structured data (the schema uses `Organization` + `OnlineBusiness` with `areaServed: Brasil`).
- SEO lives in `src/lib/seo`: `pageMetadata` (canonical, OG, Twitter) and `pageGraph` (schema.org graph with stable `@id`s). Every public page renders one `h1`, visible breadcrumbs and its own JSON-LD.
- There are no forms and no database: every CTA is a `WhatsAppLink`, which carries `data-cta` attributes that a single document-level `InteractionTracker` turns into `whatsapp_click` dataLayer events for GTM.
- Shared motion is progressive enhancement: `useSiteMotion` (mounted once in the root layout, re-run per route) reveals `[data-reveal]` elements with native observers; without JS or with reduced motion everything stays visible.
- Commercial terms and WhatsApp URL generation live in one browser-safe module (`src/lib/pricing/commercial.ts`) shared by pricing sections, service pages, structured data and llms.txt, so displayed fees and destinations stay consistent and testable.
- Keep the official palette (tokens in `src/styles/base.css`) and the official logo files in `src/assets/brand` / `public/brand`.
