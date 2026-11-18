/**
 * Teste rápido do site publicado: npm run smoke -- https://solidsolutionsdigital.com.br
 * Roda sozinho no GitHub depois de cada publicação em produção (.github/workflows/smoke.yml).
 * Só lê páginas públicas; não altera nada.
 *
 * O que protege: página que sumiu ou deu erro, título/H1/canonical quebrados, dados estruturados
 * inválidos, botão de WhatsApp perdido, redirecionamentos antigos, arquivos de SEO e a demonstração
 * do Painel Solid (o botão "Ver o relatório de exemplo" depende dela estar no ar).
 */
const base = (process.argv[2] || process.env.SMOKE_URL || "").replace(/\/$/, "");
if (!/^https?:\/\//.test(base)) {
  console.error("Uso: npm run smoke -- https://endereco-do-site");
  process.exit(2);
}

const DEMO_URL = process.env.SMOKE_DEMO_URL || "https://painel.solidsolutionsdigital.com.br/demo";
const TIMEOUT = 20_000;
const failures = [];

function fail(name, why) {
  failures.push(`${name}: ${why}`);
  console.log(`FALHOU  ${name}: ${why}`);
}
function pass(name, ms) {
  console.log(`ok      ${name}${ms === undefined ? "" : ` (${ms} ms)`}`);
}

async function get(url, init = {}) {
  const started = Date.now();
  const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(TIMEOUT), ...init });
  const text = await res.text();
  return { res, text, ms: Date.now() - started };
}

async function check(name, url, test) {
  try {
    const { res, text, ms } = await get(url);
    const problem = test(res, text);
    if (problem) fail(name, problem);
    else pass(name, ms);
  } catch (err) {
    fail(name, err?.name === "TimeoutError" ? `sem resposta em ${TIMEOUT / 1000} s` : String(err?.message ?? err));
  }
}

const stripScripts = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");

/** Regras que toda página pública precisa cumprir. */
function pageProblems(path, res, html) {
  const problems = [];
  if (res.status !== 200) return [`status ${res.status}`];
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  if (title.length < 10 || title.length > 75) problems.push(`título com ${title.length} caracteres`);
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1s !== 1) problems.push(`${h1s} elementos h1 (precisa ser 1)`);
  if (!/<link[^>]+rel="canonical"/i.test(html)) problems.push("sem canonical");
  if (!/<meta[^>]+name="description"/i.test(html)) problems.push("sem meta description");
  if (!/<html[^>]+lang="pt-BR"/i.test(html)) problems.push('html sem lang="pt-BR"');
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) problems.push("página marcada como noindex");

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (blocks.length !== 1) problems.push(`${blocks.length} blocos de dados estruturados (precisa ser 1)`);
  for (const block of blocks) {
    try {
      const data = JSON.parse(block[1]);
      if (!Array.isArray(data["@graph"]) || data["@graph"].length === 0) problems.push("JSON-LD sem @graph");
    } catch {
      problems.push("JSON-LD inválido");
    }
  }

  // Só o texto que o visitante lê (sem tags nem atributos). Links são tratados à parte, como aviso.
  const visible = stripScripts(html).replace(/<[^>]+>/g, " ");
  if (/\bundefined\b|\bNaN\b|\[object Object\]/.test(visible)) problems.push("texto quebrado (undefined, NaN ou [object Object])");
  if (/Teresina|Piau[ií]/i.test(visible)) problems.push("cita cidade ou estado no texto (a marca atende o Brasil todo)");
  if (path !== "/politica-de-privacidade" && !/https:\/\/wa\.me\/55\d{10,11}\?text=/.test(html)) {
    problems.push("sem botão de WhatsApp com mensagem");
  }
  return problems;
}

// ---------- Arquivos de SEO ----------

await check("robots.txt libera o site e aponta o sitemap", `${base}/robots.txt`, (res, text) =>
  res.status !== 200
    ? `status ${res.status}`
    : !/Allow:\s*\//i.test(text) || !/Sitemap:\s*https?:\/\//i.test(text) || /Disallow:\s*\/\s*$/im.test(text)
      ? "robots.txt não libera o site ou não tem Sitemap"
      : null,
);

