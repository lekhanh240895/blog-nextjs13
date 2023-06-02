"use client";

import BackButton from "@/app/components/admin/BackButton";
import PostForm from "@/app/components/admin/PostForm";
import { postSelector } from "@/app/redux/selector";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

function EditPostBody() {
  const params = useParams();
  const { posts } = useSelector(postSelector);
  const { id } = params;

  const editedPost = posts.find((post) => post._id === id);

  return (
    <section>
      <BackButton />

      <h2 className="text-3xl mb-4 md:mr-24">
        Edit post - {editedPost?.title}
      </h2>

      <PostForm editedPost={editedPost} />
    </section>
  );
}

export default EditPostBody;
