import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

export function FloatingWhatsApp() {
  return (
    <WhatsAppLink
      location="flutuante"
      className="whatsapp-float"
      aria-label="Conversar com a Solid Solutions pelo WhatsApp"
    >
      <MessageCircle aria-hidden="true" />
      <span className="whatsapp-float-label" aria-hidden="true">
        Fale no WhatsApp
      </span>
    </WhatsAppLink>
  );
}
