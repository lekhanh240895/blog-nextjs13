"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <button
      className="absolute top-4 right-4 md:top-8 md:right-8 btn h-8 flex items-center justify-between px-2 gap-x-1"
      onClick={() => router.back()}
      type="button"
    >
      <ChevronLeftIcon className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
}

export default BackButton;
