import type { Metadata } from "next";
import { PageIntro } from "@/components/layout";
import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { pageMetadata, type Crumb } from "@/lib/seo";

const page = seo.pages.privacy;
const path = "/politica-de-privacidade";
const crumbs: Crumb[] = [
  { name: "Início", path: "/" },
  { name: "Política de privacidade", path },
];

export const metadata: Metadata = pageMetadata({ ...page, path });

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        crumbs={crumbs}
        label="Privacidade / LGPD"
        title="Política de privacidade"
        description={`Última atualização: ${new Date(`${seo.lastUpdated}T12:00:00`).toLocaleDateString("pt-BR")}.`}
      />
      <article className="site-container prose section section-tight">
        <h2>Quais dados coletamos</h2>
        <p>
          Este site não tem formulários e não pede dados pessoais. Ao clicar em um botão do
          WhatsApp, você é levado ao aplicativo com uma mensagem pronta; o envio só acontece se você
          decidir mandar. A partir daí, a conversa segue as regras de privacidade do WhatsApp.
        </p>
        <h2>Medição de audiência</h2>
        <p>
          Podemos usar ferramentas como Google Tag Manager e Google Analytics para medir, de forma
          agregada, quantas pessoas visitam o site e quantas clicam nos botões de contato. Essas
          ferramentas podem usar cookies. Você pode bloqueá-los nas configurações do seu navegador.
        </p>
        <h2>Como usamos as informações</h2>
        <p>
          As informações trocadas pelo WhatsApp são usadas apenas para responder ao seu contato,
          preparar propostas e prestar os serviços contratados. Não vendemos nem compartilhamos seus
          dados com terceiros para fins de marketing.
        </p>
        <h2>Seus direitos</h2>
        <p>
          Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir acesso,
          correção ou exclusão dos seus dados a qualquer momento pelo WhatsApp{" "}
          {site.whatsapp.display}.
        </p>
      </article>
    </>
  );
}
