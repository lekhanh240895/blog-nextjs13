"use client";

import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { postSelector } from "../redux/selector";
import { useParams, useRouter } from "next/navigation";

export default function Pagination() {
  const { posts } = useSelector(postSelector);
  const params = useParams();
  const { number } = params;
  const router = useRouter();
  const active = parseInt(number, 10) || 1;
  const postsPerPage = 6;
  const numberOfPage = Math.ceil(posts.length / postsPerPage) || 1;
  const pageArr = Array.from({ length: numberOfPage }, (_, i) => i + 1);

  const next = () => {
    if (active === numberOfPage) return;

    router.push("/page/" + (active + 1));
  };

  const prev = () => {
    if (active === 1) return;

    if (active - 1 === 1) {
      return router.push("/");
    }

    router.push("/page/" + (active - 1));
  };

  const handleSelectPage = (page: number) => {
    if (page === 1) {
      return router.push("/");
    }
    router.push("/page/" + page);
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
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
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
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
}
