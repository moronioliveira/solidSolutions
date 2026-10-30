import type { Metadata } from "next";
import "../src/styles/index.css";
import { PageTransition } from "@/components/layout/page-transition";
import { SITE_URL, SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL),
  title: {
    default: "Solid Solutions | Sites e landing pages que convertem",
    template: "%s | Solid Solutions",
  },
  description:
    "Estúdio digital em Teresina especializado em sites institucionais, landing pages e desenvolvimento web.",
  authors: [{ name: "Solid Solutions" }],
  creator: "Solid Solutions",
  publisher: "Solid Solutions",
  category: "technology",
  applicationName: "Solid Solutions",
  keywords: [
    "criação de sites",
    "site institucional",
    "landing page",
    "desenvolvimento web",
    "Teresina",
    "Piauí",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Solid Solutions | Sites e landing pages que convertem",
    description:
      "Design, tecnologia e estratégia para criar uma presença digital que gera oportunidades.",
    url: SITE_URL,
    type: "website",
    locale: "pt_BR",
    siteName: "Solid Solutions",
    images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: "Solid Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solid Solutions | Sites e landing pages que convertem",
    description: "Design, tecnologia e estratégia para sua presença digital.",
    images: [SHARE_IMAGE],
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <PageTransition>{children}</PageTransition>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Solid Solutions",
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.png`,
              image: SHARE_IMAGE,
              description:
                "Estúdio digital especializado em sites institucionais, landing pages e desenvolvimento web.",
              areaServed: "Brasil",
              serviceType: ["Criação de sites", "Landing pages", "Desenvolvimento web"],
              sameAs: ["https://wa.me/5586994291131"],
            }),
          }}
        />
      </body>
    </html>
  );
}
