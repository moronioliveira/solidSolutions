import { describe, expect, it } from "vitest";
import { adBudget, adManagement, commercialPlans, whatsappUrl } from "@/lib/commercial";

describe("Commercial terms", () => {
  it("prices Essencial at R$250 once instead of R$450, plus R$50 monthly", () => {
    expect(commercialPlans[0]).toMatchObject({ name: "Essencial", originalPrice: 450, price: 250, monthly: 50 });
  });
  it("prices Performance at R$550 once instead of R$750, plus R$50 monthly", () => {
    expect(commercialPlans[1]).toMatchObject({ name: "Performance", originalPrice: 750, price: 550, monthly: 50 });
  });
  it("prices optional management at R$150 instead of R$250, additional to maintenance", () => {
    expect(adManagement).toEqual({ originalMonthly: 250, monthly: 150 });
    expect(adManagement.monthly + commercialPlans[1].monthly).toBe(200);
  });
  it("recommends a separate R$10–20 daily advertising budget", () => {
    expect(adBudget).toEqual({ minimumDaily: 10, maximumDaily: 20 });
  });
  it("opens the supplied WhatsApp number with the selected plan message", () => {
    const message = "Olá! Tenho interesse no plano Performance.";
    const url = new URL(whatsappUrl(message));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/5586994291131");
    expect(url.searchParams.get("text")).toBe(message);
  });
});