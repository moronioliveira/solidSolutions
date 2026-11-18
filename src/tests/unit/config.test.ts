import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../../../next.config";
import robots from "../../../app/robots";
import manifest from "../../../app/manifest";
import { GET as llms } from "../../../app/llms.txt/route";
import sitemap from "../../../app/sitemap";
import { site } from "@/content/site";

const root = process.cwd();

describe("Arquivos que o build precisa encontrar", () => {
  it("todo CSS importado em src/styles/index.css existe", () => {
    const css = readFileSync(path.join(root, "src/styles/index.css"), "utf8");
    const imports = [...css.matchAll(/@import "\.\/([^"]+)"/g)].map((match) => match[1]);
    expect(imports.length).toBeGreaterThan(3);
    for (const file of imports) {
      expect(existsSync(path.join(root, "src/styles", file)), `src/styles/${file}`).toBe(true);
    }
  });

  it("os arquivos públicos usados pelo SEO existem", () => {
    for (const file of [site.ogImage, site.logo, site.symbol, "/favicon-32.png", "/favicon-192.png"]) {
      expect(existsSync(path.join(root, "public", file)), `public${file}`).toBe(true);
    }
  });

  it("o workflow de verificação e o smoke test estão no repositório", () => {
    for (const file of [".github/workflows/ci.yml", ".github/workflows/smoke.yml", "scripts/smoke.mjs"]) {
      expect(existsSync(path.join(root, file)), file).toBe(true);
    }
  });
});

describe("Redirecionamentos dos endereços antigos", () => {
  it("todo destino existe no sitemap (um slug renomeado não pode virar 404)", async () => {
    const known = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
    const redirects = await nextConfig.redirects!();
    expect(redirects.length).toBeGreaterThan(0);
    for (const redirect of redirects) {
      expect(known.has(redirect.destination), `${redirect.source} → ${redirect.destination}`).toBe(true);
      expect(redirect.permanent).toBe(true);
    }
  });

  it("nenhum redirecionamento entra em laço", async () => {
    for (const redirect of await nextConfig.redirects!()) {
      expect(redirect.destination).not.toBe(redirect.source);
    }
  });
});

describe("Cabeçalhos de segurança", () => {
  it("envia nosniff, política de referência e esconde o X-Powered-By", async () => {
    expect(nextConfig.poweredByHeader).toBe(false);
    const rules = await nextConfig.headers!();
    const headers = Object.fromEntries(rules[0].headers.map((header) => [header.key, header.value]));
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBeTruthy();
  });
});

describe("Arquivos gerados pelo Next", () => {
  it("o sitemap só usa endereços do domínio oficial, sem repetir", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) expect(url.startsWith(site.url)).toBe(true);
  });

  it("o robots.txt aponta para o sitemap do domínio oficial e não bloqueia o site", () => {
    const result = robots();
    expect(result.sitemap).toBe(`${site.url}/sitemap.xml`);
    expect(JSON.stringify(result.rules)).not.toMatch(/disallow/i);
  });

  it("o manifest tem nome, início e ícones", () => {
    const result = manifest();
    expect(result.name).toBeTruthy();
    expect(result.start_url).toBe("/");
    expect(result.icons?.length).toBeGreaterThan(0);
  });

  it("o llms.txt responde texto puro, em UTF-8, com a marca e o preço", async () => {
    const response = llms();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toMatch(/text\/plain.*utf-8/i);
    const text = await response.text();
    expect(text.startsWith("# Solid Solutions")).toBe(true);
    expect(text).toMatch(/R\$\s?250/);
  });
});
