import PostsTable from "@/app/components/admin/PostsTable";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Posts() {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl uppercase mb-4">Posts</h2>

        <Link
          href="/dashboard/posts/create"
          className="btn btn-primary inline-block mb-4"
        >
          Create new post
        </Link>
      </div>

      <PostsTable />
    </section>
  );
}
