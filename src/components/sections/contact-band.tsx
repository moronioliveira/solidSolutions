import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import symbol from "@/assets/brand/solid-solutions-symbol.png";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { promises } from "@/content/home";
import { site } from "@/content/site";

interface ContactBandProps {
  location?: string;
  message?: string;
}

/** Chamada final: reforça as garantias da marca e leva ao WhatsApp. */
export function ContactBand({ location = "faixa-final", message }: ContactBandProps) {
  return (
    <section className="contact-band" aria-labelledby="contact-band-title">
      <div className="site-container">
        <div className="contact-card" data-reveal>
          <Image src={symbol} alt="" className="contact-symbol" aria-hidden="true" sizes="420px" />
          <div className="contact-copy">
            <span className="eyebrow">
              <i className="status-dot" aria-hidden="true" /> Seu próximo passo começa aqui
            </span>
            <h2 id="contact-band-title">
              Vamos criar <span className="text-accent">algo sólido?</span>
            </h2>
            <p>
              Conte sua ideia pelo WhatsApp. Você recebe uma proposta clara, com prazo e valores,
              sem compromisso.
            </p>
            <div className="contact-actions">
              <WhatsAppLink location={location} message={message} className="btn btn-primary btn-lg">
                <MessageCircle aria-hidden="true" /> Conversar no WhatsApp
              </WhatsAppLink>
              <Link href="/servicos#planos" className="text-cta">
                Ver planos e preços <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="contact-meta">
              {site.whatsapp.display} · Atendimento online em todo o Brasil
            </p>
          </div>
          <ul className="contact-promises" aria-label="Em todo projeto">
            {promises.map((item) => (
              <li key={item}>
                <span aria-hidden="true">
                  <Check />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
