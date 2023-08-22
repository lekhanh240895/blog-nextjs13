"use client";

import { Tab } from "@headlessui/react";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSwr, { Fetcher } from "swr";
import Avatar from "./Avatar";
import { postSelector } from "../redux/selector";
import { useSelector } from "react-redux";
import { TagIcon } from "@heroicons/react/20/solid";
import Pagination from "./Pagination";
import Image from "next/image";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchTabs() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page");
  const numberPerPage = parseInt(searchParams.get("perPage") || "2", 10);

  const { posts: postsStore } = useSelector(postSelector);

  const fetcher: Fetcher<
    {
      popularPosts: Post[];
      posts: Post[];
      users: User[];
      categories: Category[];
    },
    string
  > = async (url) => {
    const res = await axios.get(url);
    return res.data;
  };

  const apiUrl = `/api/search?q=${query}`;
  const { data } = useSwr(apiUrl, fetcher);

  const popularPosts = data?.popularPosts;
  const posts = data?.posts;
  const categories = data?.categories;
  const users = data?.users;
  return (
    <div>
      <div className="w-full pb-16">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-blue-100 shadow text-black"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Bài viết thịnh hành
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-blue-100 shadow text-black"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Bài viết
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-blue-100 shadow text-black"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Tác giả
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-blue-100 shadow text-black"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Danh mục
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-2 max-h-[300px] md:max-h-screen overflow-scroll">
            <Tab.Panel
              className={classNames(
                "rounded-xl bg-white p-2",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {popularPosts?.map((post) => (
                  <Link
                    href={`/${post.slug}`}
                    key={post._id}
                    className=" rounded-md p-2 hover:bg-gray-100 block ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  >
                    <div className="flex items-stretch gap-2 md:gap-3">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={post.mainImage}
                          alt={post.title}
                          fill
                          className="object-cover object-center rounded"
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium leading-5 text-black">
                          {post.title}
                        </h3>

                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                          <li>
                            {format(new Date(post.createdAt), "MM/dd/yyyy")}
                          </li>
                          <li>&middot;</li>
                          <li>{post.comments.length} bình luận</li>
                          <li>&middot;</li>
                          <li>{post.views} lượt xem</li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                ))}
              </ul>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                "rounded-xl bg-white p-2",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {posts?.map((post) => (
                  <Link
                    href={`/${post.slug}`}
                    key={post._id}
                    className=" rounded-md p-2 hover:bg-gray-100 block ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  >
                    <div className="flex items-stretch gap-2 md:gap-3">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={post.mainImage}
                          alt={post.title}
                          fill
                          className="object-cover object-center rounded"
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium leading-5 text-black">
                          {post.title}
                        </h3>

                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                          <li>
                            {format(new Date(post.createdAt), "MM/dd/yyyy")}
                          </li>
                          <li>&middot;</li>
                          <li>{post.comments.length} bình luận</li>
                          <li>&middot;</li>
                          <li>{post.views} lượt xem</li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                ))}
              </ul>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                "rounded-xl bg-white p-2",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {users?.map((user) => (
                  <Link
                    href={`/author/${user.username}`}
                    key={user._id}
                    className="rounded-md flex items-stretch gap-2 p-2 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  >
                    <Avatar src={user.image} className="w-20 h-20" />

                    <div className="">
                      <h3 className="text-black text-sm leading-5">
                        {user.name}
                      </h3>
                      <p className="flex gap-1 items-center text-xs text-gray-500 leading-4">
                        <span>
                          {
                            postsStore.filter(
                              (post) => post.user._id === user._id
                            ).length
                          }
                        </span>
                        <span>Bài viết</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </ul>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                "rounded-xl bg-white p-2",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {categories?.map((category) => (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category._id}
                    className=" rounded-md p-2 hover:bg-gray-100 flex gap-2 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  >
                    <TagIcon className="w-10 h-10 text-primary" />
                    <div>
                      <h3 className="text-sm font-medium leading-5 text-black">
                        {category.title}
                      </h3>

                      <p className="flex gap-1 items-center text-xs text-gray-500 leading-4">
                        <span>
                          {
                            postsStore.filter(
                              (post) => post.category._id === category._id
                            ).length
                          }
                        </span>
                        <span>Bài viết</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
