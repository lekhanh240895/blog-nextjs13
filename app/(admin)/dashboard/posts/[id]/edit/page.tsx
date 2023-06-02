import EditPostBody from "@/app/components/admin/EditPostBody";
import { getData } from "@/app/lib/getApi";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const post = await getData("posts", { _id: id });

  if (!post) return {};

  return {
    title: post.title,
  };
}

export async function generateStaticParams() {
  const posts: Post[] = await getData("posts");

  return posts.map((post) => ({
    id: post._id,
  }));
}

async function EditPost() {
  return <EditPostBody />;
}

export default EditPost;
