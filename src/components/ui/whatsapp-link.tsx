import type { AnchorHTMLAttributes, ReactNode } from "react";
import { whatsappUrl } from "@/lib/pricing/commercial";

interface WhatsAppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Onde o botão está na página. Vai para o evento `whatsapp_click` no dataLayer. */
  location: string;
  message?: string;
  children: ReactNode;
}

/** Link para o WhatsApp com mensagem pronta e marcação para rastreamento de conversão. */
export function WhatsAppLink({ location, message, children, ...props }: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-cta-location={location}
      {...props}
    >
      {children}
    </a>
  );
}
