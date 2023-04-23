"use client";

import Sidebar from "@/app/components/Sidebar";
import { signIn, useSession } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="w-screen h-screen bg-blue-900 grid place-items-center">
        <button
          className="btn px-6 py-2 min-w-[200px] bg-white text-slate-900"
          onClick={() => signIn("google")}
        >
          Log in with Google
        </button>
      </div>
    );

  return (
    <div className="bg-blue-900 min-h-screen grid grid-cols-4">
      <div className="h-full text-white">
        <Sidebar />
      </div>

      <div className="bg-white m-4 ml-0 col-span-3 rounded-md p-4">
        {children}
      </div>
    </div>
  );
}
