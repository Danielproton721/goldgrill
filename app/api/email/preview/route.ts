import { isAuthed } from "@/lib/admin-auth";
import { renderOrderConfirmationEmail, renderAbandonedCartEmail, renderShippedEmail } from "@/lib/order-email";

export const dynamic = "force-dynamic";

// Preview dos e-mails com dados de exemplo. ?tipo=pendente | postado; sem param
// mostra o de confirmação. Dados fake, não toca em nada real.
export async function GET(request: Request) {
  // Não envia e-mail (é só a arte com dados de exemplo), mas página interna
  // não é área pública: fica atrás do login do /admin.
  if (!(await isAuthed())) {
    return new Response("Faça login no /admin primeiro.", {
      status: 401,
      headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" },
    });
  }
  const tipo = new URL(request.url).searchParams.get("tipo");
  const order = {
    orderCode: "GG-8F3A2K",
    customer: { name: "João Silva", email: "joao@email.com", phone: "(91) 99999-8888" },
    address: {
      cep: "68650-000",
      street: "Rua das Palmeiras",
      number: "128",
      complement: "Casa 2",
      neighborhood: "Centro",
      city: "Belém",
      stateUF: "PA",
    },
    items: [
      { id: 1, name: "Kit Churrasco Personalizado Churrasqueiro Oficial da Família", image: "/images/produtos/wb-kit-churrasco-personalizado-churrasqueiro-oficial-da-familia-1.png", price: 40.52, quantity: 1 },
      { id: 2, name: "Espeto Tridente Giratório Inox 67,5cm", image: "/images/produtos/ig-espeto-tridente-giratorio-inox-67-5cm.jpg", price: 6.98, quantity: 2 },
    ],
    subtotal: 54.48,
    shipping: 0,
    discount: 2.72,
    coupon: "PRIMEIRACOMPRA",
    total: 51.76,
    paymentMethod: "pix" as const,
  };
  const { html } =
    tipo === "pendente"
      ? renderAbandonedCartEmail(order)
      : tipo === "postado"
        ? renderShippedEmail(order, "PB482910375BR")
        : renderOrderConfirmationEmail(order);
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
