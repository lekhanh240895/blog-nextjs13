import LoginBody from "@/app/components/LoginBody";
import Spinner from "@/app/components/Spinner";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Login | KhanhReview",
  };
}

function Login() {
  return (
    <main className="w-screen h-screen bg-blue-900 grid place-items-center p-4">
      <Suspense fallback={<Spinner />}>
        <LoginBody />
      </Suspense>
    </main>
  );
}

export default Login;
