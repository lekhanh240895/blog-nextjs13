"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchComments } from "../features/commentSlice";
import { AppDispatch } from "../redux/store";

interface FormData {
  name: string;
  email: string;
  webstite?: string;
  text: string;
  saveInfo?: boolean;
  website?: string;
}

function PostCommentForm({ postId }: { postId: string }) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: FormData) => {
    const formData = {
      ...data,
      post: postId,
      user: session?.user._id,
    };
    await axios.post("/api/comments", formData);
    dispatch(fetchComments(postId));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 pb-10">
      <div className="flex items-baseline gap-x-2 mb-4 md:mb-10">
        <h1 className="text-3xl">Leave a Reply</h1>
        <span className="block w-2 h-2 rounded-full bg-primary" />
      </div>

      <div className="w-full md:w-2/3 space-y-3">
        <textarea
          placeholder="Comment"
          className="h-40"
          {...register("text", { required: true })}
        />
        <div className="flex gap-x-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
        <input type="text" placeholder="Website" {...register("website")} />

        <label className="block mt-4 text-gray-500">
          <input
            type="checkbox"
            className="w-auto mr-2"
            {...register("saveInfo")}
          />
          Save my name, email, and website in this browser for the next time I
          comment.
        </label>

        <button
          type="submit"
          className="btn btn-primary px-6 py-2 md:px-8 md:py-2 rounded-full md:text-lg"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default PostCommentForm;
