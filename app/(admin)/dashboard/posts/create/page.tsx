"use client";

import PostForm from "@/app/components/PostForm";

export default function CreatePost() {
  return (
    <main>
      <h2 className="text-3xl text-blue-900 mb-4">Create New Post</h2>

      <PostForm />
    </main>
  );
}
