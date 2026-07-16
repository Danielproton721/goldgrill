import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// Diagnóstico de e-mail. Protegido pela senha do admin. Tenta enviar um e-mail
// de teste e devolve o ERRO EXATO do Resend (domínio não verificado, chave
// inválida, modo sandbox, etc). Uso:
//   /api/email/diag?secret=SUA_SENHA_ADMIN&to=seu@email.com
export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret") || "";
  const adminPw = (process.env.ADMIN_PASSWORD || "").trim();
  if (!adminPw || secret !== adminPw) {
    return NextResponse.json({ error: "Não autorizado (use ?secret=SUA_SENHA_ADMIN)." }, { status: 401 });
  }

  const to = url.searchParams.get("to")?.trim();
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const fromAddress = (process.env.RESEND_FROM_EMAIL || "").trim();

  const diag: Record<string, unknown> = {
    RESEND_API_KEY: apiKey ? `presente (${apiKey.slice(0, 3)}…${apiKey.slice(-3)})` : "❌ FALTANDO",
    RESEND_FROM_EMAIL: fromAddress || "❌ FALTANDO (usa fallback)",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "❌ FALTANDO",
    QSTASH_TOKEN: process.env.QSTASH_TOKEN ? "presente" : "❌ FALTANDO (e-mails de pendente/postado não agendam)",
    KV: (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) ? "presente" : "❌ FALTANDO",
  };

  if (!apiKey) {
    return NextResponse.json({ ok: false, motivo: "RESEND_API_KEY não configurada.", diag });
  }
  if (!to) {
    return NextResponse.json({ ok: false, motivo: "Informe ?to=seu@email.com para testar o envio.", diag });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromAddress || "Gold Grill <onboarding@resend.dev>",
      to: [to],
      subject: "Teste de e-mail — Gold Grill",
      html: "<p>Se você recebeu este e-mail, o Resend está configurado corretamente ✅</p>",
    });
    if (result.error) {
      return NextResponse.json({
        ok: false,
        motivo: "O Resend RECUSOU o envio. Veja o erro abaixo.",
        erro: result.error,
        dica: "Se falar em 'domain not verified' ou 'testing emails', você precisa VERIFICAR o domínio goldgrill.shop no painel do Resend (Domains → Add → configurar SPF/DKIM no DNS).",
        diag,
      });
    }
    return NextResponse.json({ ok: true, enviado: true, id: result.data?.id, para: to, diag });
  } catch (e: any) {
    return NextResponse.json({ ok: false, motivo: "Exceção ao enviar.", erro: e?.message, diag });
  }
}
