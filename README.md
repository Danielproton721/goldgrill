# 🥇 Gold Grill — Loja de Churrasco Premium

Loja de e-commerce de artigos de churrasco (churrasqueiras, facas, tábuas, kits
de presente) com foco em presente de Dia dos Pais. Next.js 16 + React 19 +
Tailwind v4 + TypeScript.

## Como rodar (local)

```bash
pnpm install
pnpm run build
PORT=3005 pnpm run start   # http://localhost:3005
```

> O `next dev` pode conflitar quando há vários projetos Next na mesma árvore;
> em caso de erro, use o modo produção acima.

## Painel admin

`/admin` — protegido por senha (`ADMIN_PASSWORD`). Abas: Pedidos, Produtos,
Relay e **Chaves** (verificador que mostra quais variáveis de ambiente estão
ativas ou faltando, sem expor valores).

## Variáveis de ambiente

| Variável | Papel | Obrigatória |
|---|---|---|
| `ADMIN_PASSWORD` | Senha do painel admin | ✅ |
| `NEXT_PUBLIC_APP_URL` | Domínio da loja (ex.: `https://goldgrill.shop`) | ✅ |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Upstash (pedidos, visitantes, gateway) | ✅ |
| `PAGOUAI_SECRET_KEY` | Gateway Pagou.ai (ativo) | ✅ |
| `NEXT_PUBLIC_PAGOUAI_PUBLIC_KEY` | Cartão de crédito (tokenização) | Recomendada |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` | E-mails (confirmação, pendente, postado) | Recomendada |
| `QSTASH_TOKEN` | Agenda os e-mails de pedido pendente/postado | Opcional |
| `MEDUSAPAY_SECRET_KEY` / `CENTURION_API_KEY` | Gateways reserva | Opcional |
| `NOTIFY_URL_OVERRIDE` / `RELAY_SECRET` | Relay (oculta o domínio da Pagou.ai) | Opcional |

Depois de alterar qualquer `NEXT_PUBLIC_*`, faça **Redeploy** (é embutida no build).

## Funcionalidades

- Catálogo com coleções, busca e páginas de produto com prova social
- Carrinho + checkout multi-etapa com PIX (Pagou.ai / MedusaPay / CenturionPay)
- Cupom aplicável/removível, escassez e timer só no checkout
- **Ciclo de e-mails pós-venda:** confirmação (pago) → pendente (15 min sem pagar,
  via QStash) → postado (1 h após pagar, com código de rastreio)
- Página de rastreio própria
- Relay de pagamento (cliente + hub) para ocultar o domínio no gateway
