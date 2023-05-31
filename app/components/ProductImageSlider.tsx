"use client";

import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  product: Product;
};

function ProductImageSlider({ product }: Props) {
  return (
    <div className="relative py-12">
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
      >
        {product.images.map((img) => (
          <SwiperSlide key={img}>
            {({ isActive }) => (
              <div>
                <div className="relative w-full min-h-[500px]">
                  <Image
                    src={img}
                    alt={img}
                    fill
                    priority
                    sizes="100%"
                    className="object-cover object-center "
                  />
                </div>
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
  );
}

export default ProductImageSlider;
