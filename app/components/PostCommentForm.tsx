"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchComments } from "../features/commentSlice";
import { AppDispatch } from "../redux/store";
import Spinner from "./Spinner";

interface FormData {
  name: string;
  email: string;
  text: string;
  saveInfo?: boolean;
}

interface GuestInfo {
  name: string;
  email: string;
}

function PostCommentForm({ postId }: { postId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const guestInfo = localStorage.getItem("guestInfo");

    if (guestInfo) {
      const info: GuestInfo = JSON.parse(guestInfo);
      setValue("email", info.email);
      setValue("name", info.name);
    }
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    let formData;

    if (session) {
      formData = {
        ...data,
        post: postId,
        user: session?.user._id,
      };
    } else {
      formData = {
        ...data,
        post: postId,
      };
    }

    await axios.post("/api/comments", formData);

    if (formData.saveInfo) {
      localStorage.setItem(
        "guestInfo",
        JSON.stringify({
          name: data.name,
          email: data.email,
        })
      );
    }

    dispatch(fetchComments(postId));
    reset({
      text: "",
      saveInfo: false,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4 pb-10">
      {isSubmitting && <Spinner />}
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
        {!session && (
          <>
            <div className="flex gap-x-4">
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>

            <label className="block mt-4 text-gray-500">
              <input
                type="checkbox"
                className="w-auto mr-2"
                {...register("saveInfo")}
              />
              Save my name, email in this browser for the next time I comment.
            </label>
          </>
        )}

        <button
          type="submit"
          className={`btn btn-primary px-6 py-2 md:px-8 md:py-2 rounded-full md:text-lg ${
            isSubmitting && "btn-disabled"
          }`}
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default PostCommentForm;
