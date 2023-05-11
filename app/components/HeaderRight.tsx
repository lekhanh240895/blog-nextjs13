"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import BasicMenu from "./BasicMenu";
import Avatar from "./Avatar";

function HeaderRight() {
  const { data: session } = useSession();

  const AvtarMenu = [
    {
      title: "Account",
      slug: "account",
    },
    {
      title: "Language",
    },
    {
      title: "Sign Out",
      onClick: () => signOut(),
    },
  ];

  return (
    <div className="flex items-center gap-x-3">
      <button className="flex-shrink-0 p-2 md:p-3 w-9 sm:w-10 h-9 sm:h-10 md:w-11 md:h-11 text-white rounded-full bg-primary shadow-md transition hover:-translate-y-1 ease-in-out duration-200">
        <MagnifyingGlassIcon />
      </button>

      {session ? (
        <>
          <Link href="/cart">
            <button className="flex-shrink-0 p-2 md:p-3 w-9 sm:w-10 h-9 sm:h-10 md:w-11 md:h-11 text-white rounded-full bg-primary shadow-md transition hover:-translate-y-1 ease-in-out duration-200">
              <ShoppingCartIcon />
            </button>
          </Link>

          <BasicMenu items={AvtarMenu}>
            <Avatar
              src={session.user.image}
              className="!w-11 !h-11 hidden md:block"
            />
          </BasicMenu>
        </>
      ) : (
        <button
          className="btn btn-outline h-9 md:h-11 grid place-items-center"
          onClick={() => signIn("google")}
        >
          Log in
        </button>
      )}
    </div>
  );
}

export default HeaderRight;
