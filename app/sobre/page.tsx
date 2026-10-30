import { SiteShell, PageIntro } from "@/components/layout";
import { ContactBand } from "@/components/sections";
import logo from "@/assets/brand/solid-solutions-logo.jpg";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Sobre a Solid Solutions",
  "Conheça a Solid Solutions, um estúdio digital que une estratégia, design e desenvolvimento web.",
  "/sobre",
);

export default function AboutPage() {
  return (
    <SiteShell>
      <PageIntro
        label="SOBRE NÓS / SOLID SOLUTIONS"
        title="Boas ideias precisam de uma base sólida."
        description="Somos um estúdio digital com uma proposta clara: aproximar negócios e pessoas por meio de experiências bem pensadas."
      />
      <section className="site-container about-content">
        <img src={logo.src} alt="Logo original da Solid Solutions" width={1920} height={1080} />
        <div>
          <h2>
            Design com propósito.
            <br />
            Código com precisão.
          </h2>
          <p>
            Na Solid Solutions, um site não é apenas uma vitrine. É um ponto de encontro entre sua
            marca e quem precisa do que você oferece.
          </p>
          <p>
            Por isso, conectamos estratégia, design e desenvolvimento em um processo transparente.
            Entendemos o objetivo, cuidamos da experiência e construímos cada projeto com atenção
            aos detalhes.
          </p>
          <p>
            Da primeira conversa ao lançamento, nosso foco é o mesmo: criar uma presença digital que
            faça sentido para seu negócio.
          </p>
        </div>
      </section>
      <ContactBand />
    </SiteShell>
  );
}
