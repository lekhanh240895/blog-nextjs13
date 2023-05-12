import { Suspense } from "react";
import BlogList from "../components/BlogList";
import { getData } from "../lib/getApi";

export default async function Home() {
  const posts: Post[] = await getData("posts");

  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogList posts={posts} />
      </Suspense>
    </section>
  );
}
