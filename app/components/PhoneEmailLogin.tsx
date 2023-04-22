import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoginModalOpened } from "../features/appSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

interface FormData {
  emailOrUsername: string;
  password: string;
}

function PhoneEmailLogin() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      email: data.emailOrUsername,
      username: data.emailOrUsername,
      password: data.password,
      redirect: false,
    });

    if (!res?.error) {
      toast("Đăng nhập thành công!", {
        type: "success",
        autoClose: 2000,
      });
      dispatch(setLoginModalOpened(false));
    } else {
      toast("Thông tin đăng nhập không chính xác!", {
        type: "error",
      });
    }
  };

  return (
    <div>
      {isSubmitting && <Spinner />}

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

          <button
            type="submit"
            className={`btn btn-primary w-full ${
              isSubmitting && "btn-disabled"
            }`}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default PhoneEmailLogin;
