import PostCommentForm from "./PostCommentForm";
import Comment from "./Comment";

type Props = {
  comments: Comment[];
};
function Comments({ comments }: Props) {
  return (
    <section className="pt-4">
      {comments.length > 0 && (
        <div>
          <h1 className="text-3xl mb-4 md:mb-10">Comments</h1>

          <div className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Comments;
