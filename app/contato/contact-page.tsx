"use client";

import "@/components/contact/contact-page.css";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { SiteShell, PageIntro } from "@/components/layout";
import { Button } from "@/components/ui/actions/button";
import { contactSchema } from "@/lib/forms";
import { whatsappUrl } from "@/lib/pricing";
export default function ContactPage() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Confira os campos.");
      return;
    }
    setPending(true);
    setError("");
    try {
      if (parsed.data.website) {
        setSent(true);
        return;
      }
      const { website: _website, ...row } = parsed.data;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
      const result = (await response.json()) as { message?: string };
      if (response.ok) setSent(true);
      else setError(result.message ?? "Não foi possível enviar. Tente novamente em instantes.");
    } catch {
      setError("Não foi possível enviar. Tente novamente em instantes.");
    } finally {
      setPending(false);
    }
  }

  return (
    <SiteShell>
      <PageIntro
        label="CONTATO / VAMOS CONVERSAR"
        title="O próximo projeto pode ser o seu."
        description="Conte sobre sua ideia, seu negócio e o que você quer conquistar. Vamos encontrar a melhor solução juntos."
      />
      <div className="site-container contact-layout">
        <aside className="contact-aside">
          <h2>Comece com uma boa conversa.</h2>
          <p>
            Seja para criar sua primeira presença digital ou dar um novo passo, queremos entender o
            que você tem em mente.
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
            <p>Prefere conversar diretamente?</p>
            <Button asChild variant="outline">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                Conversar pelo WhatsApp
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </aside>
        {sent ? (
          <div className="form-success" role="status">
            <CheckCircle2 />
            <h2>Ideia recebida.</h2>
            <p>Seu pedido de projeto foi registrado com sucesso.</p>
            <div className="success-actions">
              <Button asChild>
                <a
                  href={whatsappUrl(
                    "Olá! Acabei de enviar meu pedido de projeto pelo site da Solid Solutions e gostaria de continuar a conversa por aqui.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle />
                  Continuar no WhatsApp
                  <ArrowUpRight />
                </a>
              </Button>
              <Button variant="outline" onClick={() => setSent(false)}>
                Enviar outra ideia <ArrowUpRight />
              </Button>
            </div>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-field">
                Seu nome *
                <input
                  required
                  name="name"
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Como podemos chamar você?"
                />
              </label>
              <label className="form-field">
                E-mail *
                <input
                  required
                  type="email"
                  name="email"
                  maxLength={255}
                  autoComplete="email"
                  placeholder="voce@empresa.com"
                />
              </label>
            </div>
            <label className="form-field">
              Empresa
              <input
                name="company"
                maxLength={150}
                autoComplete="organization"
                placeholder="Nome do seu negócio (opcional)"
              />
            </label>
            <label className="form-field">
              O que você precisa? *
              <select name="service" defaultValue="Site institucional">
                <option>Site institucional</option>
                <option>Landing page</option>
                <option>Ainda não sei</option>
              </select>
            </label>
            <label className="form-field">
              Conte sobre seu projeto *
              <textarea
                required
                name="message"
                minLength={10}
                maxLength={3000}
                placeholder="Qual é a sua ideia e o principal objetivo do projeto?"
              />
            </label>
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              defaultValue=""
            />
            <p className="form-privacy">
              Os dados informados serão usados exclusivamente para tratar do seu pedido de projeto.
            </p>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <Button className="primary-cta justify-self-start" disabled={pending} type="submit">
              {pending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar meu projeto <ArrowUpRight />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </SiteShell>
  );
}
