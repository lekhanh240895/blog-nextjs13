"use client";
import PostForm from "@/app/components/admin/PostForm";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditPost() {
  const params = useParams();
  const { id } = params;
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/posts?id=" + id);
      setEditedPost(res.data);
    })();
  }, [id]);

  return (
    <main>
      <div className="flex items-start justify-between mb-4 gap-x-4">
        <h2 className="text-3xl text-blue-900">
          Edit post - {editedPost?.title}
        </h2>

        <button
          className="btn  flex items-center justify-between px-2 gap-x-1"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <PostForm editedPost={editedPost} />
    </main>
  );
}

export default EditPost;
