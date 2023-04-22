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
        <h2 className="text-3xl uppercase mb-4 md:mr-24">Posts</h2>

        <ClientSiteRoute
          route="/dashboard/posts/create"
          className="btn btn-primary inline-block mb-4"
        >
          Create new post
        </ClientSiteRoute>
      </div>

      <PostsTable />
    </section>
  );
}
