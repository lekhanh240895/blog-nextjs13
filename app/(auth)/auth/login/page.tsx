"use client";

import { setLoginModalOpened } from "@/app/features/appSlice";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || window.location.origin;
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push(callbackUrl);
  }

  return (
    <main className="w-screen h-screen bg-blue-900 grid place-items-center">
      <div className="flex flex-col space-y-4">
        <button
          className="btn px-6 py-2 min-w-[200px] bg-white text-slate-900"
          onClick={() => dispatch(setLoginModalOpened(true))}
        >
          Log in with email / username
        </button>
        <button
          className="btn px-6 py-2 min-w-[200px] bg-white text-slate-900"
          onClick={() =>
            signIn("google", {
              callbackUrl: `${
                callbackUrl ? callbackUrl : window.location.origin
              }`,
            })
          }
        >
          Log in with Google
        </button>
        <button
          className="btn px-6 py-2 min-w-[200px] bg-white text-slate-900"
          onClick={() =>
            signIn("github", {
              callbackUrl: `${
                callbackUrl ? callbackUrl : window.location.origin
              }`,
            })
          }
        >
          Log in with Github
        </button>
      </div>
    </main>
  );
}

export default Login;
