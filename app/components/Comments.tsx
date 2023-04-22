"use client";

import Comment from "./Comment";
import useSwr, { Fetcher } from "swr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { commentSelector } from "../redux/selector";
import { useEffect } from "react";
import { fetchComments, setComments } from "../features/commentSlice";
import { AppDispatch } from "../redux/store";

type Props = {
  postId: string;
};

const fetcher: Fetcher<Comment[], string> = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

function Comments({ postId }: Props) {
  const apiUrl: string = "/api/comments?post=" + postId;
  const { comments } = useSelector(commentSelector);
  const { data: updatedComments, error } = useSwr(apiUrl, fetcher);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (updatedComments && updatedComments?.length > comments.length) {
      dispatch(setComments(updatedComments));
    }
  }, [comments.length, dispatch, updatedComments]);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  return (
    <section className="pt-4 pb-6">
      <div>
        <h1 className="text-3xl mb-4 md:mb-10">Comments</h1>

        {error && (
          <button className="btn btn-primary pointer-events-none w-full my-4">
            Failed to load data!
          </button>
        )}

        {comments && comments.length > 0 && (
          <div className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Comments;
