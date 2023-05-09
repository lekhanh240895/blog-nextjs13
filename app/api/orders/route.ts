import Order from "@/app/models/Order";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const order = await Order.findById(id);
    return NextResponse.json(order);
  }

  const orders = await Order.find({}).sort({
    createdAt: -1,
  });
  return NextResponse.json(orders);
}
