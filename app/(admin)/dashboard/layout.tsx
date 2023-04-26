"use client";

import { signIn, useSession } from "next-auth/react";
import DashboardLayout from "@/app/components/DashboardLayout";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="w-screen h-screen bg-blue-900 grid place-items-center">
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
      </div>
    );

  return (
    <Provider store={store}>
      <DashboardLayout>{children}</DashboardLayout>
    </Provider>
  );
}
