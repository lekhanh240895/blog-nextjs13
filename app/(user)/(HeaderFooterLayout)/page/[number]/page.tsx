import AsideContent from "@/app/components/AsideContent";
import BlogList from "@/app/components/BlogList";
import Pagination from "@/app/components/Pagination";
import PostsSlider from "@/app/components/PostsSlider";
import { getPostsByPage } from "@/app/lib/api";
import { Suspense } from "react";

type Props = {
  params: {
    number: string;
  };
};

export default async function Home({ params }: Props) {
  const { number } = params;
  const posts = await getPostsByPage(number);

  return (
    <section>
      <PostsSlider />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 px-4 pt-6 pb-12 md:px-6 md:pt-12 md:pb-24 max-w-7xl mx-auto">
        <div className="col-span-2">
          <article>
            <Suspense fallback={<div>Loading...</div>}>
              <BlogList posts={posts} />
            </Suspense>
          </article>

          <Pagination />
        </div>

        {/* @ts-expect-error Async Server Component */}
        <AsideContent />
      </div>
    </section>
  );
}
