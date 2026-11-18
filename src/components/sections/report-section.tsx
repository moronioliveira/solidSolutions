import { ArrowUpRight, Check } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { reportExample, reportSection } from "@/content/report";
import { site } from "@/content/site";
import { formatBRL, reportSubscription } from "@/lib/pricing/commercial";

interface ReportSectionProps {
  eyebrow?: string;
  /** Local do botão, para o rastreamento (ex.: "home", "google-ads"). */
  location?: string;
}

/**
 * Prova de transparência: mostra o relatório que o cliente recebe, com dados fictícios sempre
 * identificados como tal. O botão leva à demonstração pública do Painel Solid.
 */
export function ReportSection({
  eyebrow = reportSection.eyebrow,
  location = "home",
}: ReportSectionProps) {
  const max = Math.max(...reportExample.weeks.map((week) => week.value));
  return (
    <section className="report-section" aria-labelledby="report-title">
      <div className="section site-container report-grid">
        <div className="report-copy" data-reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 id="report-title">{reportSection.title}</h2>
          <p className="section-description">{reportSection.description}</p>
          <ul className="report-points">
            {reportSection.points.map((point) => (
              <li key={point}>
                <Check size={16} aria-hidden="true" /> {point}
              </li>
            ))}
          </ul>
          <div className="report-actions">
            <a
              href={site.reportDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="demo"
              data-cta-location={`relatorio-${location}`}
              className="btn btn-primary btn-lg"
            >
              Ver o relatório de exemplo <ArrowUpRight aria-hidden="true" />
            </a>
            <WhatsAppLink
              location={`relatorio-${location}`}
              message="Olá! Vi o relatório de exemplo no site da Solid Solutions e quero acompanhar meus anúncios assim."
              className="text-cta"
            >
              Quero acompanhar meus anúncios assim <ArrowUpRight size={16} aria-hidden="true" />
            </WhatsAppLink>
          </div>
          <p className="report-alone">
            Já anuncia por conta própria? Receba só o relatório:{" "}
            <b>{formatBRL(reportSubscription.monthly)}/mês</b> + {formatBRL(reportSubscription.installation)}{" "}
            de instalação, sem fidelidade.
          </p>
          <p className="report-note">{reportSection.note}</p>
        </div>
        <figure className="report-preview" data-reveal>
          <span className="report-tag">Exemplo com dados fictícios</span>
          <div className="report-paper">
            <p className="report-kicker">{reportExample.title}</p>
            <p className="report-business">{reportExample.business}</p>
            <p className="report-hero-number">
              <strong>{reportExample.contacts}</strong>
              <span>{reportExample.contactsLabel}</span>
            </p>
            <dl className="report-stats">
              <div>
                <dt>Cada contato custou</dt>
                <dd>{reportExample.costPerContact}</dd>
              </div>
              <div>
                <dt>Investido no Google</dt>
                <dd>{reportExample.invested}</dd>
              </div>
              <div>
                <dt>Cada R$ 1 voltou como</dt>
                <dd>{reportExample.returnPerReal}</dd>
              </div>
            </dl>
            <p className="report-trend">▲ {reportExample.trend}</p>
            <ol className="report-weeks" aria-label="Contatos por semana">
              {reportExample.weeks.map((week) => (
                <li key={week.label}>
                  <span className="sr-only">
                    {week.label}: {week.value} contatos
                  </span>
                  <b aria-hidden="true">{week.value}</b>
                  <i
                    aria-hidden="true"
                    style={{ "--h": `${Math.round((week.value / max) * 100)}%` } as React.CSSProperties}
                  />
                  <small aria-hidden="true">{week.label.replace("Dias ", "")}</small>
                </li>
              ))}
            </ol>
          </div>
          <figcaption className="sr-only">
            Exemplo de relatório mensal de anúncios, com dados fictícios.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
