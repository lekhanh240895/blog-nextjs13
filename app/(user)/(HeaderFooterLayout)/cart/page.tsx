import CartBody from "@/app/components/CartBody";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Cart",
  };
}

function Cart() {
  return (
    <Suspense>
      <CartBody />
    </Suspense>
  );
}

export default Cart;
