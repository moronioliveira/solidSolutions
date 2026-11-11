import Link from "next/link";
import type { Crumb } from "@/lib/seo";

/** Trilha de navegação visível. Os mesmos itens viram BreadcrumbList nos dados estruturados. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Você está em" className="breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={item.path}>
            {index === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.path}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
