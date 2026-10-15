import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check, CheckCircle2, Loader2 } from "lucide-react";
import { SiteShell, PageIntro, pageHead } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/contact-schema";
import { submitContact } from "@/lib/contact.functions";
export const Route = createFileRoute("/contato")({ head: () => pageHead("Vamos criar seu projeto", "Conte sua ideia à Solid Solutions e solicite uma proposta para seu site ou landing page. Vamos construir sua próxima experiência digital."), component: Contact });
function Contact() {
  const submit = useServerFn(submitContact);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Confira os campos."); return; }
    setPending(true); setError("");
    try { const result = await submit({ data: parsed.data }); if (result.ok) setSent(true); else setError(result.error ?? "Não foi possível enviar."); }
    catch { setError("Não foi possível enviar. Tente novamente em instantes."); }
    finally { setPending(false); }
  }
  return <SiteShell><PageIntro label="CONTATO / VAMOS CONVERSAR" title="O próximo projeto pode ser o seu." description="Conte sobre sua ideia, seu negócio e o que você quer conquistar. Vamos encontrar a melhor solução juntos." /><div className="site-container contact-layout"><aside className="contact-aside"><h2>Comece com uma boa conversa.</h2><p>Seja para criar sua primeira presença digital ou dar um novo passo, queremos entender o que você tem em mente.</p><ul><li><Check />Proposta alinhada ao seu objetivo</li><li><Check />Design exclusivo para sua marca</li><li><Check />Comunicação direta, sem complicação</li></ul></aside>{sent ? <div className="form-success" role="status"><CheckCircle2 /><h2>Ideia recebida.</h2><p>Seu pedido de projeto foi registrado com sucesso.</p><Button variant="outline" onClick={() => setSent(false)}>Enviar outra ideia <ArrowUpRight /></Button></div> : <form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label className="form-field">Seu nome *<input required name="name" minLength={2} maxLength={100} autoComplete="name" placeholder="Como podemos chamar você?" /></label><label className="form-field">E-mail *<input required type="email" name="email" maxLength={255} autoComplete="email" placeholder="voce@empresa.com" /></label></div><label className="form-field">Empresa<input name="company" maxLength={150} autoComplete="organization" placeholder="Nome do seu negócio (opcional)" /></label><label className="form-field">O que você precisa? *<select name="service" defaultValue="Site institucional"><option>Site institucional</option><option>Landing page</option><option>Ainda não sei</option></select></label><label className="form-field">Conte sobre seu projeto *<textarea required name="message" minLength={10} maxLength={3000} placeholder="Qual é a sua ideia e o principal objetivo do projeto?" /></label><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" defaultValue="" /><p className="form-privacy">Os dados informados serão usados exclusivamente para tratar do seu pedido de projeto.</p>{error && <p role="alert" className="form-error">{error}</p>}<Button className="primary-cta justify-self-start" disabled={pending} type="submit">{pending ? <><Loader2 className="animate-spin" />Enviando...</> : <>Enviar meu projeto <ArrowUpRight /></>}</Button></form>}</div></SiteShell>;
}