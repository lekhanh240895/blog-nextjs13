"use client";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function ScrollTopButton() {
  const [visibled, setVisibled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setVisibled(true);
      } else {
        setVisibled(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visibled && (
        <div
          className="btn btn-primary fixed bottom-10 right-10 w-11 h-11 p-3 text-white shadow-xl rounded-full transition hover:-translate-y-1 ease-in-out duration-200 cursor-pointer z-50"
          onClick={scrollToTop}
        >
          <ChevronUpIcon />
        </div>
      )}
    </>
  );
}

export default ScrollTopButton;
