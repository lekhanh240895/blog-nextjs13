"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../features/appSlice";
import { useSession } from "next-auth/react";

type Props = {
  category: Category;
};
function EditCategoryButton({ category }: Props) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  return (
    <>
      {session?.user.role === "admin" && (
        <Link
          href={`/dashboard/categories`}
          onClick={() => dispatch(setSelectedCategory(category))}
          className="btn btn-primary px-4 text-lg"
        >
          Chỉnh sửa danh mục này
        </Link>
      )}
    </>
  );
}

export default EditCategoryButton;
