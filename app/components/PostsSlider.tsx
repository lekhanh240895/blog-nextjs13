"use client";

import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import React from "react";
import Link from "next/link";
import { postSelector } from "../redux/selector";
import Avatar from "./Avatar";

function PostsSlider() {
  const { posts } = useSelector(postSelector);

  return (
    <>
      {posts.length > 0 && (
        <div className="relative pt-12">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{ prevEl: ".swiper-left", nextEl: ".swiper-right" }}
            pagination={{
              clickable: true,
            }}
            className="!pb-12 md:!pb-48"
            autoplay
            breakpoints={{
              1024: {
                slidesPerView: 1.5,
              },
            }}
            centeredSlides
            loop
            autoHeight
          >
            {posts.map((post) => (
              <SwiperSlide key={post._id}>
                {({ isActive }) => (
                  <div>
                    <Link href={"/" + post.slug}>
                      <div className="relative w-full min-h-[500px]">
                        <Image
                          src={post.mainImage}
                          alt={post.title}
                          fill
                          priority
                          sizes="100%"
                          className="object-cover object-center "
                        />
                      </div>
                    </Link>

                    {isActive && (
                      <div className="relative md:absolute z-50 bottom-0 md:translate-y-1/2 left-1/2 -translate-x-1/2 bg-white flex flex-col justify-center px-4 md:px-10 py-4 gap-4 md:gap-6 shadow-md">
                        <div className="inline-flex items-center justify-center gap-x-2">
                          <TagIcon className="w-8 h-8 text-primary" />
                          <div className="text-2xl">
                            <Link href={"/category/" + post.category.slug}>
                              {post.category?.title}
                            </Link>

                            <div>
                              {post.category?.parent ? (
                                <span>
                                  <span>, </span>
                                  <Link
                                    href={
                                      "/category/" + post.category?.parent.slug
                                    }
                                  >
                                    {post.category?.parent.title}
                                  </Link>
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>

                        <h1 className="text-3xl font-bold text-center text-black">
                          {post.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center tracking-wider gap-2">
                          <div className="flex items-center gap-2">
                            <Avatar
                              src={post.user.image}
                              className="w-8 h-8"
                              href={`/account/@${post.user.name}`}
                              alt={post.user.name}
                            />
                            <h2>{post.user.name}</h2>
                          </div>

                          <div className="w-1 h-1 rounded-full bg-primary mx-2"></div>

                          <div className="">
                            {format(
                              new Date(post.createdAt),
                              "MMM d, yyyy HH:mm"
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </SwiperSlide>
            ))}

            <div className="absolute left-0 top-0 right-0 h-[500px]">
              <div className="swiper-left hidden md:flex absolute z-50 cursor-pointer left-5 lg:left-10 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary text-white p-3 opacity-80 hover:opacity-100 hover:w-14 lg:hover:w-16 transition-all items-center justify-center">
                <ArrowLeftIcon />
              </div>
              <div className="swiper-right hidden md:flex absolute z-50 cursor-pointer right-5 lg:right-10 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary text-white p-3 opacity-80 hover:opacity-100 hover:w-14 lg:hover:w-16 transition-all items-center justify-center">
                <ArrowRightIcon />
              </div>
            </div>
          </Swiper>
        </div>
      )}
    </>
  );
}

export default PostsSlider;
