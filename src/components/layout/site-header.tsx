"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { navigation } from "@/content/site";
import { BrandMark } from "./brand-mark";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  // O menu fecha sozinho ao trocar de rota, porque guarda a rota em que foi aberto.
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpenPath(null);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <BrandMark onNavigate={close} />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <WhatsAppLink location="header" className="btn btn-outline header-cta">
          Pedir orçamento <ArrowUpRight aria-hidden="true" />
        </WhatsAppLink>
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação móvel" hidden={!open}>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        ))}
        <WhatsAppLink location="menu-mobile" className="btn btn-primary">
          Pedir orçamento no WhatsApp
        </WhatsAppLink>
      </nav>
    </header>
  );
}
