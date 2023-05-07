import CartTable from "@/app/components/CartTable";

function Cart() {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <CartTable />
      </div>

      <div className="flex items-center justify-center">
        <form>
          <div className="border border-gray-300 p-4 rounded-md shadow-md  space-y-2 max-w-[400px]">
            <h1 className="text-center text-black">Order information</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Postal Code" />
            <input type="text" placeholder="Street Address" />
            <input type="text" placeholder="Country" />
            <button type="button" className="btn w-full btn-primary">
              Continue to payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cart;
