import { differentials } from "@/content/home";
import { SectionHeading } from "./section-heading";

export function DifferentialsSection({ eyebrow = "03 / Nossos diferenciais" }: { eyebrow?: string }) {
  return (
    <section className="section site-container" aria-labelledby="differentials-title">
      <SectionHeading
        id="differentials-title"
        eyebrow={eyebrow}
        title={
          <>
            Bonito é o mínimo.
            <br />
            <span className="text-accent">Ser encontrado</span> é o objetivo.
          </>
        }
        description="Todo projeto sai com a base técnica que o Google e os assistentes de IA usam para decidir quem aparecer."
      />
      <div className="differentials-grid">
        {differentials.map((item, index) => (
          <article className="differential" key={item.title} data-reveal>
            <span className="differential-index">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
