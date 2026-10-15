import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import symbol from "@/assets/solid-solutions-symbol.jpg.asset.json";
import logo from "@/assets/solid-solutions-logo.jpg.asset.json";

const navigation = [
  { label: "Início", to: "/" }, { label: "Projetos", to: "/projetos" },
  { label: "Soluções", to: "/servicos" }, { label: "Sobre nós", to: "/sobre" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <header className="site-header"><div className="site-container header-inner">
      <Link to="/" className="brand" aria-label="Solid Solutions — início"><img src={symbol.url} alt="" width={44} height={44} /><span>SOLID<span>SOLUTIONS</span></span></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(item => <Link key={item.to} to={item.to} activeProps={{ className: "nav-active" }} activeOptions={{ exact: true }}>{item.label}</Link>)}</nav>
      <Button asChild variant="outline" className="header-cta"><Link to="/contato">Vamos conversar <ArrowUpRight /></Link></Button>
      <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </div>{menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel">{[...navigation, { label: "Vamos conversar", to: "/contato" } as const].map(item => <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={16} /></Link>)}</nav>}</header>
    <main>{children}</main>
    <footer className="site-footer"><div className="site-container footer-top"><img src={logo.url} alt="Solid Solutions" loading="lazy" width={1920} height={1080} /><div><span className="eyebrow">IDEIAS AMBICIOSAS. SOLUÇÕES SÓLIDAS.</span><p>O próximo grande projeto<br />pode ser o seu.</p><Link to="/contato">Vamos criar juntos <ArrowUpRight size={20} /></Link></div></div><div className="site-container footer-bottom"><span>© 2026 Solid Solutions</span><span>Design com propósito. Código com precisão.</span><Link to="/contato">Contato <ArrowUpRight size={14} /></Link></div></footer>
  </>;
}

export function PageIntro({ label, title, description }: { label: string; title: string; description: string }) {
  return <div className="page-intro site-container"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{description}</p></div>;
}

export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Solid Solutions` }, { name: "description", content: description }, { property: "og:title", content: `${title} | Solid Solutions` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}