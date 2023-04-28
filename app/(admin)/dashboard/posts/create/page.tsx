"use client";

import PostForm from "@/app/components/admin/PostForm";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl">Create new post</h2>

        <button
          className="btn flex items-center justify-between px-2 gap-x-1"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <PostForm />
    </main>
  );
}
