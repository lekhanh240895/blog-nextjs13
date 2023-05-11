import BackButton from "@/app/components/admin/BackButton";
import PostForm from "@/app/components/admin/PostForm";
import { getData } from "@/app/lib/getApi";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const post = await getData("posts", { _id: id });

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

async function EditPost({ params }: Props) {
  const { id } = params;

  const editedPost: Post = await getData("posts", { _id: id });

  if (!editedPost) return;

  return (
    <section>
      <BackButton />

      <h2 className="text-3xl mb-4 md:mr--24">
        Edit post - {editedPost.title}
      </h2>

      <PostForm editedPost={editedPost} />
    </section>
  );
}

export default EditPost;
