import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/forms";
import { prisma } from "@/lib/database";

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = contactSchema.omit({ website: true }).safeParse(payload);
  if (!parsed.success)
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Confira os campos." },
      { status: 400 },
    );

  const since = new Date(Date.now() - 60_000);
  const recent = await prisma.contactSubmission.count({
    where: { email: parsed.data.email, createdAt: { gt: since } },
  });
  if (recent >= 3)
    return NextResponse.json(
      { message: "Aguarde um minuto antes de enviar novamente." },
      { status: 429 },
    );

  const submission = await prisma.contactSubmission.create({ data: parsed.data });
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Solid Solutions",
        allowed_mentions: { parse: [] },
        embeds: [
          {
            title: "Novo pedido de projeto pelo site",
            color: 16096779,
            timestamp: submission.createdAt.toISOString(),
            fields: [
              { name: "Nome", value: submission.name.slice(0, 256), inline: true },
              { name: "Empresa", value: (submission.company || "—").slice(0, 256), inline: true },
              { name: "Serviço", value: submission.service, inline: true },
              { name: "E-mail", value: submission.email.slice(0, 256) },
              { name: "Mensagem", value: submission.message.slice(0, 1000) },
            ],
          },
        ],
      }),
    });
    if (!response.ok) console.error("Discord notification failed:", response.status);
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
