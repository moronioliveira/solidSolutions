import { ArrowUpRight, Check, ChartNoAxesCombined, MessageCircle, ShieldCheck } from "lucide-react";
import "./plans-section.css";
import { Button } from "@/components/ui/actions/button";
import { adBudget, adManagement, commercialPlans, formatBRL, whatsappUrl } from "@/lib/pricing/commercial";

export function PlansSection() {
  return (
    <section className="plans-section" id="planos" aria-labelledby="plans-title">
      <div className="section site-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PLANOS / PRESENÇA DIGITAL + AQUISIÇÃO</span>
            <h2 id="plans-title">
              O plano certo para
              <br />o seu próximo passo.
            </h2>
          </div>
          <p className="plans-intro">
            Uma base profissional para seu negócio. Uma escolha clara para cada objetivo.
          </p>
        </div>
        <div className="plans-grid">
          {commercialPlans.map((plan, index) => (
            <article
              className={`plan-card ${index === 1 ? "plan-performance" : ""}`}
              key={plan.name}
            >
              <div className="plan-kicker">
                <span>
                  0{index + 1} / {plan.purpose}
                </span>
                {index === 1 && <ChartNoAxesCombined size={20} />}
              </div>
              <h3>{plan.name}</h3>
              <p className="plan-audience">{plan.audience}</p>
              <div className="plan-price">
                <span className="plan-old-price">
                  De <s>{formatBRL(plan.originalPrice)}</s> por
                </span>
                <strong>{formatBRL(plan.price)}</strong>
                <span>pagamento único · desenvolvimento e configuração</span>
                <p>
                  + <b>{formatBRL(plan.monthly)}/mês</b> de manutenção e suporte
                </p>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="plan-choice">
                <span className="eyebrow">POR QUE ESCOLHER</span>
                <p>{plan.reason}</p>
              </div>
              {index === 1 && (
                <p className="plan-budget">
                  A verba de anúncios é separada, paga diretamente ao Google. Sugestão inicial:{" "}
                  {formatBRL(adBudget.minimumDaily)} a {formatBRL(adBudget.maximumDaily)}/dia.
                </p>
              )}
              <Button
                asChild
                variant={index === 1 ? "default" : "outline"}
                className="primary-cta plan-cta"
              >
                <a
                  href={whatsappUrl(
                    `Olá! Conheci a Solid Solutions pelo site e tenho interesse no plano ${plan.name}. Gostaria de conversar sobre meu projeto.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conversar sobre o {plan.name}
                  <ArrowUpRight />
                </a>
              </Button>
            </article>
          ))}
        </div>
        <div className="management-band">
          <div>
            <span className="eyebrow">ADICIONAL OPCIONAL / GOOGLE ADS</span>
            <h3>Gestão contínua de anúncios.</h3>
            <p>
              Para quem quer acompanhamento após a configuração da campanha: otimização semanal de
              palavras-chave, bloqueio de termos irrelevantes, ajuste de lances e relatório mensal
              de cliques e contatos no WhatsApp.
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
              Adicional à manutenção de R$ 50/mês.
              <br />
              Total dos serviços: {formatBRL(adManagement.monthly + commercialPlans[1].monthly)}
              /mês, sem a verba de anúncios.
            </p>
            <Button asChild variant="outline">
              <a
                href={whatsappUrl(
                  "Olá! Tenho interesse na gestão mensal de anúncios da Solid Solutions. Podemos conversar?",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero acompanhamento
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
        <div className="plans-details">
          <div className="maintenance-summary">
            <ShieldCheck />
            <h3>O que está nos R$ 50/mês?</h3>
            <p>
              Hospedagem de alta velocidade, certificado SSL (HTTPS), monitoramento do site no ar e
              suporte para pequenas alterações de textos, fotos ou números de telefone.
            </p>
          </div>
          <div className="plans-faq">
            <details>
              <summary>Preciso contratar a gestão mensal?</summary>
              <p>
                Não. É um adicional opcional para acompanhar e otimizar campanhas continuamente. O
                Performance já inclui a configuração inicial; a gestão contínua custa R$ 150/mês à
                parte.
              </p>
            </details>
            <details>
              <summary>Os anúncios estão incluídos no preço?</summary>
              <p>
                Não. Você define a verba e paga diretamente ao Google, por cartão ou boleto.
                Recomendamos começar com R$ 10 a R$ 20 por dia, além dos valores dos serviços.
              </p>
            </details>
            <details>
              <summary>Há garantia de contatos ou de posição no Google?</summary>
              <p>
                Não. O trabalho prepara sua presença digital e suas campanhas; os resultados
                dependem da procura, da concorrência, da oferta e da verba investida.
              </p>
            </details>
          </div>
        </div>
        <div className="plans-help">
          <p>Ainda em dúvida sobre qual caminho seguir?</p>
          <Button asChild variant="ghost">
            <a
              href={whatsappUrl(
                "Olá! Gostaria de ajuda para escolher entre os planos Essencial e Performance da Solid Solutions.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} />
              Vamos escolher juntos
              <ArrowUpRight size={16} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}