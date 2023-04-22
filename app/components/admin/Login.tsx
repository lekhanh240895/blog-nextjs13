import React, { useState } from "react";
import LoginMenu from "../LoginMenu";
import PhoneEmailLogin from "../PhoneEmailLogin";
import { FacebookIcon, GithubIcon, GoogleIcon, UserIcon } from "../Icons";
import PhoneEmailSignup from "../PhoneEmailSignup";

const LOGIN_MENU = {
  title: "Log in to KhanhReview",
  menu: [
    {
      icon: <UserIcon width="2rem" height="2rem" />,
      title: "Use phone / email / username",
      children: {
        title: "Log in",
        data: [],
        component: PhoneEmailLogin,
      },
    },
    {
      icon: <FacebookIcon width="2rem" height="2rem" />,
      title: "Continue with Facebook",
    },
    {
      icon: <GoogleIcon width="2rem" height="2rem" />,
      title: "Continue with Google",
    },
    {
      icon: <GithubIcon width="2rem" height="2rem" />,
      title: "Continue with Github",
    },
  ],
};

const SIGNUP_MENU = {
  title: "Sign up for KhanhReview",
  menu: [
    {
      icon: <UserIcon width="2rem" height="2rem" />,
      title: "Use phone or email",
      children: {
        title: "Sign up",
        component: PhoneEmailSignup,
      },
    },
    {
      icon: <FacebookIcon width="2rem" height="2rem" />,
      title: "Continue with Facebook",
    },
    {
      icon: <GoogleIcon width="2rem" height="2rem" />,
      title: "Continue with Google",
    },
  ],
};

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <main className="w-screen h-screen bg-blue-900 grid place-items-center">
      <div className="w-full max-w-md min-h-[500px] flex flex-col items-center justify-center transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all">
        <div className="p-6 flex-1">
          <LoginMenu
            title={isSignUp ? SIGNUP_MENU.title : LOGIN_MENU.title}
            items={isSignUp ? SIGNUP_MENU.menu : LOGIN_MENU.menu}
          />
        </div>

        {isSignUp ? (
          <div className="border-t border-gray-200 py-5">
            Already have an account?
            <button
              className="ml-2 text-primary cursor-pointer"
              onClick={() => setIsSignUp(false)}
            >
              Sign in
            </button>
          </div>
        ) : (
          <div className="border-t border-gray-200 py-5">
            Don&apos;t have an account?
            <span
              className="ml-2 text-primary cursor-pointer"
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

export default Login;
