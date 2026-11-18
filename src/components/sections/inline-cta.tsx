import { ArrowUpRight } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

interface InlineCtaProps {
  /** Local do botão, para o rastreamento. */
  location: string;
  title: string;
  label: string;
  message: string;
}

/**
 * Chamada curta entre as seções. Cada bloco de prova (projetos, comparação, relatório) termina
 * com um botão ao alcance, para o visitante convencido não precisar rolar até o fim da página.
 */
export function InlineCta({ location, title, label, message }: InlineCtaProps) {
  return (
    <div className="site-container inline-cta" data-reveal>
      <p>{title}</p>
      <WhatsAppLink location={location} message={message} className="btn btn-primary">
        {label} <ArrowUpRight aria-hidden="true" />
      </WhatsAppLink>
    </div>
  );
}
