"use client";

import Comment from "./Comment";
import useSwr, { Fetcher } from "swr";
import axios from "axios";

type Props = {
  postId: string;
};

const fetcher: Fetcher<Comment[], string> = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

function Comments({ postId }: Props) {
  const apiUrl: string = "/api/comments?post=" + postId;

  const { data: comments, error } = useSwr(apiUrl, fetcher);

  return (
    <section className="pt-4">
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
