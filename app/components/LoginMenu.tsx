"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";

interface History {
  data?: Item[];
  title?: string;
  component?: () => JSX.Element;
}

interface Item {
  icon: JSX.Element;
  title: string;
  to?: string;

  children?: History;
}

interface LoginMenuProps {
  title: string;
  policy?: boolean;
  items: Item[];
}

export default function LoginMenu({ items, title, policy }: LoginMenuProps) {
  const [history, setHistory] = useState<History[]>([{ data: items }]);

  useEffect(() => {
    setHistory([{ data: items }]);
  }, [items]);

  const current = history[history.length - 1];
  const Component = current.component as () => JSX.Element;

  const renderItems = () => {
    return current.data?.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          item={item}
          onClick={async (e: MouseEventHandler) => {
            if (isParent) {
              setHistory((prevState) => [...prevState, item.children!]);
            } else {
              if (item.title === "Continue with Facebook") {
                await signIn("facebook");
              }
              if (item.title === "Continue with Google") {
                try {
                  await signIn("google");
                } catch (error) {
                  console.log(error);
                }
              }
              if (item.title === "Continue with Github") {
                await signIn("github");
              }
            }
          }}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prevState) => prevState.slice(0, history.length - 1));
  };

  return (
    <div className="">
      {history.length > 1 ? (
        <>
          <button
            onClick={handleBack}
            className="absolute left-5 top-5 w-10 h-10 p-2 rounded-full bg-gray-200"
          >
            <ChevronLeftIcon />
          </button>

          <h4 className="text-2xl flex-1 text-cennter mt-4 mb-10">
            {current.title}
          </h4>

          <Component />
        </>
      ) : (
        <>
          <h1 className="text-2xl mt-4 mb-10">{title}</h1>
          <ul>{renderItems()}</ul>
        </>
      )}

      {policy && (
        <p>
          By continuing, you agree to TikTok’s
          <a href="/legal/terms-of-use" target="_blank">
            Terms of Service
          </a>
          and confirm that you have read TikTok’s
          <a href="/legal/private-policy" target="_blank">
            Private Policy
          </a>
        </p>
      )}
    </div>
  );
}

interface MenuItemProps {
  item: Item;
  [key: string]: any;
}

const MenuItem = ({ item, ...props }: MenuItemProps) => {
  let Component: any;

  if (item.to) {
    Component = Link;
    props.href = item.to;
  } else {
    Component = "div";
  }

  return (
    <li>
      <Component
        {...props}
        className="flex items-center gap-3 py-2 px-4 border border-gray-200 rounded-md mb-4 cursor-pointer"
      >
        <span className="w-9 h-9 p-1 flex items-center justify-center">
          {item.icon}
        </span>

        <span>{item.title}</span>
      </Component>
    </li>
  );
};
