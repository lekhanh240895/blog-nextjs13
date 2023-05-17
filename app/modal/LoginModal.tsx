"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelector } from "../redux/selector";
import { setLoginModalOpened } from "../features/appSlice";
import PhoneEmailLogin from "../components/PhoneEmailLogin";
import {
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  UserIcon,
} from "../components/Icons";
import PhoneEmailSignup from "../components/PhoneEmailSignup";
import LoginMenu from "../components/LoginMenu";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

export default function LoginModal() {
  const { loginModalOpened } = useSelector(appSelector);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setLoginModalOpened(false));
  };
  return (
    <Transition appear show={loginModalOpened} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md min-h-[500px] flex flex-col transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all">
                <div className="p-6 flex-1">
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 p-2 rounded-full bg-gray-200 absolute top-5 right-5 cursor-pointer"
                  >
                    <XMarkIcon />
                  </button>

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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
