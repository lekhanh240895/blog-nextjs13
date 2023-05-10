import React from "react";
import Avatar from "./Avatar";
import { format } from "date-fns";

function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-3 md:gap-x-6 text-sm text-gray-500 py-4">
      <Avatar href={`/@${comment.user.name}}`} src={comment.user.image} />

      <div className="space-y-4">
        <div className="flex gap-x-2">
          <h1>{comment.user.name}</h1>
          <span>
            on {format(new Date(comment.createdAt), "MM/dd/yyyy HH:mm")}
          </span>
        </div>

        <p className="text-gray-500 tracking-wider leading-6">{comment.text}</p>

        <button className="btn btn-primary rounded-full py-1 text-gray-100">
          Reply
        </button>
      </div>
    </div>
  );
}

export default Comment;
