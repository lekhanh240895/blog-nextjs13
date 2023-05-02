import BlogList from "@/app/components/BlogList";
import { getCategories, getCategoryBySlug, getPosts } from "@/app/lib/getApi";
import { TagIcon } from "@heroicons/react/24/outline";

interface Props {
  params: {
    slug: string;
  };
}

async function Category({ params }: Props) {
  const { slug } = params;

  const posts: Post[] = await getPosts();
  const postsByCategory = posts.filter((post) => post.category.slug === slug);
  const category: Category = await getCategoryBySlug(slug);

  if (!category) return;

  return (
    <div className="tracking-wide md:tracking-widest md:leading-7">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between px-4 py-10 gap-4 md:gap-48 md:px-32 md:py-14 max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-x-4 md:gap-x-6">
          <TagIcon className="w-10 h-10 md:w-16 md:h-16 text-primary" />

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

        <p className="text-gray-600 text-center md:text-left">
          {category.description}
        </p>
      </div>

      <BlogList posts={postsByCategory} />
    </div>
  );
}

export default Category;
