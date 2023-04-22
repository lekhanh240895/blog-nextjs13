"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { BookOpenIcon, TagIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import useSwr, { Fetcher } from "swr";
import axios from "axios";
import {
  categorySelector,
  postSelector,
  userSelector,
} from "../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import { AppDispatch } from "../redux/store";
import { fetchUsers } from "../features/userSlice";
import { fetchCategories } from "../features/categorySlice";
import { useRouter } from "next/navigation";
import useOnClickOutside from "../hooks/useOnClickOutside";

type SearchType = {
  type: string;
  id: string;
  time: Date;
};

function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [recentSearchs, setRecentSearchs] = useState<SearchType[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const deferredQuery = useDeferredValue(query);
  const { posts: postsStore } = useSelector(postSelector);
  const { users: usersStore } = useSelector(userSelector);
  const { categories: categoriesStore } = useSelector(categorySelector);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(searchBarRef, () => setShowSearchBar(false));

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearchs");

    setRecentSearchs(stored ? JSON.parse(stored) : []);
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const fetcher: Fetcher<
    {
      popuparPosts: Post[];
      posts: Post[];
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

  const handleSearch = (type: string, id: string) => {
    const newRecentSearchs = recentSearchs.some((search) => search.id === id)
      ? recentSearchs.map((search) =>
          search.id === id ? { ...search, time: new Date() } : search
        )
      : recentSearchs.concat({
          type,
          id,
          time: new Date(),
        });

    setRecentSearchs(newRecentSearchs);
    localStorage.setItem("recentSearchs", JSON.stringify(newRecentSearchs));

    setShowSearchBar(!showSearchBar);
    setQuery("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.replace(`/search?q=${query}&tab=popularPosts&perPage=6&page=1`);
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div
      className={`bg-primary relative text-white flex items-center rounded-full h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 transition-all duration-300 ${
        showSearchBar && "!w-64"
      }`}
      ref={searchBarRef}
    >
      <span
        className="icon flex-shrink-0"
        onClick={() => setShowSearchBar(!showSearchBar)}
      >
        <MagnifyingGlassIcon className="w-6 h-6 md:w-7 md:h-7" />
      </span>

      <form onSubmit={handleSubmit}>
        {showSearchBar && (
          <input
            type="text"
            placeholder="Bạn đang tìm kiếm điều gì?"
            className="h-full rounded-full p-0 bg-inherit text-white shadow-none placeholder:text-white/90 focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-transparent transition-all"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            ref={inputRef}
          />
        )}
      </form>

      {/* Search results */}
      {showSearchBar && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg shadow-gray-400 mt-2 rounded-b-md text-black z-10 max-h-[300px] md:max-h-[500px] overflow-scroll transition-all">
          {data ? (
            <>
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
                      onClick={() => handleSearch("post", post._id)}
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
                      href={`/author/${user.username}`}
                      key={user._id}
                      className="hover:bg-gray-100 px-4 py-2 block"
                      onClick={() => handleSearch("user", user._id)}
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
                      onClick={() => handleSearch("category", category._id)}
                    >
                      <div className="flex gap-2">
                        <TagIcon className="text-primary w-6- h-6 flex-shrink-0" />
                        <h2>{category.title}</h2>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              <h5 className="text-gray-400 text-sm italic py-1 px-2 pointer-events-none">
                Tìm kiếm gần đây
              </h5>

              {recentSearchs
                .sort((a, b) =>
                  new Date(a.time).getTime() - new Date(b.time).getTime() > 0
                    ? -1
                    : 1
                )
                .map((search) => {
                  switch (search.type) {
                    case "post":
                      const post = postsStore.find(
                        (post) => post._id === search.id
                      );
                      if (post)
                        return (
                          <Link
                            href={`/${post.slug}`}
                            key={post._id}
                            className="hover:bg-gray-100 px-4 py-2 block"
                            onClick={() => handleSearch("post", post._id)}
                          >
                            <div className="flex gap-2">
                              <BookOpenIcon className="text-primary h-6 w-6 flex-shrink-0" />
                              <h2>{post.title}</h2>
                            </div>
                          </Link>
                        );
                    case "user":
                      const user = usersStore.find(
                        (user) => user._id === search.id
                      );
                      if (user)
                        return (
                          <Link
                            href={`/author/${user.username}`}
                            key={user._id}
                            className="hover:bg-gray-100 px-4 py-2 block"
                            onClick={() => handleSearch("user", user._id)}
                          >
                            <div className="flex gap-2">
                              <Avatar src={user.image} className="w-10 h-10" />
                              <h2>{user.name}</h2>
                            </div>
                          </Link>
                        );
                    case "category":
                      const category = categoriesStore.find(
                        (category) => category._id === search.id
                      );
                      if (category)
                        return (
                          <Link
                            href={`/category/${category.slug}`}
                            key={category._id}
                            className="hover:bg-gray-100 px-4 py-2 block"
                            onClick={() =>
                              handleSearch("category", category._id)
                            }
                          >
                            <div className="flex gap-2">
                              <TagIcon className="text-primary w-6- h-6 flex-shrink-0" />
                              <h2>{category.title}</h2>
                            </div>
                          </Link>
                        );
                    default:
                      return;
                  }
                })}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
