import Image from "next/image";
import ClientSiteRoute from "./ClientSiteRoute";
import PostInfo from "./PostInfo";
import {
  EyeIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/20/solid";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  return (
    <li
      // className="min-h-[320px] md:[&:nth-child(6n+1)]:col-span-2 md:[&:nth-child(6n+1)]:row-span-4 lg:[&:nth-child(6n+2)]:row-span-5 md:[&:nth-child(6n+2)]:row-span-6 md:[&:nth-child(6n+3)]:row-span-4 lg:[&:nth-child(6n+3)]:row-span-5 md:[&:nth-child(6n+4)]:row-span-6 lg:[&:nth-child(6n+4)]:row-span-5 md:[&:nth-child(6n+5)]:row-span-4 lg:[&:nth-child(6n+5)]:row-span-5 md:[&:nth-child(6n+6)]:col-span-2 md:[&:nth-child(6n+6)]:row-span-4 space-y-6 flex flex-col justify-between"
      className="flex flex-col justify-between gap-2 md:gap-4 animate-[opacity_1s_ease-in-out]"
    >
      <div className="group cursor-pointer relative grow">
        <ClientSiteRoute route={`${post.slug}`}>
          <div className="relative w-full min-h-[400px] h-full drop-shadow-xl group-hover:scale-105 transition duration-200 ease-out">
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              sizes="100%"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="absolute bottom-0 bg-black bg-opacity-20 backdrop-blur-lg rounded w-full text-white drop-shadow-lg p-5">
            {post.title}
          </div>
        </ClientSiteRoute>

        <div className="absolute top-2 right-2 bg-primary text-white flex items-center gap-3 px-4 py-1 rounded-full z-10">
          <div className="flex gap-1 items-center">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>{post.comments.length}</span>
          </div>
          <div className="flex gap-1 items-center">
            <EyeIcon className="w-4 h-4" />
            <span> {post.views}</span>
          </div>

          <div className="flex gap-1 items-center">
            <BookOpenIcon className="w-4 h-4" />
            <span> {post.readTime}</span>
          </div>
        </div>
      </div>

      <PostInfo post={post} />
    </li>
  );
}

export default Post;
