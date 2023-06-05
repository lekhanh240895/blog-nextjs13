import EditPostBody from "@/app/components/admin/EditPostBody";
import { getPosts } from "@/app/lib/api";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const post = await getPosts({ _id: id });

  if (!post) return {};

  return {
    title: post.title,
  };
}

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();

  return posts.map((post) => ({
    id: post._id,
  }));
}

async function EditPost() {
  return <EditPostBody />;
}

export default EditPost;
