"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

function EditButton({ post }: { post: Post }) {
  const { data: session } = useSession();

  return (
    <>
      {(session?.user._id === post.user._id ||
        session?.user.role === "admin") && (
        <Link
          href={`/dashboard/posts/${post._id}/edit`}
          className="btn btn-primary px-4 text-lg min-w-[244px]"
        >
          Chỉnh sửa bài viết
        </Link>
      )}
    </>
  );
}

export default EditButton;
