import Image from "next/image";
import React from "react";
import { TagIcon } from "@heroicons/react/24/outline";
import ClientSiteRoute from "./ClientSiteRoute";
import { toDate } from "../lib/toDate";
import Spinner from "./Spinner";

interface Props {
  posts: Post[];
}

function BlogList({ posts }: Props) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 px-4 md:px-10 pb-24">
      <Spinner />
      {posts.map((post) => (
        <li
          key={post._id}
          className="min-h-[320px] md:[&:nth-child(6n+1)]:col-span-2 md:[&:nth-child(6n+1)]:row-span-4 lg:[&:nth-child(6n+2)]:row-span-5 md:[&:nth-child(6n+2)]:row-span-6 md:[&:nth-child(6n+3)]:row-span-4 lg:[&:nth-child(6n+3)]:row-span-5 md:[&:nth-child(6n+4)]:row-span-6 lg:[&:nth-child(6n+4)]:row-span-5 md:[&:nth-child(6n+5)]:row-span-4 lg:[&:nth-child(6n+5)]:row-span-5 md:[&:nth-child(6n+6)]:col-span-2 md:[&:nth-child(6n+6)]:row-span-4 space-y-6 flex flex-col justify-between"
        >
          <div className="group cursor-pointer relative grow">
            <ClientSiteRoute route={`/post/${post.slug.current}`}>
              <div className="relative w-full min-h-[320px] h-full drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                <Image
                  src={post.mainImage}
                  alt={post.author?.name}
                  fill
                  sizes="100%"
                  className="object-cover object-center"
                />
              </div>

              <div className="absolute bottom-0 bg-black bg-opacity-20 backdrop-blur-lg rounded w-full text-white drop-shadow-lg p-5">
                {post.title}
              </div>
            </ClientSiteRoute>
          </div>

          <div className="flex flex-wrap gap-x-2 items-center justify-center">
            <div className="w-8 h-8 relative">
              <Image
                fill
                alt="avatar"
                src={post.author.image}
                className="rounded-full object-cover"
                sizes="100%"
              />
            </div>

            <h2>{post.author.name}</h2>

            <div className="w-1 h-1 rounded-full bg-primary mx-2"></div>

            <div>{toDate(post._createdAt)}</div>
          </div>

          <div className="text-gray-500 line-clamp-2">{post.description}</div>

          <div className="flex items-center justify-center gap-x-2">
            <TagIcon className="w-5 h-5 text-primary" />

            {post.categories.map((category) => (
              <span key={category._id} className="">
                {category.title}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BlogList;
