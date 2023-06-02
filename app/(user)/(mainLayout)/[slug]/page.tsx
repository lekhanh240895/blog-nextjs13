import Avatar from "@/app/components/Avatar";
import ClientSiteRoute from "@/app/components/ClientSiteRoute";
import Comments from "@/app/components/Comments";
import { getData, updateView } from "@/app/lib/getApi";
import { format } from "date-fns";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const post = await getData("posts", { slug });

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = await getData("posts");

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

async function Post({ params }: Props) {
  const { slug } = params;
  const post: Post = await getData("posts", { slug });

  await updateView(post._id);

  if (!post) return;

  return (
    <article className="post">
      <div className="text-center my-4">
        <ClientSiteRoute
          route={`/dashboard/posts/${post._id}/edit`}
          className="btn btn-primary px-4 text-lg min-w-[244px]"
        >
          Edit this post
        </ClientSiteRoute>
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
                {format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}
              </p>
            </div>

            <div className="flex md:justify-end items-center gap-x-2 flex-shrink-0">
              <Avatar
                className="!w-10 !h-10"
                src={post.user.image}
                alt={post.user.name}
              />

              <h3 className="text-lg font-bold">{post.user.name}</h3>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <h2 className="italic">{post.description}</h2>

            <div className="flex items-center justify-end space-x-2 mt-auto">
              <ClientSiteRoute
                route={`/category/${post.category?.title.toLowerCase()}`}
                className="btn btn-primary bg-primary"
              >
                {post.category?.title}
              </ClientSiteRoute>

              {post.category?.parent && (
                <ClientSiteRoute
                  route={`/category/${post.category?.title.toLowerCase()}`}
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

        <section className="pt-4 pb-10">
          <div className="flex items-baseline gap-x-2 mb-4 md:mb-10 justify-center md:justify-start">
            <h1 className="text-3xl">About the Author</h1>
            <span className="block w-2 h-2 rounded-full bg-primary" />
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center md:items-start text-sm text-gray-500">
            <Avatar
              href={`/account/${post.user.name}}`}
              src={post.user.image}
            />

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2 justify-center md:justify-start">
                <h1>{post.user.name}</h1>
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span>Collaborator & Editor</span>
              </div>

              <p className="text-gray-500 tracking-wider leading-6 text-center md:text-left">
                Hello! My name is Mary Buzard!, Actively writing articles for
                this website. I really like tutorials and illustrations, so stay
                alert for my next tutorials.
              </p>

              <button className="btn btn-primary rounded-full py-2 md:py-1 text-gray-100 max-w-[150px] self-center md:self-start">
                View All Articles
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

export default Post;
