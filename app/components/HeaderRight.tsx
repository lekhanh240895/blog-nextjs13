"use client";

import Link from "next/link";
import {
  Bars3Icon,
  EllipsisHorizontalIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import BasicMenu from "./BasicMenu";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setLoginModalOpened } from "../features/appSlice";
import { appSelector, userSelector } from "../redux/selector";
import { useEffect } from "react";
import SearchBar from "./SearchBar";

function HeaderRight() {
  const { data: session } = useSession();
  const { cartProductIds } = useSelector(appSelector);
  const { users } = useSelector(userSelector);
  const currentUser = users.find((user) => user._id === session?.user._id);

  const dispatch = useDispatch();

  const AvtarMenu = [
    {
      title: "Tài khoản",
      slug: `author/${currentUser?.username}`,
    },
    {
      title: "Đăng xuất",
      onClick: () => signOut(),
    },
  ];

  useEffect(() => {
    dispatch(setCart(JSON.parse(localStorage.getItem("cart") || "[]")));
  }, [dispatch]);

  const MORE_MENU = [
    {
      title: "Đăng nhập",
      onClick: () => dispatch(setLoginModalOpened(true)),
    },
  ];

  return (
    <div className="flex items-center gap-x-3">
      <SearchBar />

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
        <>
          <BasicMenu items={MORE_MENU}>
            <div className="md:hidden flex-shrink-0 icon hover:-translate-y-1">
              <EllipsisHorizontalIcon className="w-8 h-8" />
            </div>
          </BasicMenu>

          <button
            className="hidden md:grid btn btn-primary h-9 md:h-11 place-items-center transition-all hover:-translate-y-1 flex-shrink-0"
            onClick={() => dispatch(setLoginModalOpened(true))}
            type="button"
          >
            Đăng nhập
          </button>
        </>
      )}
    </div>
  );
}

export default HeaderRight;
