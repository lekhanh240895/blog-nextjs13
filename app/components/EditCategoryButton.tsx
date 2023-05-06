"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../features/appSlice";

type Props = {
  category: Category;
};
function EditCategoryButton({ category }: Props) {
  const dispatch = useDispatch();
  return (
    <Link
      href={`/dashboard/categories`}
      onClick={() => dispatch(setSelectedCategory(category))}
    >
      <button className="btn btn-primary px-4 text-lg">
        Edit this category
      </button>
    </Link>
  );
}

export default EditCategoryButton;
