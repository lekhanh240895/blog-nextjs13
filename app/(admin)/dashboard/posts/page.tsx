import ClientSiteRoute from "@/app/components/ClientSiteRoute";
import PostsTable from "@/app/components/admin/PostsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Posts() {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl uppercase mb-4">Posts</h2>

        <ClientSiteRoute route="/dashboard/posts/create">
          <span> Create new post</span>
        </ClientSiteRoute>
      </div>

      <PostsTable />
    </section>
  );
}
