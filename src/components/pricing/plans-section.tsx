import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarX2,
  ChartNoAxesCombined,
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { site } from "@/content/site";
import {
  adBudget,
  adManagement,
  businessProfile,
  commercialPlans,
  deliveryGuarantee,
  extraPage,
  formatBRL,
  getPlan,
  institutionalPlans,
  maintenance,
  marketSources,
  reportSubscription,
  type PricedPlan,
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

function slug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-");
}

function planMessage(name: string) {
  return `Olá! Conheci a Solid Solutions pelo site e tenho interesse no plano ${name}. Gostaria de conversar sobre meu projeto.`;
}

/** Cartão enxuto da página inicial: objetivo, preço, 4 itens e um botão. Detalhes ficam em /servicos. */
function CompactPlanCard({
  plan,
  heading,
  featured = false,
  fromPrice = false,
  priceNote = "pagamento único",
  cta,
  message,
}: {
  plan: PricedPlan;
  heading: string;
  featured?: boolean;
  fromPrice?: boolean;
  priceNote?: string;
  cta: string;
  message: string;
}) {
  const items = plan.highlights ?? plan.features.slice(0, 4);
  return (
    <article className={`plan-card plan-compact${featured ? " plan-featured" : ""}`} data-reveal>
      <header className="plan-head">
        <div className="plan-kicker">
          <span>{plan.goal}</span>
          {featured && (
            <span className="plan-badge">
              <ChartNoAxesCombined size={14} aria-hidden="true" /> Mais completo
            </span>
          )}
        </div>
        <h3>{heading}</h3>
      </header>
      <div className="plan-price">
        <MarketRange min={plan.market.min} />
        <span className="plan-our-price">{fromPrice ? "A partir de" : "Nosso preço"}</span>
        <strong>{formatBRL(plan.price)}</strong>
        <span>{priceNote}</span>
      </div>
      <ul className="plan-features">
        {items.map((feature) => (
          <li key={feature}>
            <Check size={16} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <WhatsAppLink
        location={`plano-${slug(plan.name)}`}
        message={message}
        className={`btn btn-lg plan-cta ${featured ? "btn-primary" : "btn-outline"}`}
      >
        {cta}
        <ArrowUpRight aria-hidden="true" />
      </WhatsAppLink>
    </article>
  );
}

/** Pacotes de site institucional por número de páginas. Usado em /servicos e na página do serviço. */
export function InstitutionalPackages({ location = "institucional" }: { location?: string }) {
  return (
    <div className="institutional" data-reveal>
      <div className="institutional-head">
        <span className="eyebrow">Site institucional / Preço por número de páginas</span>
        <h3>Mais de uma página? Escolha o tamanho do seu site.</h3>
        <p>
          Preço publicado, pagamento único e hospedagem inclusa. Precisa de mais páginas? Cada
          página extra custa {formatBRL(extraPage.price)}. Prazo de 15 dias a 1 mês, combinado na proposta.
        </p>
      </div>
      <div className="packages-grid packages-2">
        {institutionalPlans.map((plan, index) => (
          <article
            key={plan.name}
            className={`plan-card${index === 1 ? " plan-featured" : ""}`}
          >
            <header className="plan-head">
              <div className="plan-kicker">
                <span>Até {plan.pages} páginas</span>
                {index === 1 && (
                  <span className="plan-badge">
                    <ChartNoAxesCombined size={14} aria-hidden="true" /> Para buscas
                  </span>
                )}
              </div>
              <h4>{plan.name.replace("Institucional ", "")}</h4>
              <p className="plan-audience">{plan.audience}</p>
            </header>
            <div className="plan-price">
              <MarketRange min={plan.market.min} />
              <span className="plan-our-price">Nosso preço</span>
              <strong>{formatBRL(plan.price)}</strong>
              <span>pagamento único · até {plan.pages} páginas</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <WhatsAppLink
              location={`${location}-${slug(plan.name)}`}
              message={`Olá! Vi o pacote ${plan.name} (até ${plan.pages} páginas) no site da Solid Solutions e quero uma proposta.`}
              className={`btn btn-lg plan-cta ${index === 1 ? "btn-primary" : "btn-outline"}`}
            >
              Quero o pacote {plan.name.replace("Institucional ", "")}
              <ArrowUpRight aria-hidden="true" />
            </WhatsAppLink>
          </article>
        ))}
      </div>
    </div>
  );
}

/** Serviços avulsos: Google Meu Negócio e relatório de resultados. Só na versão completa. */
function Addons() {
  return (
    <div className="addons-grid">
      <article className="addon-card" data-reveal>
        <span className="eyebrow">Serviço avulso / Google Meu Negócio</span>
        <h3>Seu negócio no Google Maps</h3>
        <p>
          Criamos ou reivindicamos o Perfil da Empresa no Google e o deixamos completo, medido e
          pronto para receber avaliações.
        </p>
        <div className="addon-price">
          <strong>{formatBRL(businessProfile.price)}</strong>
          <span>configuração · pagamento único</span>
          <small>
            Gestão mensal opcional: {formatBRL(businessProfile.monthly)}/mês, sem fidelidade.
          </small>
        </div>
        <p className="addon-requirement">
          <MapPin size={14} aria-hidden="true" /> {businessProfile.requirement}
        </p>
        <div className="addon-actions">
          <WhatsAppLink
            location="google-meu-negocio"
            message="Olá! Tenho interesse na configuração do Google Meu Negócio da Solid Solutions. Podemos conversar?"
            className="btn btn-outline"
          >
            Quero meu perfil no Google <ArrowUpRight aria-hidden="true" />
          </WhatsAppLink>
          <Link href="/servicos/google-meu-negocio" className="text-cta">
            Saiba mais <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </article>
      <article className="addon-card" data-reveal>
        <span className="eyebrow">Adicional opcional / Relatório avulso</span>
        <h3>Relatório dos seus anúncios</h3>
        <p>
          Para quem já anuncia por conta própria: um relatório mensal em linguagem simples, com
          contatos, custo por contato e retorno. É só leitura, sem alterar suas campanhas.
        </p>
        <div className="addon-price">
          <strong>
            {formatBRL(reportSubscription.monthly)}
            <small>/mês</small>
          </strong>
          <span>+ {formatBRL(reportSubscription.installation)} de instalação, paga uma vez</span>
          <small>Sem fidelidade. A instalação inclui a conferência da medição de contatos.</small>
        </div>
        <div className="addon-actions">
          <WhatsAppLink
            location="relatorio-avulso"
            message="Olá! Tenho interesse no relatório mensal avulso de anúncios da Solid Solutions. Podemos conversar?"
            className="btn btn-outline"
          >
            Quero só o relatório <ArrowUpRight aria-hidden="true" />
          </WhatsAppLink>
          <a
            href={site.reportDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="demo"
            data-cta-location="relatorio-avulso"
            className="text-cta"
          >
            Ver exemplo <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </article>
    </div>
  );
}

interface PlansSectionProps {
  eyebrow?: string;
  /**
   * "summary": página inicial, 3 caminhos em cartões enxutos e link para os detalhes.
   * "full": /servicos, todos os planos, pacotes e adicionais.
   */
  variant?: "summary" | "full";
}

export function PlansSection({ eyebrow = "05 / Planos e preços", variant = "full" }: PlansSectionProps) {
  const maintenancePrice = formatBRL(maintenance.monthly);
  const singleChangePrice = formatBRL(maintenance.singleChange);
  const [essencial, performance] = commercialPlans;
  const start = institutionalPlans[0];
  const completo = institutionalPlans[1];

  if (variant === "summary") {
    return (
      <section className="plans-section" id="planos" aria-labelledby="plans-title">
        <div className="section site-container">
          <SectionHeading
            id="plans-title"
            eyebrow={eyebrow}
            title={
              <>
                Escolha pelo que você
                <br />
                quer conquistar.
              </>
            }
            description="Preço publicado, ao lado do que o mercado cobra. Pagamento único, hospedagem inclusa e mensalidades só se você quiser."
          />
          <div className="packages-grid packages-3">
            <CompactPlanCard
              plan={essencial}
              heading="Plano Essencial"
              cta="Quero o plano Essencial"
              message={planMessage(essencial.name)}
            />
            <CompactPlanCard
              plan={performance}
              heading="Plano Performance"
              featured
              cta="Quero o plano Performance"
              message={planMessage(performance.name)}
            />
            <CompactPlanCard
              plan={start}
              heading="Site institucional"
              fromPrice
              priceNote={`pagamento único · até ${start.pages} páginas`}
              cta="Quero um site institucional"
              message={`Olá! Quero uma proposta de site institucional da Solid Solutions. Vi os pacotes Start (até ${start.pages} páginas) e Completo (até ${completo.pages} páginas).`}
            />
          </div>
          <p className="plans-assurance" data-reveal>
            <BadgeCheck aria-hidden="true" />
            <span>
              <b>Garantia de entrega:</b> se não entregarmos no prazo combinado, devolvemos o que
              você pagou. Mensalidades opcionais e sem fidelidade.
            </span>
          </p>
          <div className="plans-others" data-reveal>
            <p className="plans-others-title">Outras opções</p>
            <ul>
              <li>
                <Link href="/servicos/google-ads">
                  <span>Google Ads, para quem já tem site</span>
                  <b>{formatBRL(getPlan("Google Ads").price)}</b>
                </Link>
              </li>
              <li>
                <Link href="/servicos/google-meu-negocio">
                  <span>Google Meu Negócio</span>
                  <b>{formatBRL(businessProfile.price)}</b>
                </Link>
              </li>
              <li>
                <Link href="/servicos/google-ads">
                  <span>Gestão de anúncios, com relatório mensal</span>
                  <b>{formatBRL(adManagement.monthly)}/mês</b>
                </Link>
              </li>
              <li>
                <Link href="/servicos/google-ads">
                  <span>Só o relatório dos anúncios</span>
                  <b>{formatBRL(reportSubscription.monthly)}/mês</b>
                </Link>
              </li>
            </ul>
            <Link href="/servicos#planos" className="text-cta">
              Ver todos os planos e adicionais <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

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
                <header className="plan-head">
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
                </header>
                <div className="plan-price">
                  <MarketRange min={plan.market.min} />
                  <span className="plan-our-price">Nosso preço</span>
                  <strong>{formatBRL(plan.price)}</strong>
                  <span>
                    pagamento único ·{" "}
                    {plan.name === "Google Ads"
                      ? "configuração da campanha"
                      : "desenvolvimento e configuração"}
                  </span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="plan-extra">
                  <div className="plan-choice">
                    <span className="eyebrow">Por que escolher</span>
                    <p>{plan.reason}</p>
                  </div>
                  {plan.requirement && <p className="plan-budget">{plan.requirement}</p>}
                  {hasAds && (
                    <p className="plan-budget">
                      A verba de anúncios é separada e paga diretamente ao Google. Sugestão inicial:{" "}
                      {formatBRL(adBudget.minimumDaily)} a {formatBRL(adBudget.maximumDaily)} por
                      dia.
                    </p>
                  )}
                </div>
                <WhatsAppLink
                  location={`plano-${slug(plan.name)}`}
                  message={planMessage(plan.name)}
                  className={`btn btn-lg plan-cta ${featured ? "btn-primary" : "btn-outline"}`}
                >
                  Quero o plano {plan.name}
                  <ArrowUpRight aria-hidden="true" />
                </WhatsAppLink>
              </article>
            );
          })}
        </div>
        <p className="plans-note" data-reveal>
          Pagamento único em todos os planos, com hospedagem inclusa nos planos com site, dentro dos
          limites do plano gratuito da plataforma. Manutenção e gestão de anúncios são opcionais,
          cobradas à parte e sem fidelidade.
        </p>

        <InstitutionalPackages />

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
              relatório mensal de resultados em linguagem simples, com contatos, custo por contato e
              retorno.
            </p>
            <a
              href={site.reportDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="demo"
              data-cta-location="gestao-ads"
              className="text-cta"
            >
              Ver exemplo do relatório <ArrowUpRight size={15} aria-hidden="true" />
            </a>
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

        <Addons />

        <div className="plans-details">
          <div className="maintenance-summary" data-reveal>
            <ShieldCheck aria-hidden="true" />
            <span className="eyebrow">Adicional opcional / Página</span>
            <h3>Manutenção mensal: {maintenancePrice}/mês</h3>
            <p>
              Cobrada à parte, fora do valor dos planos. Inclui monitoramento do site no ar, suporte
              e todas as pequenas alterações daquele mês (textos, fotos ou telefones). A hospedagem
              não entra nessa conta: já está inclusa nos planos com site. Sem fidelidade.
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
          campanha. Nos sites institucionais, referência de 5 páginas para o Start e de site
          completo, com blog e formulários, para o Completo.
        </p>
      </div>
    </section>
  );
}
