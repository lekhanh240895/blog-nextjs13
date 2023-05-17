import { Suspense } from "react";
import BlogList from "../components/BlogList";
import { getData } from "../lib/getApi";
import PostsSlider from "../components/PostsSlider";

export default async function Home() {
  const posts: Post[] = await getData("posts");

  return (
    <section>
      <PostsSlider />

      <article className="px-4 pt-6 pb-12 md:px-10 md:pt-12 md:pb-24 max-w-7xl mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <BlogList posts={posts} />
        </Suspense>
      </article>
    </section>
  );
}
