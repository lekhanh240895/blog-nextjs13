import React from "react";
import Avatar from "./Avatar";
import { format } from "date-fns";

function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-3 md:gap-x-6 text-sm text-gray-500 py-4">
      <Avatar
        href={`/account/@${comment.user.name}}`}
        src={comment.user.image}
        alt={comment.user.name}
      />

      <div>
        <div className="flex gap-x-2 mb-2">
          <h1>{comment.user.name}</h1>
          <span>
            on {format(new Date(comment.createdAt), "MM/dd/yyyy HH:mm")}
          </span>
        </div>

        <p className="text-gray-500 tracking-wider leading-6 mb-4">
          {comment.text}
        </p>

        <button className="btn btn-primary rounded-full py-1 text-gray-100">
          Reply
        </button>
      </div>
    </div>
  );
}

export default Comment;
