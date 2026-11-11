import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="site-container page-intro not-found">
      <span className="eyebrow">404 / Página não encontrada</span>
      <h1>Parece que este caminho mudou.</h1>
      <p>A página que você procura não está disponível. Talvez um destes links ajude:</p>
      <ul className="related-links">
        <li>
          <Link href="/">
            <span>Página inicial</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </li>
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/servicos/${service.slug}`}>
              <span>{service.headline}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </li>
        ))}
        <li>
          <Link href="/projetos">
            <span>Portfólio de projetos</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
