import BackButton from "@/app/components/BackButton";
import PostForm from "@/app/components/admin/PostForm";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const res = await fetch("http://localhost:3000/api/posts?id=" + id, {
    next: {
      revalidate: 30,
    },
  });

  const post: Post = await res.json();

  return {
    title: post.title,
  };
}

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/posts", {
    next: {
      revalidate: 30,
    },
  });

  const posts: Post[] = await res.json();

  return posts.map((post) => ({
    id: post._id,
  }));
}

async function EditPost({ params }: Props) {
  const { id } = params;

  const res = await fetch("http://localhost:3000/api/posts?id=" + id, {
    next: {
      revalidate: 30,
    },
  });

  const editedPost = await res.json();

  return (
    <main>
      <div className="flex items-start justify-between mb-4 gap-x-4">
        <h2 className="text-3xl text-blue-900">
          Edit post - {editedPost?.title}
        </h2>

        <BackButton />
      </div>

      <PostForm editedPost={editedPost} />
    </main>
  );
}

export default EditPost;
