import BlogList from "@/app/components/BlogList";
import EditPostButton from "@/app/components/EditPostButton";
import EditCategoryButton from "@/app/components/EditCategoryButton";
import Pagination from "@/app/components/Pagination";
import { getCategories, getPosts, getPostsByPage } from "@/app/lib/api";
import { openGraphImage } from "@/app/share-metadata";
import { TagIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
    number: string;
  };
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const category: Category = await getCategories({ slug });

  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      title: category.title,
      description: category.description,
      ...openGraphImage,
    },
  };
}

export async function generateStaticParams() {
  const categories: Category[] = await getCategories();

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

async function Category({ params }: Props) {
  const { slug, number } = params;

  const category: Category = await getCategories({ slug });
  const postsByCategory: Post[] = await getPosts({ category: category._id });
  const postsPerPage: Post[] = await getPostsByPage(parseInt(number, 10), 2, {
    category: category._id,
  });

  if (!category) return notFound();

  return (
    <article>
      <div className="text-center my-4">
        <EditCategoryButton category={category} />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 py-10 gap-4 lg:gap-10 tracking-wide lg:tracking-widest lg:leading-7">
        <div className="flex justify-center items-center gap-x-3 md:gap-x-6 min-w-[288px]">
          <TagIcon className="w-12 h-12 md:w-16 md:h-16 text-primary" />

          <div className="md:space-y-1">
            <h2 className="text-lg md:text-3xl text-black font-bold whitespace-nowrap">
              {category.title}
            </h2>

            <div className="flex items-center gap-x-2">
              <div className="w-2 h-2 text-black bg-primary rounded-full"></div>
              <h3 className="text-gray-600">
                {postsByCategory.length} Articles
              </h3>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-center lg:text-left">
          {category.description}
        </p>
      </div>

      <BlogList posts={postsPerPage} />

      <Pagination
        itemsLength={postsByCategory.length}
        numberPerPage={2}
        destination={`/category/${category.slug}/page/`}
      />
    </article>
  );
}

export default Category;
