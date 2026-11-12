import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Embute o CSS no HTML: remove a requisição que bloqueava a renderização
    // e antecipa a pintura do hero (melhora o LCP no celular).
    inlineCss: true,
  },
  images: {
    // Só WebP: AVIF é menor, mas decodifica devagar em celulares fracos e atrasava o LCP do hero.
    formats: ["image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    // Endereço antigo dos detalhes de projeto (?projeto=Nome) agora é /projetos/[slug].
    return [
      {
        source: "/projetos",
        has: [{ type: "query", key: "projeto", value: "Almeida & Ferraz Advocacia" }],
        destination: "/projetos/almeida-ferraz-advocacia",
        permanent: true,
      },
      {
        source: "/projetos",
        has: [{ type: "query", key: "projeto", value: "Clinica Odontológica Sorriso" }],
        destination: "/projetos/clinica-odontologica-sorriso",
        permanent: true,
      },
      {
        source: "/projetos",
        has: [{ type: "query", key: "projeto", value: "Dra. Camilia Rodrigues - Nutricionista" }],
        destination: "/projetos/nutricionista-camilia-rodrigues",
        permanent: true,
      },
      {
        source: "/projetos",
        has: [{ type: "query", key: "projeto", value: "Construtora Alvorada" }],
        destination: "/projetos/construtora-alvorada",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
