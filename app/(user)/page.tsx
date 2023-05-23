import { Suspense } from "react";
import BlogList from "../components/BlogList";
import { getData } from "../lib/getApi";
import PostsSlider from "../components/PostsSlider";
import AsideContent from "../components/AsideContent";

export default async function Home() {
  const posts: Post[] = await getData("posts");
  const categories: Category[] = await getData("categories");

  return (
    <section>
      <PostsSlider />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 px-4 pt-6 pb-12 md:px-6 md:pt-12 md:pb-24">
        <div className="col-span-2">
          <article>
            <Suspense fallback={<div>Loading...</div>}>
              <BlogList posts={posts} />
            </Suspense>
          </article>
        </div>

        <AsideContent posts={posts} categories={categories} />
      </div>
    </section>
  );
}
