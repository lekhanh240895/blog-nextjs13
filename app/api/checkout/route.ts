import Order from "@/app/models/Order";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { name, email, city, postalCode, address, country, cartProductIds } =
      res;
    const uniqueIds = Array.from(new Set(cartProductIds));

    let line_items = [];

    for (const id of uniqueIds) {
      const productInfo = await Product.findById(id);
      const quantity =
        cartProductIds.filter((pId: string) => pId === id).length || 0;

      if (productInfo && quantity > 0) {
        line_items.push({
          quantity,
          price_data: {
            currency: "VND",
            product_data: {
              name: productInfo.title,
            },
            unit_amount: quantity * productInfo.price,
          },
        });
      }
    }

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      address,
      country,
      paid: false,
    });

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `https://${req.headers.get("Host")}/cart?success=1`,
      cancel_url: `https://${req.headers.get("Host")}/cart?canceled=1`,
      customer_email: email,
      metadata: { orderId: orderDoc._id.toString() },
    };

    try {
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      return NextResponse.json({
        url: checkoutSession.url,
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
