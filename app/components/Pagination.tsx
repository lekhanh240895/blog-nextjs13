"use client";

import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type Props = {
  itemsLength: number;
  numberPerPage?: number;
  destination?: string;
};
export default function Pagination({
  itemsLength,
  numberPerPage = 6,
  destination = "/page/",
}: Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") as string;
  const { number } = params;
  const router = useRouter();
  const active = parseInt(number || page, 10) || 1;
  const numberOfPage = Math.ceil(itemsLength / numberPerPage) || 1;
  const pageArr = Array.from({ length: numberOfPage }, (_, i) => i + 1);

  const next = () => {
    if (active === numberOfPage) return;

    router.push(destination + (active + 1));
  };

  const prev = () => {
    if (active === 1) return;

    if (active - 1 === 1) {
      return router.push("/");
    }

    router.push(destination + (active - 1));
  };

  const handleSelectPage = (page: number) => {
    router.push(destination + page);
  };

  return (
    <div className="flex items-center gap-4 my-10 justify-center">
      <button
        type="button"
        className={
          active === 1
            ? "flex items-center gap-2 btn btn-disabled"
            : "flex items-center gap-2 btn btn-text"
        }
        onClick={prev}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Trước
      </button>

      <div className="flex items-center gap-2">
        {pageArr.map((page) => (
          <button
            type="button"
            className={active === page ? "btn" : "btn btn-text"}
            onClick={() => handleSelectPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={
          active === numberOfPage
            ? "flex items-center gap-2 btn btn-disabled"
            : "flex items-center gap-2 btn btn-text"
        }
        onClick={next}
      >
        Sau
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
}
