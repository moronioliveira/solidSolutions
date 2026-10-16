import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact-schema";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { website: _website, ...submission } = data;
    const { error } = await supabaseAdmin.from("contact_submissions").insert(submission);
    if (error) {
      if (error.message.includes("Aguarde")) return { ok: false, error: "Aguarde um minuto antes de enviar novamente." };
      return { ok: false, error: "Não foi possível enviar. Tente novamente em instantes." };
    }
    const webhook = process.env["DISCORD_WEBHOOK_URL"];
    if (webhook) {
      const clip = (v: string, n = 1000) => (v.length > n ? `${v.slice(0, n)}…` : v) || "—";
      try {
        const res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Solid Solutions",
            allowed_mentions: { parse: [] },
            embeds: [{
              title: "Novo pedido de projeto pelo site",
              color: 0xf59e0b,
              fields: [
                { name: "Nome", value: clip(submission.name, 256), inline: true },
                { name: "Empresa", value: clip(submission.company ?? "", 256), inline: true },
                { name: "Serviço", value: clip(submission.service, 256), inline: true },
                { name: "E-mail", value: clip(submission.email, 256) },
                { name: "Mensagem", value: clip(submission.message) },
              ],
              timestamp: new Date().toISOString(),
            }],
          }),
        });
        if (!res.ok) console.error("Discord webhook failed", res.status);
      } catch (e) {
        console.error("Discord webhook error", e);
      }
    }
    return { ok: true, error: null };
  });