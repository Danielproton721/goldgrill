# MedusaPay — API v2 (referência)

Extraída de <https://app.medusapayoficial.pro/docs> em 2026-07-27. A página é uma
SPA (o conteúdo não vem no HTML), então guardamos o resumo aqui.

## Base e autenticação

```
Base URL:  https://api.medusapayoficial.pro/api/v1
Header:    Authorization: Bearer mk_live_<token>
```

A chave sai em **Configurações → API e Integrações** no painel da Medusa. É
guardada como hash (SHA-256) do lado deles; ao regenerar, a anterior morre na hora.

> ⚠️ O path das rotas **repete o `/api`**. O endpoint real é
> `https://api.medusapayoficial.pro/api/v1/api/pagamentos`.
> Verificado contra a API: chave inválida → `401 UNAUTHORIZED`;
> `/api/v1/pagamentos` → `404 {"message":"Rota não encontrada"}`.

## Criar pagamento

`POST /api/v1/api/pagamentos`

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| `clienteNome` | string | ✅ | Nome completo do comprador |
| `clienteEmail` | string | ✅ | Identifica/cria o Cliente |
| `valor` | number | ✅ | **Em reais** (`150.00`), não em centavos |
| `metodo` | string | ✅ | Só `"PIX"` é processado por adquirente real |
| `clienteCpf` | string | ✅ | Só dígitos. Sem ele o adquirente recusa o PIX |
| `produto` | string | — | Máx. 200 caracteres (aceita `descricao`) |
| `idempotencyKey` | string | — | Mesma chave → devolve a venda original com `200` |

Resposta `201`:

```json
{
  "venda": { "id": "uuid", "valor": "150.00", "status": "pendente", "metodo": "PIX", "simulada": false },
  "valorLiquido": 146.01,
  "taxaAdmin": 3.99,
  "pixPendente": true,
  "pixQrCode": "data:image/png;base64,iVBORw0KGgo...",
  "pixCopiaECola": "00020126580014br.gov.bcb.pix...",
  "pixExpiresAt": "2026-07-14T11:00:00.000Z"
}
```

**Smart Routing:** tenta o adquirente de maior prioridade e cai para o próximo em
caso de falha. Se todos falharem → `502`.

**Modo Teste:** conta sem adquirente real pode ser marcada pelo admin da Medusa;
a venda é aprovada na hora com `simulada: true`, **sem QR Code e sem creditar
saldo**. A loja trata isso como erro explícito no `/api/pix/create`.

## Consultar

- `GET /api/v1/api/pagamentos/:id` → venda completa (`status`, `valorLiquido`, `cliente`…)
- `GET /api/v1/api/saldo` → `{ "disponivel": "1240.50", "bloqueado": "58.30" }`

Status: `pendente` → `aprovado` (creditou) · `recusado` · `estornado`.

## Webhooks

Cadastrados **no painel** (Configurações → API e Integrações → Webhook). A v2
**não aceita `postbackUrl` no corpo do pagamento**. URL desta loja:

```
https://<dominio>/api/webhooks/medusa
```

| Evento | Quando |
|---|---|
| `payment.approved` | Pagamento aprovado (checkout ou API) |
| `payment.refunded` | Estorno processado |
| `transfer.updated` | Status de saque alterado pelo admin |

Assinatura: header `X-Medusa-Signature: sha256=<hex>` = HMAC SHA-256 do corpo com
o segredo do webhook (`MEDUSAPAY_WEBHOOK_SECRET`). Use `eventId` para deduplicar.

Retry: 30 s → 2 min → 3ª tentativa; depois marca `falhou` e desiste.

## Códigos de erro

| Código | Significado |
|---|---|
| `200` | OK — GET ou retentativa idempotente (devolve a venda original) |
| `201` | Criado |
| `400` | Campo ausente/valor inválido/método não suportado |
| `401` | API Key ausente ou inválida |
| `404` | ID não existe |
| `502` | Todos os adquirentes falharam (Smart Routing esgotado) |
| `503` | Sem adquirente ativo (`NO_ACQUIRER`) |

Formato: `{ "message": "...", "code": "NO_ACQUIRER" }`

## O que mudou da v1 para a v2 (nesta loja)

| | v1 (antiga) | v2 (atual) |
|---|---|---|
| Base | `api.v2.medusapay.com.br/v1` | `api.medusapayoficial.pro/api/v1` |
| Auth | `Basic base64(secret:x)` | `Bearer mk_live_...` |
| Endpoint | `POST /transactions` | `POST /api/pagamentos` |
| Valor | centavos (`18790`) | reais (`187.90`) |
| Campos | `paymentMethod`, `customer{}`, `items[]` | `clienteNome/clienteEmail/clienteCpf/produto` |
| Webhook | `postbackUrl` no request, sem assinatura | cadastrado no painel, HMAC SHA-256 |
| Status pago | `paid`/`captured` | `aprovado` |
