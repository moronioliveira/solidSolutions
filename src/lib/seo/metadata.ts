import type { Metadata } from "next";
import { SITE_URL, SHARE_IMAGE } from "@/lib/site/config";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "pt_BR",
      siteName: "Solid Solutions",
      images: [
        {
          url: SHARE_IMAGE,
          width: 1200,
          height: 630,
          alt: "Solid Solutions — sites e landing pages",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE],
    },
  };
}
