"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CartForm from "@/app/components/CartForm";
import CartTable from "@/app/components/CartTable";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/app/features/appSlice";
import { appSelector } from "@/app/redux/selector";
import Link from "next/link";

function CartBody() {
  const { cartProductIds } = useSelector(appSelector);
  const [isSucceed, setIsSucceed] = useState(false);
  const params = useSearchParams().toString();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.includes("success")) {
      setIsSucceed(true);
      dispatch(clearCart());
    } else {
      setIsSucceed(false);
    }
  }, [params, dispatch]);

  if (isSucceed)
    return (
      <div>
        <h1>Thanks for your order</h1>
        <p>We will send you an email when your order will be sent.</p>
        <Link href="/products">
          <button className="btn btn-primary my-4">Continue shopping</button>
        </Link>
      </div>
    );

  return (
    <>
      {cartProductIds.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <CartTable />
          </div>

          <div className="grid place-items-center">
            <CartForm />
          </div>
        </div>
      ) : (
        <h1 className="font-normal text-xl text-black">Your cart is empty!</h1>
      )}
    </>
  );
}

export default CartBody;
