"use client";

import { useState, type ReactNode } from "react";
import type { ProjectCategory } from "@/content/projects";

const filters = ["Todos", "Landing page", "Site institucional"] as const;
type Filter = (typeof filters)[number];

interface ProjectFilterProps {
  /** Cards já renderizados no servidor, com a categoria de cada um. */
  items: { category: ProjectCategory; node: ReactNode; key: string }[];
}

/** Filtro por categoria. Os cards vêm prontos do servidor; aqui só escondemos os demais. */
export function ProjectFilter({ items }: ProjectFilterProps) {
  const [filter, setFilter] = useState<Filter>("Todos");
  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filtrar projetos por tipo">
        {filters.map((item) => (
          <button
            type="button"
            key={item}
            className={`btn ${filter === item ? "btn-primary" : "btn-outline"}`}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {items.map((item) => (
          <div key={item.key} hidden={filter !== "Todos" && item.category !== filter}>
            {item.node}
          </div>
        ))}
      </div>
    </>
  );
}
