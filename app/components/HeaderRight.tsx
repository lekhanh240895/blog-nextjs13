"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  BookOpenIcon,
  ShoppingCartIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
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
import { useDeferredValue, useEffect, useState } from "react";
import useSwr, { Fetcher } from "swr";
import axios from "axios";

function HeaderRight() {
  const { data: session } = useSession();
  const { cartProductIds, showSearchBar } = useSelector(appSelector);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const fetcher: Fetcher<
    {
      posts: Post[];
      popuparPosts: Post[];
      users: User[];
      categories: Category[];
    },
    string
  > = async (url) => {
    const res = await axios.get(url);
    return res.data;
  };
  const apiUrl = `/api/search?q=${deferredQuery}`;

  const { data } = useSwr(apiUrl, fetcher);

  const posts = data?.posts;
  const categories = data?.categories;
  const users = data?.users;

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
      <div
        className={`bg-primary relative text-white pr-3 flex items-center rounded-full h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 transition-all duration-300 ${
          showSearchBar && "!w-64"
        }`}
      >
        <span
          className="text-white h-9 w-9 sm:h-10 sm:w-10 md:w-11 md:h-11 flex items-center justify-center p-2 flex-shrink-0 cursor-pointer"
          onClick={() => {
            dispatch(setShowSearchBar(!showSearchBar));
          }}
        >
          <MagnifyingGlassIcon />
        </span>

        {showSearchBar && (
          <input
            type="text"
            placeholder="Bạn đang tìm kiếm điều gì?"
            className="h-full rounded-full p-0 bg-inherit text-white shadow-none placeholder:text-white/90 focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-transparent transition-all"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        )}

        {/* Search results */}
        {showSearchBar && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg mt-1 rounded-b-md text-black z-10 max-h-[300px] md:max-h-[500px] overflow-scroll ">
            {posts && posts.length > 0 && (
              <>
                <h5 className="text-gray-400 text-sm italic py-1 px-2 pointer-events-none">
                  Bài viết
                </h5>

                {posts.map((post) => (
                  <Link
                    href={`/${post.slug}`}
                    key={post._id}
                    className="hover:bg-gray-100 px-4 py-2 block"
                  >
                    <div className="flex gap-2">
                      <BookOpenIcon className="text-primary h-6 w-6 flex-shrink-0" />
                      <h2>{post.title}</h2>
                    </div>
                  </Link>
                ))}
              </>
            )}

            {users && users.length > 0 && (
              <>
                <h5 className="text-gray-400 text-sm italic py-1 px-2 pointer-events-none">
                  Tác giả
                </h5>

                {users.map((user) => (
                  <Link
                    href={`/account/${user.username}`}
                    key={user._id}
                    className="hover:bg-gray-100 px-4 py-2 block"
                  >
                    <div className="flex gap-2">
                      <Avatar src={user.image} className="w-10 h-10" />
                      <h2>{user.name}</h2>
                    </div>
                  </Link>
                ))}
              </>
            )}

            {categories && categories.length > 0 && (
              <>
                <h5 className="text-gray-400 text-sm italic py-1 px-2 pointer-events-none">
                  Danh mục
                </h5>

                {categories.map((category) => (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category._id}
                    className="hover:bg-gray-100 px-4 py-2 block"
                  >
                    <div className="flex gap-2">
                      <TagIcon className="text-primary w-6- h-6 flex-shrink-0" />
                      <h2>{category.title}</h2>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        )}
      </div>

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
