import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoginModalOpened } from "../features/appSlice";

interface FormData {
  emailOrUsername: string;
  password: string;
}

function PhoneEmailLogin() {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await signIn("credentials", {
        email: data.emailOrUsername,
        username: data.emailOrUsername,
        password: data.password,
        redirect: false,
      });
      if (res?.ok) {
        dispatch(setLoginModalOpened(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-1">
        Email or username
        <Link href="/login/phone-or-email/phone" className="text-gray-500">
          Log in with phone
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email or username"
            {...register("emailOrUsername")}
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          <Link
            href="/login/email/forget-password"
            className="block text-sm text-gray-500 text-left"
          >
            Forgot password?
          </Link>

          <button type="submit" className="btn btn-primary w-full">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default PhoneEmailLogin;
