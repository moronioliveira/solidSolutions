import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactPage from "./contact-page";

export const metadata: Metadata = pageMetadata(
  "Solicite um orçamento para seu site",
  "Conte sobre seu projeto e receba uma proposta para criar um site institucional ou landing page com a Solid Solutions.",
  "/contato",
);

export default ContactPage;
