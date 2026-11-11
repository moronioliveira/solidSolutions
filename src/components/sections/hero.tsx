import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import heroImage from "@/assets/hero/solid-hero.jpg";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { hero } from "@/content/home";

export function Hero() {
  const lastLine = hero.title.length - 1;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero-image"
        src={heroImage}
        alt=""
        priority
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
      />
      <div className="site-container hero-content">
        <span className="eyebrow">
          <i className="status-dot" aria-hidden="true" /> {hero.eyebrow}
        </span>
        <h1 id="hero-title">
          {hero.title.map((line, index) => (
            <span key={line} className={`hero-line${index === lastLine ? " hero-line-accent" : ""}`}>
              <span>{line}</span>{" "}
            </span>
          ))}
        </h1>
        <p className="hero-description">{hero.description}</p>
        <div className="hero-actions">
          <WhatsAppLink location="hero" className="btn btn-primary btn-lg">
            Pedir orçamento no WhatsApp <ArrowUpRight aria-hidden="true" />
          </WhatsAppLink>
          <Link href="/projetos" className="text-cta">
            Ver projetos <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="hero-proof" aria-label="Destaques">
          {hero.proof.map((item) => (
            <li key={item}>
              <Check size={15} aria-hidden="true" /> {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="site-container hero-bottom" aria-hidden="true">
        <span>
          <ArrowDown size={13} /> Role para explorar
        </span>
        <span>Estratégia + Design + Código</span>
      </div>
    </section>
  );
}
