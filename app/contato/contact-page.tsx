"use client";

import "@/components/contact/contact-page.css";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { SiteShell, PageIntro } from "@/components/layout";
import { Button } from "@/components/ui/actions/button";
import { whatsappUrl } from "@/lib/pricing";

const contactOptions = [
  {
    title: "Quero criar um site",
    message: "Olá! Quero criar um site para o meu negócio. Gostaria de conversar sobre as opções.",
  },
  {
    title: "Quero uma landing page",
    message: "Olá! Tenho interesse em uma landing page para o meu projeto. Gostaria de conversar.",
  },
  {
    title: "Ainda estou avaliando",
    message:
      "Olá! Estou avaliando uma solução digital para o meu negócio e gostaria de tirar algumas dúvidas.",
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <PageIntro
        label="CONTATO / VAMOS CONVERSAR"
        title="O próximo projeto pode ser o seu."
        description="Escolha o caminho que mais combina com o seu momento e fale diretamente comigo pelo WhatsApp."
      />
      <div className="site-container contact-layout">
        <aside className="contact-aside">
          <h2>Comece com uma boa conversa.</h2>
          <p>
            Seja para criar sua primeira presença digital ou dar um novo passo, quero entender o que
            você tem em mente.
          </p>
          <ul>
            <li>
              <Check />
              Proposta alinhada ao seu objetivo
            </li>
            <li>
              <Check />
              Design exclusivo para sua marca
            </li>
            <li>
              <Check />
              Comunicação direta, sem complicação
            </li>
          </ul>
          <div className="contact-whatsapp">
            <p>Prefere falar diretamente?</p>
            <Button asChild variant="outline">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                Abrir meu WhatsApp
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </aside>
        <section className="contact-options" aria-labelledby="contact-options-title">
          <span className="eyebrow">ESCOLHA UMA OPÇÃO</span>
          <h2 id="contact-options-title">Vamos tirar sua ideia do papel?</h2>
          <div className="contact-option-list">
            {contactOptions.map((option) => (
              <Button key={option.title} asChild className="primary-cta contact-option">
                <a href={whatsappUrl(option.message)} target="_blank" rel="noopener noreferrer">
                  {option.title}
                  <ArrowUpRight />
                </a>
              </Button>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
