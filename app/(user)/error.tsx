"use client"; // Error components must be Client Components

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-[60vh] md:h-[80vh] flex">
      <div className="m-auto flex flex-col">
        <div className="flex justify-center leading-[100px] md:leading-[150px] whitespace-nowrap text-9xl md:text-[300px]">
          <span className="font-medium">4</span>

          <div className="relative w-32 h-32 md:w-60 md:h-60">
            <Image
              src="/404_Icon.png"
              alt="404"
              className="object-contain align-middle"
              fill
              sizes="100%"
            />
          </div>

          <span className="font-medium">4</span>
        </div>

        <p className="text-3xl text-center mt-6">Đã xảy ra lỗi!</p>

        <p className="text-center font-bold mt-6 md:mt-10  md:text-4xl">
          Xem thêm các bài viết trên KhánhReview
        </p>

        <div className="flex gap-3 justify-center mt-6 md:mt-10">
          <Link href="/" className="btn btn-primary md:min-w-[360px] py-4 px-3">
            <b>Đến trang chủ</b>
          </Link>

          <button onClick={() => reset()} className="btn btn-secondary">
            Thử lại
          </button>
        </div>
      </div>
    </div>
  );
}
