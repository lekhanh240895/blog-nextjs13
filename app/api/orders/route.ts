import Order from "@/app/models/Order";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = Object.fromEntries(searchParams.entries());
  const conditions = Object.entries(query).map(([key, value]) => ({
    [key]: value,
  }));

  if (conditions.length > 0) {
    const order = await Order.find({
      $or: conditions,
    });
    return NextResponse.json(order);
  }

  const orders = await Order.find({}).sort({
    createdAt: -1,
  });
  return NextResponse.json(orders);
}
