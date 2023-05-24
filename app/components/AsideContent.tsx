import Image from "next/image";
import { ClockIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

type Props = {
  posts: Post[];
  categories: Category[];
};
function AsideContent({ posts, categories }: Props) {
  return (
    <aside className="hidden md:block lg:ml-6 divide-y divide-gray-200">
      <section className="pb-10">
        <div className="flex items-baseline mb-4">
          <h1 className="text-2xl">Recent Posts</h1>
          <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
        </div>

        <div>
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col lg:flex-row gap-4 mb-4"
            >
              <div className="w-full lg:w-24 h-24 relative flex-shrink-0">
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  sizes="100%"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex flex-col justify-between gap-2">
                <h2>{post.title}</h2>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-600">
                    {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="flex items-baseline mb-4">
          <h1 className="text-2xl">Popular Posts</h1>
          <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
        </div>

        <div>
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col lg:flex-row gap-4 mb-4"
            >
              <div className="w-full lg:w-24 h-24 relative flex-shrink-0">
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  sizes="100%"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex flex-col justify-between gap-2">
                <h2>{post.title}</h2>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-600">
                    {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="flex items-baseline mb-4">
          <h1 className="text-2xl">Tag Cloud</h1>
          <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => {
            const bgColors = [
              "bg-blue-500",
              "bg-red-500",
              "bg-green-500",
              "bg-yellow-500",
              "bg-purple-500",
              "bg-pink-500",
              "bg-indigo-500",
              "bg-gray-500",
              "bg-orange-500",
              "bg-teal-500",
            ];
            const background =
              index < bgColors.length
                ? bgColors[index]
                : bgColors[Math.floor(Math.random() * bgColors.length)];

            return (
              <div
                key={category._id}
                className={`px-3 py-1 text-white text-sm ${background}`}
              >
                {category.title}
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-10">
        <div className="flex items-baseline mb-4">
          <h1 className="text-2xl">Advertising</h1>
          <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
        </div>

        <div className="grid place-items-center">
          <div className="relative w-full max-w-[240px] h-96">
            <Image
              src="https://estudiopatagon.com/themes/wordpress/veenv2/wp-content/uploads/2020/02/banner-sidebar.jpg"
              alt="Advetising Image"
              fill
              sizes="100%"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
    </aside>
  );
}

export default AsideContent;
