import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/app/lib/mongoose";
import Order from "@/app/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

interface IObject extends Stripe.Event.Data.Object {
  metadata?: {
    orderId: string;
  };
  payment_status?: string;
}

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret: string = "whsec_XvCZXOluSUmFHdzu8uFQouPfYlHtJgYr";

export async function POST(req: Request) {
  await mongooseConnect();

  const headersList = headers();
  const sig: any = headersList.get("stripe-signature");

  let event: Stripe.Event;

  const buf = await req.arrayBuffer();

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf).toString(),
      sig,
      endpointSecret
    );
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data: IObject = event.data.object;
      const orderId = data.metadata?.orderId;
      const paid = data.payment_status === "paid";

      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json("ok");
}
