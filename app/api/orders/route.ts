import Order from "@/app/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await Order.find({}).sort({
    createdAt: -1,
  });
  return NextResponse.json(orders);
}
