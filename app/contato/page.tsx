import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, Globe, MessageCircle } from "lucide-react";
import { PageIntro } from "@/components/layout";
import { FaqSection } from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { faq } from "@/content/faq";
import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { pageGraph, pageMetadata, type Crumb } from "@/lib/seo";

const page = seo.pages.contact;
const path = "/contato";
const crumbs: Crumb[] = [
  { name: "Início", path: "/" },
  { name: "Contato", path },
];

const contactOptions = [
  {
    title: "Quero uma landing page",
    message: "Olá! Tenho interesse em uma landing page para o meu negócio. Gostaria de um orçamento.",
  },
  {
    title: "Quero um site institucional",
    message: "Olá! Quero criar um site institucional para a minha empresa. Gostaria de um orçamento.",
  },
  {
    title: "Quero anunciar no Google",
    message: "Olá! Quero anunciar no Google Ads e gostaria de saber mais sobre o plano Performance.",
  },
  {
    title: "Ainda estou avaliando",
    message:
      "Olá! Estou avaliando uma solução digital para o meu negócio e gostaria de tirar algumas dúvidas.",
  },
];

export const metadata: Metadata = pageMetadata({ ...page, path });

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          title: page.title,
          description: page.description,
          type: "ContactPage",
          crumbs,
        })}
      />
      <PageIntro
        crumbs={crumbs}
        label="Contato / Vamos conversar"
        title="Peça seu orçamento pelo WhatsApp"
        description="Escolha o assunto e a conversa já começa com a mensagem pronta. Você fala direto com quem vai criar o seu projeto."
      />
      <div className="site-container contact-layout">
        <aside className="contact-aside" data-reveal>
          <h2>Comece com uma boa conversa</h2>
          <p>
            Seja para criar sua primeira presença digital ou dar um novo passo, queremos entender o
            que você tem em mente e indicar o caminho mais simples.
          </p>
          <ul>
            <li>
              <Check aria-hidden="true" /> Proposta clara, com prazo e valores
            </li>
            <li>
              <Check aria-hidden="true" /> Design exclusivo para a sua marca
            </li>
            <li>
              <Check aria-hidden="true" /> Comunicação direta, sem intermediários
            </li>
          </ul>
          <dl className="contact-facts">
            <div>
              <dt>
                <MessageCircle aria-hidden="true" /> WhatsApp
              </dt>
              <dd>
                <WhatsAppLink location="contato-numero">{site.whatsapp.display}</WhatsAppLink>
              </dd>
            </div>
            <div>
              <dt>
                <Globe aria-hidden="true" /> Atendimento
              </dt>
              <dd>100% online, para empresas de todo o Brasil.</dd>
            </div>
            <div>
              <dt>
                <Clock aria-hidden="true" /> Resposta
              </dt>
              <dd>Mensagens respondidas em horário comercial.</dd>
            </div>
          </dl>
        </aside>
        <section className="contact-options" aria-labelledby="contact-options-title" data-reveal>
          <span className="eyebrow">Escolha uma opção</span>
          <h2 id="contact-options-title">Sobre o que você quer conversar?</h2>
          <div className="contact-option-list">
            {contactOptions.map((option) => (
              <WhatsAppLink
                key={option.title}
                location="contato-opcao"
                message={option.message}
                className="btn btn-primary contact-option"
              >
                {option.title}
                <ArrowUpRight aria-hidden="true" />
              </WhatsAppLink>
            ))}
          </div>
          <p className="contact-note">
            Quer conhecer os valores antes? Veja os <Link href="/servicos#planos">planos e preços</Link>.
          </p>
        </section>
      </div>
      <FaqSection items={faq} eyebrow="Antes de chamar" />
    </>
  );
}
