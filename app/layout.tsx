import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "../src/styles/index.css";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/google-tag-manager";
import { InteractionTracker } from "@/components/analytics/interaction-tracker";
import { FloatingWhatsApp, MotionRoot, SiteFooter, SiteHeader } from "@/components/layout";
import { seo } from "@/content/seo";
import { site } from "@/content/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.pages.home.title,
    template: seo.titleTemplate,
  },
  description: seo.pages.home.description,
  keywords: [...seo.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: seo.pages.home.title,
    description: seo.pages.home.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `Logo da ${site.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.pages.home.title,
    description: seo.pages.home.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/favicon-192.png", sizes: "192x192" }],
  },
  formatDetection: { telephone: false },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#151413",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body>
        <GoogleTagManagerNoScript />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <MotionRoot />
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <FloatingWhatsApp />
        <InteractionTracker />
        <GoogleTagManager />
      </body>
    </html>
  );
}
