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
    return { ok: true, error: null };
  });