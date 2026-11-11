import { ArrowUpRight, ChartNoAxesCombined, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { adBudget, adManagement, commercialPlans, formatBRL } from "@/lib/pricing/commercial";

export function PlansSection({ eyebrow = "05 / Planos e preços" }: { eyebrow?: string }) {
  const maintenance = formatBRL(commercialPlans[0].monthly);
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
          description="Valores publicados, sem letras miúdas. Escolha pelo seu objetivo: presença profissional ou campanhas no Google."
        />
        <div className="plans-grid">
          {commercialPlans.map((plan, index) => {
            const featured = index === 1;
            return (
              <article className={`plan-card${featured ? " plan-featured" : ""}`} key={plan.name} data-reveal>
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
                  <span className="plan-old-price">
                    De <s>{formatBRL(plan.originalPrice)}</s> por
                  </span>
                  <strong>{formatBRL(plan.price)}</strong>
                  <span>pagamento único · desenvolvimento e configuração</span>
                  <p>
                    + <b>{formatBRL(plan.monthly)}/mês</b> de hospedagem, manutenção e suporte
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
                {featured && (
                  <p className="plan-budget">
                    A verba de anúncios é separada e paga diretamente ao Google. Sugestão inicial:{" "}
                    {formatBRL(adBudget.minimumDaily)} a {formatBRL(adBudget.maximumDaily)} por dia.
                  </p>
                )}
                <WhatsAppLink
                  location={`plano-${plan.name.toLowerCase()}`}
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
        <div className="management-band" data-reveal>
          <div>
            <span className="eyebrow">Adicional opcional / Google Ads</span>
            <h3>Gestão contínua de anúncios</h3>
            <p>
              Para quem quer acompanhamento depois da configuração da campanha: otimização semanal
              de palavras-chave, bloqueio de termos irrelevantes, ajuste de lances e relatório
              mensal de cliques e contatos no WhatsApp.
            </p>
          </div>
          <div className="management-price">
            <span>
              De <s>{formatBRL(adManagement.originalMonthly)}/mês</s> por
            </span>
            <strong>
              {formatBRL(adManagement.monthly)}
              <small>/mês</small>
            </strong>
            <p>
              Adicional à manutenção de {maintenance}/mês. Total dos serviços:{" "}
              {formatBRL(adManagement.monthly + commercialPlans[1].monthly)}/mês, sem a verba de
              anúncios.
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
            <h3>O que está nos {maintenance}/mês?</h3>
            <p>
              Hospedagem de alta velocidade, certificado SSL (HTTPS), monitoramento do site no ar e
              suporte para pequenas alterações de textos, fotos ou telefones.
            </p>
          </div>
          <div className="plans-help" data-reveal>
            <p>Ainda em dúvida sobre qual caminho seguir?</p>
            <WhatsAppLink
              location="ajuda-planos"
              message="Olá! Gostaria de ajuda para escolher entre os planos Essencial e Performance da Solid Solutions."
              className="text-cta"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Vamos escolher juntos
              <ArrowUpRight size={16} aria-hidden="true" />
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
