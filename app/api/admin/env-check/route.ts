import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { getActiveGateway } from "@/lib/gateways/active";

export const dynamic = "force-dynamic";

// Nunca devolve o VALOR das variáveis — só se estão presentes. O admin já está
// autenticado, mas mesmo assim: status booleano, zero vazamento de segredo.
const has = (...names: string[]) => names.some((n) => (process.env[n] || "").trim().length > 0);

// Nome do banco Upstash a partir da URL (ex.: https://apt-mammal-12345.upstash.io
// → "apt-mammal-12345"). É o identificador que aparece no console do Upstash, e
// serve pra saber QUAL banco esta loja usa quando existem várias contas.
// Só o host — o token, que é o segredo de verdade, nunca sai daqui.
function nomeDoBanco(...envs: string[]): string | null {
  for (const env of envs) {
    const url = (process.env[env] || "").trim();
    if (!url) continue;
    try {
      const host = new URL(url).hostname;
      return host.replace(/\.upstash\.io$/i, "");
    } catch {
      return null;
    }
  }
  return null;
}

type Item = {
  label: string;
  envs: string[];
  set: boolean;
  level: "req" | "rec" | "opt"; // obrigatória / recomendada / opcional
  hint: string;
};
type Group = { title: string; desc: string; items: Item[] };

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const activeGateway = await getActiveGateway();
  const bancoPrincipal = nomeDoBanco("KV_REST_API_URL", "UPSTASH_REDIS_REST_URL");
  const bancoRelay = nomeDoBanco("RELAY_KV_REST_API_URL");

  const groups: Group[] = [
    {
      title: "Essencial",
      desc: "Sem isto a loja não opera.",
      items: [
        { label: "Senha do painel admin", envs: ["ADMIN_PASSWORD"], set: has("ADMIN_PASSWORD"), level: "req", hint: "Libera o acesso a este painel." },
        { label: "Domínio da loja", envs: ["NEXT_PUBLIC_APP_URL"], set: has("NEXT_PUBLIC_APP_URL"), level: "rec", hint: "Ex.: https://goldgrill.com.br — usado em links, e-mail e postback." },
      ],
    },
    {
      title: "Banco de dados (Upstash/KV)",
      desc: bancoPrincipal
        ? `Esta loja usa o banco "${bancoPrincipal}"${bancoRelay && bancoRelay !== bancoPrincipal ? ` · relay no banco "${bancoRelay}"` : ""}.`
        : "Sem isto: não salva pedidos, visitantes nem a troca de gateway.",
      items: [
        { label: "URL do Upstash", envs: ["KV_REST_API_URL", "UPSTASH_REDIS_REST_URL"], set: has("KV_REST_API_URL", "UPSTASH_REDIS_REST_URL"), level: "req", hint: bancoPrincipal ? `Banco em uso: ${bancoPrincipal}` : "KV_REST_API_URL (ou UPSTASH_REDIS_REST_URL)." },
        { label: "Token do Upstash", envs: ["KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_TOKEN"], set: has("KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_TOKEN"), level: "req", hint: "KV_REST_API_TOKEN (ou UPSTASH_REDIS_REST_TOKEN)." },
      ],
    },
    {
      title: `Gateway de pagamento (ativo: ${activeGateway})`,
      desc: "Só o gateway ATIVO precisa estar configurado. Os outros são reserva.",
      items: [
        { label: "Pagou.ai — chave secreta", envs: ["PAGOUAI_SECRET_KEY"], set: has("PAGOUAI_SECRET_KEY"), level: activeGateway === "pagou" ? "req" : "opt", hint: "Obrigatória se Pagou.ai for o gateway ativo." },
        { label: "Pagou.ai — chave pública", envs: ["NEXT_PUBLIC_PAGOUAI_PUBLIC_KEY"], set: has("NEXT_PUBLIC_PAGOUAI_PUBLIC_KEY"), level: activeGateway === "pagou" ? "rec" : "opt", hint: "Usada no fluxo de cartão." },
        { label: "MedusaPay — API Key", envs: ["MEDUSAPAY_SECRET_KEY"], set: has("MEDUSAPAY_SECRET_KEY", "MEDUSAPAY_API_KEY"), level: activeGateway === "medusa" ? "req" : "opt", hint: "Chave mk_live_... (API v2). Só se usar MedusaPay." },
        { label: "MedusaPay — segredo do webhook", envs: ["MEDUSAPAY_WEBHOOK_SECRET"], set: has("MEDUSAPAY_WEBHOOK_SECRET"), level: activeGateway === "medusa" ? "rec" : "opt", hint: "Valida a assinatura X-Medusa-Signature do webhook." },
        { label: "CenturionPay — chave", envs: ["CENTURION_API_KEY"], set: has("CENTURION_API_KEY"), level: activeGateway === "centurion" ? "req" : "opt", hint: "Só se usar CenturionPay." },
      ],
    },
    {
      title: "E-mail de confirmação (Resend)",
      desc: "Sem isto o pedido é aprovado, mas o cliente não recebe o e-mail.",
      items: [
        { label: "Resend — API key", envs: ["RESEND_API_KEY"], set: has("RESEND_API_KEY"), level: "rec", hint: "Envia o e-mail de confirmação do pedido." },
        { label: "Resend — remetente", envs: ["RESEND_FROM_EMAIL"], set: has("RESEND_FROM_EMAIL"), level: "rec", hint: 'Ex.: "Gold Grill <atendimento-pedidos@goldgrill.shop>".' },
      ],
    },
    {
      title: "E-mail de pedido pendente (QStash)",
      desc: "Opcional — dispara o e-mail de recuperação ~15 min após o PIX não pago. Precisa de e-mail (Resend) + KV + domínio ativos.",
      items: [
        { label: "QStash — token", envs: ["QSTASH_TOKEN"], set: has("QSTASH_TOKEN"), level: "opt", hint: "Do Upstash (QStash). Agenda o disparo sem plano pago da Vercel." },
      ],
    },
    {
      title: "Relay (ocultar domínio da Pagou.ai)",
      desc: "Opcional — só se a loja envia os pagamentos por um relay externo.",
      items: [
        { label: "URL do relay (notify)", envs: ["NOTIFY_URL_OVERRIDE"], set: has("NOTIFY_URL_OVERRIDE"), level: "opt", hint: "O notify_url que vai pra Pagou.ai aponta pro relay." },
        { label: "Segredo do relay", envs: ["RELAY_SECRET"], set: has("RELAY_SECRET"), level: "opt", hint: "O webhook só aceita repasses com este segredo." },
      ],
    },
  ];

  return NextResponse.json({ activeGateway, groups, bancoPrincipal, bancoRelay });
}
