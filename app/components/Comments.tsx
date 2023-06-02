"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentSelector } from "../redux/selector";
import { fetchComments } from "../features/commentSlice";
import { AppDispatch } from "../redux/store";
import PostCommentForm from "./PostCommentForm";
import Comment from "./Comment";

function Comments({ postId }: { postId: string }) {
  const { comments } = useSelector(commentSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  return (
    <section className="pt-4 pb-10">
      {comments.length > 0 && (
        <div className="mb-4 md:mb-10">
          <h1 className="text-3xl mb-4 md:mb-10">Comments</h1>

          <div className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-baseline gap-x-2 mb-4 md:mb-10">
        <h1 className="text-3xl">Leave a Reply</h1>
        <span className="block w-2 h-2 rounded-full bg-primary" />
      </div>

      <PostCommentForm postId={postId} />
    </section>
  );
}

export default Comments;
