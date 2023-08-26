"use client";

import { MutableRefObject, useEffect } from "react";

function useOnClickOutside(
  ref: MutableRefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
