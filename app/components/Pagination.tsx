"use client";

import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Pagination() {
  const [active, setActive] = React.useState(1);

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const activeClass = "btn";
  const normalClass = "btn btn-text";
  const disabledClass = "flex items-center gap-2 btn btn-disabled";

  return (
    <div className="flex items-center gap-4 my-10 justify-center">
      <button
        className={
          active === 1
            ? "flex items-center gap-2 btn btn-disabled"
            : "flex items-center gap-2 btn btn-text"
        }
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </button>
      <div className="flex items-center gap-2">
        <button
          className={active === 1 ? activeClass : normalClass}
          onClick={() => setActive(1)}
        >
          1
        </button>
        <button
          className={active === 2 ? activeClass : normalClass}
          onClick={() => setActive(2)}
        >
          2
        </button>
        <button
          className={active === 3 ? activeClass : normalClass}
          onClick={() => setActive(3)}
        >
          3
        </button>
        <button
          className={active === 4 ? activeClass : normalClass}
          onClick={() => setActive(4)}
        >
          4
        </button>
        <button
          className={active === 5 ? activeClass : normalClass}
          onClick={() => setActive(5)}
        >
          5
        </button>
      </div>

      <button
        className={
          active === 5
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
