import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/app/libs/stripe";
import prismadb from "@/app/libs/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { subdomain: string } }
) {
  const store = await prismadb.store.findUnique({
    where: {
      subdomain: params.subdomain,
    },
  });

  if (!store) {
    return new NextResponse("Store not found!", { status: 422 });
  }

  const { productIds, counts } = await req.json();

  //   console.log(params.subdomain);

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: counts[product.id],
      price_data: {
        currency: "USD",
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100,
      },
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: store.id,
      isPaid: false,
      orderItems: productIds,
      counts: counts,
      phone: "",
      address: "",
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Standard Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 7,
            },
            maximum: {
              unit: "business_day",
              value: 14,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    success_url: `http://localhost:3000/store/${params.subdomain}/cart?success=1`,
    cancel_url: `http://localhost:3000/store/${params.subdomain}/cart?cancelled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
