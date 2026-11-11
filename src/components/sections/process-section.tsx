import { ArrowUpRight, Code2, MessagesSquare, PenTool, Rocket } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { processSteps } from "@/content/home";
import { SectionHeading } from "./section-heading";

const icons = { chat: MessagesSquare, pen: PenTool, code: Code2, rocket: Rocket };

/**
 * Linha do tempo do processo. Cada etapa mostra o que o cliente recebe,
 * para deixar claro que não existe etapa "no escuro".
 */
export function ProcessSection({ eyebrow = "06 / Como trabalhamos" }: { eyebrow?: string }) {
  return (
    <section className="process-section" aria-labelledby="process-title">
      <div className="section site-container">
        <SectionHeading
          id="process-title"
          eyebrow={eyebrow}
          title={
            <>
              Do primeiro contato ao site no ar.
              <br />
              <span className="text-accent">Sem complicar.</span>
            </>
          }
          description="Quatro etapas, cada uma com uma entrega concreta. Você acompanha tudo pelo WhatsApp e só segue para a próxima quando aprovar."
        />
        <ol className="process-timeline">
          {processSteps.map((step, index) => {
            const Icon = icons[step.icon];
            return (
              <li className="process-step" key={step.title} data-reveal>
                <div className="process-node" aria-hidden="true">
                  <Icon />
                </div>
                <div className="process-card">
                  <span className="process-number">Etapa 0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <p className="process-deliverable">
                    <span>Você recebe</span>
                    {step.deliverable}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="process-cta" data-reveal>
          <p>
            A primeira etapa é uma conversa. <strong>Sem custo e sem compromisso.</strong>
          </p>
          <WhatsAppLink location="processo" className="btn btn-primary">
            Começar pela etapa 01 <ArrowUpRight aria-hidden="true" />
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
