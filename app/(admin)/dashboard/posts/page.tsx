import PostsTable from "@/app/components/PostsTable";
import Link from "next/link";

export default async function Posts() {
  return (
    <main>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-blue-900 uppercase mb-4">Posts</h2>

        <Link
          href="/dashboard/posts/create"
          className="btn btn-primary inline-block mb-4"
        >
          Create new post
        </Link>
      </div>

      <PostsTable />
    </main>
  );
}
