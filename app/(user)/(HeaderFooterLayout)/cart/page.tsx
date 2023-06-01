import CartBody from "@/app/components/CartBody";

export async function generateMetadata() {
  return {
    title: "Cart",
  };
}

function Cart() {
  return <CartBody />;
}

export default Cart;
