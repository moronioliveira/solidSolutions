import Link from "next/link";
import { ArrowUpRight, Check, Minus, X } from "lucide-react";
import { comparison, type ComparisonValue } from "@/content/home";
import { SectionHeading } from "./section-heading";

const labels: Record<ComparisonValue, string> = {
  yes: "Sim",
  partial: "Depende",
  no: "Não",
};

function Mark({ value }: { value: ComparisonValue }) {
  const Icon = value === "yes" ? Check : value === "no" ? X : Minus;
  return (
    <span className={`mark mark-${value}`}>
      <Icon aria-hidden="true" />
      <span className="mark-label">{labels[value]}</span>
    </span>
  );
}

/**
 * Comparação com as alternativas mais comuns. Tabela real (acessível e fácil de
 * ler para buscadores e IA); no celular cada linha vira um card.
 */
export function ComparisonSection({ eyebrow = "04 / Compare antes de decidir" }: { eyebrow?: string }) {
  const [solid, ...others] = comparison.columns;
  return (
    <section className="comparison-section" aria-labelledby="comparison-title">
      <div className="section site-container">
        <SectionHeading
          id="comparison-title"
          eyebrow={eyebrow}
          title={
            <>
              O resultado de uma agência.
              <br />
              <span className="text-accent">A clareza de um preço fixo.</span>
            </>
          }
          description="Antes de decidir, compare com as alternativas que você provavelmente está considerando."
        />
        <div className="comparison-wrap" data-reveal>
          <table className="comparison-table">
            <caption className="sr-only">
              Comparação entre a Solid Solutions, construtores de sites e agências tradicionais
            </caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Critério</span>
                </th>
                <th scope="col" className="is-solid">
                  <span className="comparison-badge">Recomendado</span>
                  {solid}
                </th>
                {others.map((column) => (
                  <th scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">
                    {row.label}
                    {row.note && <small>{row.note}</small>}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={comparison.columns[index]}
                      className={index === 0 ? "is-solid" : undefined}
                      data-column={comparison.shortColumns[index]}
                    >
                      <Mark value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="comparison-footnote">
          <Minus size={13} aria-hidden="true" className="footnote-mark" /> Depende do plano ou é
          cobrado à parte. Comparação com o cenário mais comum de cada opção. Veja os{" "}
          <Link href="/servicos#planos">
            planos e preços <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
