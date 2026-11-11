interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Insere dados estruturados (schema.org) na página. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // O replace evita que um "<" no texto feche a tag script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
