import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/app/lib/mongoose";
import { buffer } from "micro";
import Order from "@/app/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_mO1lshpWo1kA9q5geJglv5TS6sjYAi1W";

export async function POST(req: Request) {
  await mongooseConnect();

  const headersList = headers();
  const sig: any = headersList.get("stripe-signature");

  const body = await req.json();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(body),
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
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    case "checkout.session.completed":
      const data: Stripe.Event.Data.Object = event.data.object;
      const orderId = data.metadata.orderId;
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

  return NextResponse.json(body);
}

export const config = {
  api: { bodyParser: false },
};
