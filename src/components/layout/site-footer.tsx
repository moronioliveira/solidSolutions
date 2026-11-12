import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe, MessageCircle } from "lucide-react";
import logo from "@/assets/brand/solid-solutions-logo.png";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { services } from "@/content/services";
import { site, socialLinks } from "@/content/site";
import { SocialIcon } from "./social-icon";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Image src={logo} alt="Logo oficial da Solid Solutions" width={112} />
          <p>{site.shortDescription}</p>
        </div>
        <nav aria-label="Serviços">
          <h2>Serviços</h2>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/servicos/${service.slug}`}>{service.headline}</Link>
              </li>
            ))}
            <li>
              <Link href="/servicos#planos">Planos e preços</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Empresa">
          <h2>Empresa</h2>
          <ul>
            <li>
              <Link href="/projetos">Projetos</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre a Solid Solutions</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade">Política de privacidade</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-contact">
          <h2>Contato</h2>
          <address>
            <WhatsAppLink location="footer">
              <MessageCircle size={16} aria-hidden="true" /> {site.whatsapp.display}
            </WhatsAppLink>
            <span>
              <Globe size={16} aria-hidden="true" /> Atendimento online em todo o Brasil
            </span>
            {socialLinks.map((social) => (
              <a
                key={social.network}
                href={social.url}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={`${social.label} da ${site.name}: ${social.handle}`}
                data-social={social.network}
              >
                <SocialIcon network={social.network} /> {social.handle}
              </a>
            ))}
          </address>
          <WhatsAppLink location="footer-cta" className="footer-cta">
            Vamos criar juntos <ArrowUpRight size={18} aria-hidden="true" />
          </WhatsAppLink>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>
          © {year} {site.name}. Todos os direitos reservados.
        </span>
        <span>Design com propósito. Código com precisão.</span>
      </div>
    </footer>
  );
}
