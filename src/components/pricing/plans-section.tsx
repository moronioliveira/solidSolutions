import {
  ArrowUpRight,
  BadgeCheck,
  CalendarX2,
  ChartNoAxesCombined,
  Check,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import {
  adBudget,
  adManagement,
  commercialPlans,
  deliveryGuarantee,
  formatBRL,
  maintenance,
  marketSources,
} from "@/lib/pricing/commercial";

function MarketRange({ min, suffix = "" }: { min: number; suffix?: string }) {
  return (
    <span className="plan-market">
      No mercado: a partir de{" "}
      <b>
        {formatBRL(min)}
        {suffix}
      </b>
    </span>
  );
}

export function PlansSection({ eyebrow = "05 / Planos e preços" }: { eyebrow?: string }) {
  const maintenancePrice = formatBRL(maintenance.monthly);
  const singleChangePrice = formatBRL(maintenance.singleChange);
  return (
    <section className="plans-section" id="planos" aria-labelledby="plans-title">
      <div className="section site-container">
        <SectionHeading
          id="plans-title"
          eyebrow={eyebrow}
          title={
            <>
              Preço claro para
              <br />o seu próximo passo.
            </>
          }
          description="Valores publicados, sem letras miúdas, ao lado do preço inicial praticado no mercado. Escolha pelo seu objetivo: presença profissional, campanhas no Google ou os dois."
        />
        <div className="plans-grid">
          {commercialPlans.map((plan) => {
            const featured = plan.name === "Performance";
            const hasAds = plan.name !== "Essencial";
            return (
              <article
                className={`plan-card${featured ? " plan-featured" : ""}`}
                key={plan.name}
                data-reveal
              >
                <div className="plan-kicker">
                  <span>{plan.purpose}</span>
                  {featured && (
                    <span className="plan-badge">
                      <ChartNoAxesCombined size={14} aria-hidden="true" /> Mais completo
                    </span>
                  )}
                </div>
                <h3>Plano {plan.name}</h3>
                <p className="plan-audience">{plan.audience}</p>
                <div className="plan-price">
                  <MarketRange min={plan.market.min} />
                  <span className="plan-our-price">Nosso preço</span>
                  <strong>{formatBRL(plan.price)}</strong>
                  <span>
                    pagamento único ·{" "}
                    {hasAds && plan.name === "Google Ads"
                      ? "configuração da campanha"
                      : "desenvolvimento e configuração"}
                  </span>
                  <p className="plan-price-note">
                    Mensalidades não estão incluídas: manutenção e gestão de anúncios são adicionais
                    opcionais.
                  </p>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="plan-choice">
                  <span className="eyebrow">Por que escolher</span>
                  <p>{plan.reason}</p>
                </div>
                {plan.requirement && <p className="plan-budget">{plan.requirement}</p>}
                {hasAds && (
                  <p className="plan-budget">
                    A verba de anúncios é separada e paga diretamente ao Google. Sugestão inicial:{" "}
                    {formatBRL(adBudget.minimumDaily)} a {formatBRL(adBudget.maximumDaily)} por dia.
                  </p>
                )}
                <WhatsAppLink
                  location={`plano-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
                  message={`Olá! Conheci a Solid Solutions pelo site e tenho interesse no plano ${plan.name}. Gostaria de conversar sobre meu projeto.`}
                  className={`btn btn-lg plan-cta ${featured ? "btn-primary" : "btn-outline"}`}
                >
                  Quero o plano {plan.name}
                  <ArrowUpRight aria-hidden="true" />
                </WhatsAppLink>
              </article>
            );
          })}
        </div>
        <ul className="plan-guarantees" data-reveal>
          <li>
            <BadgeCheck aria-hidden="true" />
            <span>
              <b>Garantia de entrega:</b> campanha no ar em até {deliveryGuarantee.adsDays} dias
              úteis depois de recebermos os acessos, e páginas no prazo da proposta. Se não
              entregarmos, devolvemos o valor pago.
            </span>
          </li>
          <li>
            <CalendarX2 aria-hidden="true" />
            <span>
              <b>Sem fidelidade:</b> a gestão mensal pode ser cancelada quando você quiser, com
              aviso de 30 dias.
            </span>
          </li>
        </ul>
        <div className="management-band" data-reveal>
          <div>
            <span className="eyebrow">Adicional opcional / Google Ads · cobrado à parte</span>
            <h3>Gestão contínua de anúncios</h3>
            <p>
              Para quem quer acompanhamento depois da configuração da campanha: revisão semanal dos
              termos pesquisados, bloqueio de buscas irrelevantes, ajuste de lances e anúncios e
              relatório mensal de cliques e contatos no WhatsApp.
            </p>
          </div>
          <div className="management-price">
            <MarketRange min={adManagement.market.min} suffix="/mês" />
            <span className="plan-our-price">Nosso preço</span>
            <strong>
              {formatBRL(adManagement.monthly)}
              <small>/mês</small>
            </strong>
            <p>
              Cobrada à parte, fora do valor dos planos. Sem fidelidade. Não inclui a verba de
              anúncios, que é paga direto ao Google.
            </p>
            <WhatsAppLink
              location="gestao-ads"
              message="Olá! Tenho interesse na gestão mensal de anúncios da Solid Solutions. Podemos conversar?"
              className="btn btn-outline"
            >
              Quero acompanhamento
              <ArrowUpRight aria-hidden="true" />
            </WhatsAppLink>
          </div>
        </div>
        <div className="plans-details">
          <div className="maintenance-summary" data-reveal>
            <ShieldCheck aria-hidden="true" />
            <span className="eyebrow">Adicional opcional / Página</span>
            <h3>Manutenção mensal: {maintenancePrice}/mês</h3>
            <p>
              Cobrada à parte, fora do valor dos planos. Inclui hospedagem gerenciada com HTTPS e
              monitoramento do site no ar. Você paga {maintenancePrice} uma vez por mês e todas as
              pequenas alterações daquele mês (textos, fotos ou telefones) já estão incluídas. Sem
              fidelidade.
            </p>
            <p className="maintenance-single">
              Sem a manutenção, cada alteração na página custa <b>{singleChangePrice}</b>.
            </p>
          </div>
          <div className="plans-help" data-reveal>
            <p>Ainda em dúvida sobre qual caminho seguir?</p>
            <WhatsAppLink
              location="ajuda-planos"
              message="Olá! Gostaria de ajuda para escolher um plano da Solid Solutions."
              className="text-cta"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Vamos escolher juntos
              <ArrowUpRight size={16} aria-hidden="true" />
            </WhatsAppLink>
          </div>
        </div>
        <p className="plans-sources">
          Preços de mercado: valores iniciais de referências públicas de preços praticados no Brasil
          em 2026 (
          {marketSources.map((source, index) => (
            <span key={source.url}>
              {index > 0 && "; "}
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </span>
          ))}
          ). No plano Performance, soma dos valores iniciais de landing page e de configuração de
          campanha.
        </p>
      </div>
    </section>
  );
}