let paths = [];
await check("sitemap.xml lista as páginas", `${base}/sitemap.xml`, (res, text) => {
  if (res.status !== 200) return `status ${res.status}`;
  paths = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname || "/");
  return paths.length >= 15 ? null : `só ${paths.length} páginas no sitemap (esperava 15 ou mais)`;
});

await check("llms.txt resume a marca para assistentes de IA", `${base}/llms.txt`, (res, text) =>
  res.status !== 200
    ? `status ${res.status}`
    : !text.startsWith("# Solid Solutions") || !/R\$ 250/.test(text) || /Teresina|Piau[ií]/i.test(text)
      ? "conteúdo do llms.txt está errado"
      : null,
);

await check("manifest.webmanifest válido", `${base}/manifest.webmanifest`, (res, text) => {
  if (res.status !== 200) return `status ${res.status}`;
  try {
    return JSON.parse(text).name ? null : "sem name";
  } catch {
    return "JSON inválido";
  }
});

await check("imagem de compartilhamento (og-image.jpg)", `${base}/og-image.jpg`, (res) =>
  res.status === 200 && (res.headers.get("content-type") || "").startsWith("image/") ? null : `status ${res.status}`,
);

// ---------- Todas as páginas do sitemap ----------

const queue = [...new Set(paths)];
async function worker() {
  while (queue.length) {
    const path = queue.shift();
    try {
      const { res, text, ms } = await get(base + path);
      const problems = pageProblems(path, res, text);
      if (problems.length) fail(`página ${path}`, problems.join("; "));
      else pass(`página ${path}`, ms);
      // Aviso, não falha: um link para um projeto publicado pode citar a região no endereço.
      for (const [, url] of text.matchAll(/href="([^"]*(?:teresina|piaui)[^"]*)"/gi)) {
        console.log(`AVISO   página ${path}: link cita a região no endereço: ${url}`);
      }
    } catch (err) {
      fail(`página ${path}`, err?.name === "TimeoutError" ? `sem resposta em ${TIMEOUT / 1000} s` : String(err?.message ?? err));
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));

// ---------- Página inicial: o que a venda depende ----------

await check("página inicial tem botão do relatório de exemplo e os planos", `${base}/`, (res, text) => {
  if (res.status !== 200) return `status ${res.status}`;
  if (!text.includes('data-cta="demo"')) return "sem o botão do relatório de exemplo";
  if (!text.includes("painel.solidsolutionsdigital.com.br/demo")) return "botão do relatório aponta para outro endereço";
  if (!/R\$\s?250/.test(stripScripts(text))) return "preço do plano Essencial não aparece";
  return null;
});

// ---------- 404, redirecionamentos e cabeçalhos ----------

await check("página inexistente responde 404 e não é indexada", `${base}/pagina-que-nao-existe-123`, (res, text) =>
  res.status === 404 && /noindex/i.test(text) ? null : `status ${res.status}, noindex ${/noindex/i.test(text)}`,
);

await check("endereço antigo de projeto redireciona", `${base}/projetos?projeto=Construtora%20Alvorada`, (res) =>
  [301, 308].includes(res.status) && (res.headers.get("location") || "").includes("/projetos/construtora-alvorada")
    ? null
    : `status ${res.status}, location ${res.headers.get("location")}`,
);

await check("cabeçalhos de segurança", `${base}/`, (res) =>
  res.headers.get("x-content-type-options") === "nosniff" && !res.headers.get("x-powered-by")
    ? null
    : "faltam X-Content-Type-Options ou o X-Powered-By está aparecendo",
);

// ---------- Dependência externa: demonstração do Painel Solid ----------

await check("demonstração do Painel Solid no ar (botão do relatório)", DEMO_URL, (res, text) =>
  res.status !== 200
    ? `status ${res.status}`
    : /dados fictícios/i.test(text)
      ? null
      : "a demonstração não mostra o aviso de dados fictícios",
);

if (failures.length) {
  console.log(`\n${failures.length} verificação(ões) falharam em ${base}`);
  process.exit(1);
}
console.log(`\nTudo certo em ${base}`);
