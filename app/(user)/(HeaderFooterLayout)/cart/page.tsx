import CartBody from "@/app/components/CartBody";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Cart",
  };
}

function Cart() {
  return (
    <Suspense fallback={"loading..."}>
      <CartBody />
    </Suspense>
  );
}

export default Cart;
