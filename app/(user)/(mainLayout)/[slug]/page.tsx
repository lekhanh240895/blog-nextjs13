import Avatar from "@/app/components/Avatar";
import ClientSiteRoute from "@/app/components/ClientSiteRoute";
import Comments from "@/app/components/Comments";
import PostCommentForm from "@/app/components/PostCommentForm";
import { getPost, getPosts, updateView } from "@/app/lib/api";
import { format } from "date-fns";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import { vi } from "date-fns/locale";
import EditPostButton from "@/app/components/EditPostButton";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const post = await getPost({ slug });

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.mainImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

async function Post({ params }: Props) {
  const { slug } = params;
  const post: Post = await getPost({ slug });

  if (!post) return notFound();

  await updateView(post._id);

  return (
    <article className="post">
      <div className="text-center my-4">
        <EditPostButton post={post} />
      </div>

      <section className="relative min-h-[256px] ">
        <div className="absolute top-0 w-full h-full p-10 opacity-10 blur-sm">
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            sizes="100%"
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative px-5 py-10 bg-[rgb(245,245,245,0.1)] w-full text-black">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold">{post.title}</h1>

              <p className="tracking-wider">
                {format(new Date(post.createdAt), "dd MMMM yyyy HH:mm", {
                  locale: vi,
                })}
              </p>
            </div>

            <div className="flex md:justify-end items-center gap-x-2 flex-shrink-0">
              <Avatar
                className="!w-10 !h-10"
                src={post.user.image}
                alt={post.user.name}
                href={`/author/${post.user.username}`}
              />

              <h3 className="text-lg font-bold">{post.user.name}</h3>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <h2 className="italic">{post.description}</h2>

            <div className="flex items-center justify-end space-x-2 mt-auto">
              <ClientSiteRoute
                route={`/category/${post.category?.slug}`}
                className="btn btn-primary bg-primary"
              >
                {post.category?.title}
              </ClientSiteRoute>

              {post.category?.parent && (
                <ClientSiteRoute
                  route={`/category/${post.category?.slug}`}
                  className="btn btn-primary bg-primary"
                >
                  {post.category?.parent.title}
                </ClientSiteRoute>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="post-content"
        />
      </section>

      <div className="divide-y divide-gray-100">
        <Comments postId={post._id} />

        <PostCommentForm postId={post._id} />

        <section className="pt-4 pb-10">
          <div className="flex items-baseline gap-x-2 mb-4 md:mb-10 justify-center md:justify-start">
            <h1 className="text-3xl">About the Author</h1>
            <span className="block w-2 h-2 rounded-full bg-primary" />
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center md:items-start text-sm text-gray-500">
            <Avatar
              href={`/author/${post.user.username}`}
              src={post.user.image}
            />

            <div className="flex flex-col gap-y-4 justify-between">
              <div className="flex items-center gap-x-2 justify-center md:justify-start">
                <h1>{post.user.name}</h1>
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span>Collaborator & Editor</span>
              </div>

              <p className="text-gray-500 tracking-wider leading-6 text-center md:text-left">
                {post.user.description}
              </p>

              <Link
                href={`/author/${post.user.username}`}
                className="btn btn-primary rounded-full py-2 md:py-1 text-gray-100 max-w-[250px] self-center md:self-start"
              >
                Xem tất cả bài viết
              </Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

export default Post;
