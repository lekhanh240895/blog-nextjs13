"use client";
import DeleteCategory from "@/app/modal/DeleteCategory";
import DeletePost from "@/app/modal/DeletePost";
import DeleteProduct from "../modal/DeleteProduct";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../features/categorySlice";
import { fetchPosts } from "../features/postSlice";
import { fetchProducts } from "../features/productSlice";
import { AppDispatch } from "../redux/store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPosts());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!session)
    return (
      <main className="w-screen h-screen bg-blue-900 grid place-items-center">
        <div className="flex flex-col space-y-4">
          <button
            className="btn px-6 py-2 min-w-[200px] bg-white text-slate-900"
            onClick={() => signIn("google")}
          >
            Log in with Google
          </button>
          <button
            className="btn px-6 py-2 min-w-[200px] bg-white text-slate-900"
            onClick={() => signIn("github")}
          >
            Log in with Github
          </button>
        </div>
      </main>
    );

  return (
    <div>
      <DeletePost />
      <DeleteCategory />
      <DeleteProduct />

      {children}
    </div>
  );
}
