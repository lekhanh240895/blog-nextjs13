"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/appSlice";
import { appSelector } from "../redux/selector";

function AddCartButton({ productId }: { productId: string }) {
  const dispatch = useDispatch();
  const { productsCart } = useSelector(appSelector);
  console.log({ productsCart });
  return (
    <button
      className="btn btn-primary flex items-center justify-center gap-x-4 mt-2"
      onClick={() => dispatch(addProduct(productId))}
    >
      <ShoppingCartIcon className="w-6 h-6" />
      Add to cart
    </button>
  );
}

export default AddCartButton;
