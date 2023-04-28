import ClientSiteRoute from "@/app/components/ClientSiteRoute";
import { getPostBySlug, getPosts } from "@/app/lib/getApi";
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
  const post = await getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
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
  const post: Post = await getPostBySlug(slug);

  if (!post) return;

  return (
    <article className="post px-4 md:px-10 pb-24 py-12">
      <ClientSiteRoute route={`/dashboard/post/${post._id}/edit`}>
        <div className="text-center my-5">
          <button className="btn btn-primary px-4 text-lg">
            Edit this post
          </button>
        </div>
      </ClientSiteRoute>
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
              <div className="relative h-10 w-10">
                <Image
                  src={post.user.image}
                  alt={post.user.name}
                  fill
                  sizes="100%"
                  className="object-cover object-center rounded-full"
                />
              </div>

              <h3 className="text-lg font-bold">{post.user.name}</h3>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <h2 className="italic">{post.description}</h2>

            <div className="flex items-center justify-end space-x-2 mt-auto">
              <ClientSiteRoute
                route={`/category/${post.category?.title.toLowerCase()}`}
              >
                <button className="btn btn-primary text-white">
                  {post.category?.title}
                </button>
              </ClientSiteRoute>

              {post.category?.parent && (
                <ClientSiteRoute
                  route={`/category/${post.category?.title.toLowerCase()}`}
                >
                  <button className="btn btn-primary text-white">
                    {post.category?.parent.title}
                  </button>
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
    </article>
  );
}

export default Post;
