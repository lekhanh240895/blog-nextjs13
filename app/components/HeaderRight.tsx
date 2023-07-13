"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import BasicMenu from "./BasicMenu";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  setCart,
  setLoginModalOpened,
  setShowSearchBar,
} from "../features/appSlice";
import { appSelector } from "../redux/selector";
import { useEffect } from "react";

function HeaderRight() {
  const { data: session } = useSession();
  const { cartProductIds, showSearchBar } = useSelector(appSelector);

  const dispatch = useDispatch();

  const AvtarMenu = [
    {
      title: "Account",
      slug: "account",
    },
    {
      title: "Sign Out",
      onClick: () => signOut(),
    },
  ];

  useEffect(() => {
    dispatch(setCart(JSON.parse(localStorage.getItem("cart") || "[]")));
  }, [dispatch]);

  return (
    <div className="flex items-center gap-x-3">
      <button
        className={`bg-primary text-white pr-3 flex items-center rounded-full h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 transition-all duration-300 ${
          showSearchBar && "!w-64"
        }`}
        type="button"
      >
        <span className="text-white h-9 w-9 sm:h-10 sm:w-10 md:w-11 md:h-11 flex items-center justify-center p-2 flex-shrink-0">
          <MagnifyingGlassIcon
            onClick={() => {
              dispatch(setShowSearchBar(!showSearchBar));
            }}
          />
        </span>

        {showSearchBar && (
          <input
            type="text"
            placeholder="Bạn đang tìm kiếm điều gì?"
            className="h-full rounded-full p-0 bg-inherit text-white shadow-none placeholder:text-white/90 focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-transparent transition-all"
          />
        )}
      </button>

      {session ? (
        <>
          <Link href="/cart" className="">
            <button className="relative flex-shrink-0 p-2 md:p-3 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 text-white rounded-full bg-primary shadow-md transition-all hover:-translate-y-1">
              <ShoppingCartIcon />

              {cartProductIds && (
                <div className="bg-white border border-primary z-10 min-w-[8px] h-2 p-3 flex items-center justify-center text-primary absolute -top-3 -right-2 rounded-full">
                  {cartProductIds.length}
                </div>
              )}
            </button>
          </Link>

          <BasicMenu items={AvtarMenu}>
            <Avatar
              src={session.user.image}
              className="w-11 h-11 hidden md:block"
              alt={session.user.name}
            />
          </BasicMenu>
        </>
      ) : (
        <button
          className="btn btn-primary h-9 md:h-11 grid place-items-center transition-all hover:-translate-y-1 flex-shrink-0"
          onClick={() => dispatch(setLoginModalOpened(true))}
          type="button"
        >
          Đăng nhập
        </button>
      )}
    </div>
  );
}

export default HeaderRight;
