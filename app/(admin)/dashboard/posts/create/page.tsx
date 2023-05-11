import BackButton from "@/app/components/admin/BackButton";
import PostForm from "@/app/components/admin/PostForm";

export default function CreatePost() {
  return (
    <section>
      <BackButton />

      <h2 className="text-3xl mb-4">Create new post</h2>

      <PostForm />
    </section>
  );
}
