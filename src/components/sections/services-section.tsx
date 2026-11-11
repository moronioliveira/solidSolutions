import Link from "next/link";
import { ArrowUpRight, ChartNoAxesCombined, Check, Globe, MousePointer2 } from "lucide-react";
import { services, type ServiceIcon } from "@/content/services";
import { SectionHeading } from "./section-heading";

export const serviceIcons: Record<ServiceIcon, typeof Globe> = {
  globe: Globe,
  pointer: MousePointer2,
  chart: ChartNoAxesCombined,
};

export function ServicesSection({ eyebrow = "01 / O que fazemos" }: { eyebrow?: string }) {
  return (
    <section className="solutions-section" aria-labelledby="services-title">
      <div className="section site-container">
        <SectionHeading
          id="services-title"
          eyebrow={eyebrow}
          title={
            <>
              Design que atrai.
              <br />
              Tecnologia que entrega.
            </>
          }
          description="Do site que apresenta sua empresa à campanha que traz clientes hoje. Cada serviço tem uma página com tudo o que está incluído."
        />
        <div className="solutions-grid">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article className="solution" key={service.slug} data-reveal>
                <Icon aria-hidden="true" />
                <h3>
                  <Link href={`/servicos/${service.slug}`}>{service.name}</Link>
                </h3>
                <p>{service.summary}</p>
                <ul>
                  {service.deliverables.slice(0, 3).map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/servicos/${service.slug}`}
                  className="text-cta"
                  aria-label={`Saiba mais sobre ${service.headline.toLowerCase()}`}
                >
                  Saiba mais <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
