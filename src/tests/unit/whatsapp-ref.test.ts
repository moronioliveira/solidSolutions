import { describe, expect, it } from "vitest";
import { whatsappUrl } from "@/lib/pricing/commercial";
import { withCampaignRef } from "@/lib/whatsapp-ref";

describe("withCampaignRef", () => {
  const href = whatsappUrl("Olá! Quero um site.");

  it("appends the campaign reference to the message", () => {
    const result = withCampaignRef(href, "c1");
    const text = new URL(result).searchParams.get("text");
    expect(text).toBe("Olá! Quero um site. (ref. C1)");
  });

  it("keeps organic visits untouched", () => {
    expect(withCampaignRef(href, "organico")).toBe(href);
    expect(withCampaignRef(href, "")).toBe(href);
  });

  it("does not add the reference twice", () => {
    const once = withCampaignRef(href, "c1");
    expect(withCampaignRef(once, "c1")).toBe(once);
  });

  it("ignores unsafe campaign names and non-WhatsApp links", () => {
    expect(withCampaignRef(href, "c1) <script>")).toBe(href);
    expect(withCampaignRef("https://example.com/?text=oi", "c1")).toBe("https://example.com/?text=oi");
  });
});
