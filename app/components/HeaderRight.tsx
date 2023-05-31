"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import BasicMenu from "./BasicMenu";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setLoginModalOpened } from "../features/appSlice";
import { appSelector } from "../redux/selector";
import { useEffect } from "react";

function HeaderRight() {
  const { data: session } = useSession();
  const { cartProductIds } = useSelector(appSelector);

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
      <button className="btn btn-primary rounded-full flex-shrink-0 p-2 md:p-3 w-9 sm:w-10 h-9 sm:h-10 md:w-11 md:h-11 bg-primary shadow-md transition hover:-translate-y-1 ease-in-out duration-200">
        <MagnifyingGlassIcon />
      </button>

      {session ? (
        <>
          <Link href="/cart" className="">
            <button className="relative flex-shrink-0 p-2 md:p-3 w-9 sm:w-10 h-9 sm:h-10 md:w-11 md:h-11 text-white rounded-full bg-primary shadow-md transition hover:-translate-y-1 ease-in-out duration-200">
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
          className="btn btn-primary h-9 md:h-11 grid place-items-center"
          onClick={() => dispatch(setLoginModalOpened(true))}
        >
          Log in
        </button>
      )}
    </div>
  );
}

export default HeaderRight;
