import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";
import { SectionHeading } from "./section-heading";

interface FaqSectionProps {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
}

/**
 * Perguntas frequentes com <details> nativo: funciona sem JavaScript e
 * o texto das respostas fica no HTML para buscadores e assistentes de IA.
 */
export function FaqSection({
  items,
  eyebrow = "07 / Perguntas frequentes",
  title = "Dúvidas comuns antes de começar",
}: FaqSectionProps) {
  return (
    <section className="section site-container faq-section" id="perguntas-frequentes" aria-labelledby="faq-title">
      <SectionHeading id="faq-title" eyebrow={eyebrow} title={title} />
      <div className="faq-list" data-faq>
        {items.map((item) => (
          <details key={item.question} data-reveal>
            <summary>
              <h3>{item.question}</h3>
              <Plus aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
