import { buildLlmsTxt } from "@/lib/seo/llms";

export const dynamic = "force-static";

/** /llms.txt: resumo da marca para assistentes de IA (GEO), gerado a partir de src/content. */
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
