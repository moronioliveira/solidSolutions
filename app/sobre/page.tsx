import type { Metadata } from "next";
import Image from "next/image";
import logo from "@/assets/brand/solid-solutions-logo.png";
import { PageIntro } from "@/components/layout";
import { ContactBand, DifferentialsSection, ProcessSection } from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { pageGraph, pageMetadata, type Crumb } from "@/lib/seo";

const page = seo.pages.about;
const path = "/sobre";
const crumbs: Crumb[] = [
  { name: "Início", path: "/" },
  { name: "Sobre", path },
];

export const metadata: Metadata = pageMetadata({ ...page, path });

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({ path, title: page.title, description: page.description, type: "AboutPage", crumbs })}
      />
      <PageIntro
        crumbs={crumbs}
        label="Sobre / Solid Solutions"
        title="Boas ideias precisam de uma base sólida"
        description={`A ${site.name} é um estúdio digital 100% online que cria sites institucionais, landing pages e campanhas no Google para negócios de todo o Brasil.`}
      />
      <section className="site-container about-content section section-tight" aria-labelledby="about-title">
        <div className="about-logo" data-reveal>
          <Image src={logo} alt="Logo oficial da Solid Solutions" sizes="320px" />
        </div>
        <div data-reveal>
          <h2 id="about-title">
            Design com propósito.
            <br />
            Código com precisão.
          </h2>
          <p>
            Para a Solid Solutions, um site não é apenas uma vitrine. É o ponto de encontro entre a
            sua marca e quem precisa do que você oferece, e esse encontro começa, quase sempre, numa
            busca no Google ou numa pergunta para uma inteligência artificial.
          </p>
          <p>
            Por isso, cada projeto junta três coisas: estratégia para entender o que o seu cliente
            procura, design para transmitir confiança e código bem feito para a página carregar
            rápido e ser entendida pelos buscadores.
          </p>
          <p>
            O atendimento é direto, pelo WhatsApp, sem intermediários. Da primeira conversa ao
            lançamento, o foco é o mesmo: criar uma presença digital que faça sentido para o seu
            negócio e traga novos contatos.
          </p>
        </div>
      </section>
      <DifferentialsSection eyebrow="O que nos guia" />
      <ProcessSection eyebrow="Como trabalhamos" />
      <ContactBand location="sobre-final" />
    </>
  );
}
