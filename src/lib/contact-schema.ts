import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100),
  email: z.string().trim().email("Informe um e-mail válido.").max(255),
  company: z.string().trim().max(150),
  service: z.enum(["Site institucional", "Landing page", "Ainda não sei"]),
  message: z.string().trim().min(10, "Conte um pouco mais sobre seu projeto.").max(3000),
  website: z.string().max(0),
});