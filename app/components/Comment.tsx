import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, setSelectedComment } from "../features/commentSlice";
import { commentSelector } from "../redux/selector";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import axios from "axios";
import { AppDispatch } from "../redux/store";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { setLoginModalOpened } from "../features/appSlice";
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

function Comment({ comment }: { comment: Comment }) {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedComment } = useSelector(commentSelector);
  const { handleSubmit, register, setValue, reset } = useForm<FormData>();
  const { data: session } = useSession();

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
        user: session?.user._id,
        comment: comment._id,
      };
    } else {
      formData = {
        ...data,
        comment: comment._id,
      };
    }

    const res = await axios.post("/api/comments", formData);
    const newReply: Comment = await res.data;

    const updatedComment = await axios.put(`/api/comments?_id=${comment._id}`, {
      replies: [...comment.replies, newReply._id],
    });

    if (formData.saveInfo) {
      localStorage.setItem(
        "guestInfo",
        JSON.stringify({
          name: data.name,
          email: data.email,
        })
      );
    }

    dispatch(fetchComments(comment.post._id));

    reset({
      text: "",
      saveInfo: false,
    });
  };

  const handleLike = async ({
    postId,
    comment,
  }: {
    postId: string;
    comment: Comment;
  }) => {
    if (!session) {
      dispatch(setLoginModalOpened(true));
    } else {
      await axios.put(`/api/comments/${comment._id}/like`, {
        userId: session.user._id,
      });

      dispatch(fetchComments(postId));
    }
  };

  const handleDislike = async ({
    postId,
    comment,
  }: {
    postId: string;
    comment: Comment;
  }) => {
    if (!session) {
      dispatch(setLoginModalOpened(true));
    } else {
      await axios.put(`/api/comments/${comment._id}/dislike`, {
        userId: session.user._id,
      });

      dispatch(fetchComments(postId));
    }
  };

  return (
    <div className="flex gap-3 md:gap-x-6 text-sm text-gray-500 py-4">
      {comment.user ? (
        <Avatar
          href={`/author/${comment.user.username}`}
          src={comment.user.image}
          alt={comment.user.name}
          className="w-20 h-20"
        />
      ) : (
        <Avatar src="" alt={comment.name} className="w-20 h-20" />
      )}

      <div className="space-y-2">
        <div className="flex flex-wrap gap-x-2">
          <h1>{comment.user ? comment.user.name : comment.name}</h1>
          <span>
            on{" "}
            {format(new Date(comment.createdAt), "MM/dd/yyyy HH:mm", {
              locale: vi,
            })}
          </span>
        </div>

        <p className="text-gray-500 tracking-wider">{comment.text}</p>
        <div className="flex gap-3">
          <span className="flex gap-1 items-center">
            <span className="text-sm">{comment.likes.length}</span>
            <HandThumbUpIcon
              className="w-3 h-3 cursor-pointer"
              onClick={() => handleLike({ postId: comment.post._id, comment })}
            />
          </span>
          <span className="flex gap-1 items-center">
            <span className="text-sm">{comment.dislikes.length}</span>
            <HandThumbDownIcon
              className="w-3 h-3 cursor-pointer"
              onClick={() =>
                handleDislike({ postId: comment.post._id, comment })
              }
            />
          </span>
        </div>

        {/* Replies */}
        {!!comment.replies.length && (
          <div className="pl-10">
            <p>{comment.replies.length} Câu trả lời</p>

            {comment.replies.map((reply) => (
              <div
                key={reply._id}
                className="flex flex-wrap gap-3 md:gap-x-6 text-sm text-gray-500 py-4"
              >
                {reply.user ? (
                  <Avatar
                    href={`/author/${reply.user.username}`}
                    src={reply.user.image}
                    alt={reply.user.name}
                    className="w-20 h-20"
                  />
                ) : (
                  <Avatar src="" alt={reply.name} className="w-20 h-20" />
                )}

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-x-2">
                    <h1>{reply.user ? reply.user.name : reply.name}</h1>
                    <span>
                      {format(new Date(reply.createdAt), "MM/dd/yyyy HH:mm", {
                        locale: vi,
                      })}
                    </span>
                  </div>
                  <p className="text-gray-500 tracking-wider">{reply.text}</p>
                  <div className="flex gap-3">
                    <span className="flex gap-1 items-center">
                      <span className="text-sm">{reply.likes.length}</span>
                      <HandThumbUpIcon
                        className="w-3 h-3 cursor-pointer"
                        onClick={() =>
                          handleLike({
                            postId: comment.post._id,
                            comment: reply,
                          })
                        }
                      />
                    </span>
                    <span className="flex gap-1 items-center">
                      <span className="text-sm">{reply.dislikes.length}</span>
                      <HandThumbDownIcon
                        className="w-3 h-3 cursor-pointer"
                        onClick={() =>
                          handleDislike({
                            postId: comment.post._id,
                            comment: reply,
                          })
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedComment?._id === comment._id ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-3 pb-2">
              <ArrowUturnLeftIcon
                className="w-5 h-5 rotate-180 cursor-pointer flex-shrink-0"
                onClick={() => dispatch(setSelectedComment(null))}
              />

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder={`Reply to this comment`}
                  {...register("text", { required: true })}
                />

                {!session && (
                  <>
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

                    <label className="block mt-4 text-gray-500">
                      <input
                        type="checkbox"
                        className="w-auto mr-2"
                        {...register("saveInfo")}
                      />
                      Save my name, email in this browser for the next time I
                      comment.
                    </label>
                  </>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary rounded-full py-1 text-gray-100"
            >
              Gửi
            </button>
          </form>
        ) : (
          <button
            className="btn btn-primary rounded-full py-1 text-gray-100"
            onClick={() => dispatch(setSelectedComment(comment))}
            type="button"
          >
            Trả lời
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
