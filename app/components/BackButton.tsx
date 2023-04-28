"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <button
      className="btn flex items-center justify-between px-2 gap-x-1"
      onClick={() => router.back()}
    >
      <ChevronLeftIcon className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
}

export default BackButton;
