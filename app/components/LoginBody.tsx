"use client";

import { setLoginModalOpened } from "@/app/features/appSlice";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function LoginBody() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  useEffect(() => {
    if (session) {
      router.push(callbackUrl || window.location.origin);
    }
  }, [callbackUrl, router, session]);

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <h1 className="text-white text-center text-5xl mb-8">
        Auth is required to access this page
      </h1>

      <p className="text-xl text-center text-gray-400 mb-8">
        Please try again later or contact support if the problem persists.
      </p>

      <div className="flex gap-4 md:ap-10 mb-8">
        <button
          className="btn bg-blue-100 hover:bg-blue-200"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
        <button
          className="btn bg-white"
          onClick={() => dispatch(setLoginModalOpened(true))}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginBody;
