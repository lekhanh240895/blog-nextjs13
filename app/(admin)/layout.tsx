"use client";
import DeleteCategory from "@/app/modal/DeleteCategory";
import DeletePost from "@/app/modal/DeletePost";
import { signIn, useSession } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

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
    <>
      <DeletePost />
      <DeleteCategory />

      {children}
    </>
  );
}
