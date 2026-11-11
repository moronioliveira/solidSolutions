import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./breadcrumbs";

interface PageIntroProps {
  label: string;
  title: string;
  description: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}

/** Topo das páginas internas: trilha, rótulo, H1 único e descrição. */
export function PageIntro({ label, title, description, crumbs, children }: PageIntroProps) {
  return (
    <div className="page-intro site-container">
      {crumbs && <Breadcrumbs items={crumbs} />}
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
}
