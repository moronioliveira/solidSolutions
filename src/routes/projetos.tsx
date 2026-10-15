import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageIntro, pageHead } from "@/components/site-shell";
import { ProjectGrid, ContactBand, projects } from "@/components/portfolio-sections";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/projetos")({ validateSearch: (search: Record<string, unknown>): { projeto?: string } => typeof search['projeto'] === "string" ? { projeto: search['projeto'] } : {}, head: () => pageHead("Projetos e conceitos digitais", "Explore conceitos de sites institucionais e landing pages da Solid Solutions. Design original e experiências digitais com propósito."), component: Projects });
function Projects() {
  const [filter, setFilter] = useState("Todos");
  const { projeto } = Route.useSearch();
  const navigate = Route.useNavigate();
  const selected = projects.find(p => p.name === projeto);
  return <SiteShell><PageIntro label="PORTFÓLIO / EXPLORAÇÕES CRIATIVAS" title="Cada ideia, uma nova possibilidade." description="Design e tecnologia em diferentes contextos. Conheça nossos conceitos e imagine o que podemos criar para a sua marca." /><section className="section site-container"><div className="filter-bar">{["Todos", "Site institucional", "Landing page"].map(item => <Button variant={filter === item ? "default" : "outline"} key={item} onClick={() => setFilter(item)}>{item}</Button>)}</div><ProjectGrid filter={filter} /><p className="concept-note">PROJETOS CONCEITUAIS · Estes exemplos ilustram possibilidades de design e não representam clientes atendidos.</p></section><Dialog open={Boolean(selected)} onOpenChange={open => { if (!open) navigate({ search: {} }); }}><DialogContent><DialogHeader><DialogTitle>{selected?.name}</DialogTitle><DialogDescription>{selected?.category} · Projeto conceitual</DialogDescription></DialogHeader>{selected && <><img src={selected.image} alt={selected.name} width={1280} height={768} /><p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p><Button asChild><Link to="/contato">Quero um projeto assim</Link></Button></>}</DialogContent></Dialog><ContactBand /></SiteShell>;
}