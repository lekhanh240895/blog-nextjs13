import { TagIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import ClientSiteRoute from "./ClientSiteRoute";
import Avatar from "./Avatar";

type Props = {
  post: Post;
};

function PostInfo({ post }: Props) {
  return (
    <>
      <div className="mt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center tracking-wider gap-2">
        <div className="flex items-center gap-2">
          <Avatar
            src={post.user.image}
            className="w-8 h-8"
            href={`/account/@${post.user.name}`}
            alt={post.user.name}
          />
          <h2>{post.user.name}</h2>
        </div>

        <div className="w-1 h-1 rounded-full bg-primary mx-2"></div>

        <div className="">
          {format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}
        </div>
      </div>

      <div className="text-gray-500 line-clamp-2">{post.description}</div>

      <div className="inline-flex items-center justify-center gap-x-2">
        <TagIcon className="w-5 h-5 text-primary" />

        <span className="">
          <ClientSiteRoute route={"/category/" + post.category?.slug}>
            {post.category?.title}
          </ClientSiteRoute>

          <ClientSiteRoute route="/">
            {post.category?.parent ? (
              <span>
                <span>, </span>
                <ClientSiteRoute
                  route={"/category/" + post.category?.parent.slug}
                >
                  {post.category?.parent.title}
                </ClientSiteRoute>
              </span>
            ) : (
              ""
            )}
          </ClientSiteRoute>
        </span>
      </div>
    </>
  );
}

export default PostInfo;
