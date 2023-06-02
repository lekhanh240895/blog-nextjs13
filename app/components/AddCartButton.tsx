"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/appSlice";

function AddCartButton({ productId }: { productId: string }) {
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(addProduct(productId));
  };

  return (
    <button
      className="btn btn-primary flex items-center justify-center gap-x-4 min-w-[150px] h-10"
      onClick={handleAddCart}
    >
      <ShoppingCartIcon className="w-6 h-6" />
      Add to cart
    </button>
  );
}

export default AddCartButton;
