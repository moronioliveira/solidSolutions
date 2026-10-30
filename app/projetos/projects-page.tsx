"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteShell, PageIntro } from "@/components/layout";
import { ProjectGrid, ContactBand, projects } from "@/components/sections";
import { Button } from "@/components/ui/actions/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/overlays/dialog";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("Todos");
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const selected = projects.find((project) => project.name === selectedName);

  useEffect(() => {
    const project = new URLSearchParams(window.location.search).get("projeto");
    setSelectedName(project);
  }, []);

  function selectProject(name: string | null) {
    setSelectedName(name);
    const url = new URL(window.location.href);
    if (name) url.searchParams.set("projeto", name);
    else url.searchParams.delete("projeto");
    window.history.replaceState({}, "", url);
  }

  return (
    <SiteShell>
      <PageIntro
        label="PORTFÓLIO / EXPLORAÇÕES CRIATIVAS"
        title="Cada ideia, uma nova possibilidade."
        description="Design e tecnologia em diferentes contextos. Conheça nossos conceitos e imagine o que podemos criar para a sua marca."
      />
      <section className="section site-container">
        <div className="filter-bar">
          {["Todos", "Site institucional", "Landing page"].map((item) => (
            <Button
              variant={filter === item ? "default" : "outline"}
              key={item}
              onClick={() => setFilter(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <ProjectGrid filter={filter} onProjectSelect={selectProject} />
        <p className="concept-note">
          PROJETOS PROFISSIONAIS · Seja o proximo a ter sua empresa representada como ela merece.
        </p>
      </section>

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) selectProject(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription>
              {selected?.category} · Projeto profissional
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <>
              {/* Usando o componente Button com renderização condicional ternária */}
              <div>
                <Button asChild>
                  <a
                    href={
                      selected.kind === "odontologia"
                        ? "https://sorriso-page.vercel.app/"
                        : "https://advogado-teresina.vercel.app/"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Clique aqui para acessar
                  </a>
                </Button>
              </div>

              <img src={selected.image.src} alt={selected.name} width={1280} height={768} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selected.description}
              </p>
              <Button asChild>
                <Link href="/contato">Quero um projeto assim</Link>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <ContactBand />
    </SiteShell>
  );
}