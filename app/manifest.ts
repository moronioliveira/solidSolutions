import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#151413",
    theme_color: "#151413",
    lang: "pt-BR",
    icons: [
      { src: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
  };
}
