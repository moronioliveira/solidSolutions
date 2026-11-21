/** Nome de campanha aceito na referência: letras, números, hífen e sublinhado (evita injetar texto estranho na mensagem). */
const SAFE_CAMPAIGN = /^[A-Za-z0-9_-]{1,30}$/;

/**
 * Acrescenta "(ref. C1)" ao fim da mensagem de um link wa.me quando a visita veio de uma campanha paga
 * (utm_campaign = c1). Assim o contato no WhatsApp pode ser ligado à campanha. Visitas orgânicas e
 * links que já têm referência ficam intactos.
 */
export function withCampaignRef(href: string, campaign: string): string {
  if (!campaign || campaign === "organico" || !SAFE_CAMPAIGN.test(campaign)) return href;
  if (!href.includes("wa.me/") || !href.includes("text=")) return href;
  try {
    if (decodeURIComponent(href).includes("(ref. ")) return href;
  } catch {
    return href;
  }
  return `${href}${encodeURIComponent(` (ref. ${campaign.toUpperCase()})`)}`;
}
