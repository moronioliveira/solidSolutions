import { describe, expect, it } from "vitest";
import {
  adBudget,
  adManagement,
  commercialPlans,
  getPlan,
  maintenance,
  whatsappUrl,
} from "@/lib/pricing/commercial";

describe("Commercial terms", () => {
  it("prices Essencial at R$250 once", () => {
    expect(getPlan("Essencial").price).toBe(250);
  });
  it("prices Performance at R$550 once", () => {
    expect(getPlan("Performance").price).toBe(550);
  });
  it("keeps monthly fees as optional add-ons outside the plans", () => {
    expect(maintenance.monthly).toBe(50);
    expect(maintenance.singleChange).toBe(30);
    for (const plan of commercialPlans) expect(plan).not.toHaveProperty("monthly");
  });
  it("prices the Google Ads-only plan at R$300 once, requiring an existing site", () => {
    expect(getPlan("Google Ads").price).toBe(300);
    expect(getPlan("Google Ads").requirement).toBeTruthy();
  });
  it("keeps Performance equal to Essencial plus the Google Ads plan", () => {
    expect(getPlan("Performance").price).toBe(
      getPlan("Essencial").price + getPlan("Google Ads").price,
    );
  });
  it("shows market ranges above our prices", () => {
    for (const plan of commercialPlans) expect(plan.market.min).toBeGreaterThan(plan.price);
    expect(adManagement.market.min).toBeGreaterThan(adManagement.monthly);
  });
  it("prices optional management at R$250 per month", () => {
    expect(adManagement.monthly).toBe(250);
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
