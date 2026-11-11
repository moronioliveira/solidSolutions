import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { site } from "@/content/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  /** Usa o título exatamente como escrito, sem o sufixo "| Solid Solutions". */
  absoluteTitle?: boolean;
  keywords?: readonly string[];
  type?: "website" | "article";
  noIndex?: boolean;
}

/** Metadados de uma página: title, description, canonical, Open Graph e Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  keywords,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const shareTitle = absoluteTitle ? title : seo.titleTemplate.replace("%s", title);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "pt_BR",
      url: path,
      siteName: site.name,
      title: shareTitle,
      description,
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
          alt: `${site.name}: criação de sites e landing pages`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [site.ogImage],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
