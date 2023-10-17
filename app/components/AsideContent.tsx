import Image from "next/image";
import { BookOpenIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import ClientSiteRoute from "./ClientSiteRoute";
import { getCategories, getPopularPosts, getPosts } from "../lib/api";
import { vi } from "date-fns/locale";

async function AsideContent() {
  const posts: Post[] = await getPosts();
  const categories: Category[] = await getCategories();
  const popularPosts: Post[] = await getPopularPosts();

  return (
    <aside className="hidden md:block lg:ml-6 divide-y divide-gray-200">
      <section className="pb-10">
        <div className="flex items-baseline mb-4">
          <h1 className="text-2xl">Gần Đây</h1>
          <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
        </div>

        <div>
          {posts.length > 0 &&
            posts.slice(0, 4).map((post) => (
              <ClientSiteRoute
                route={`/${post.slug}`}
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

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-600">
                        {format(new Date(post.createdAt), "dd-MM-yyyy", {
                          locale: vi,
                        })}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <BookOpenIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-600">
                          {post.readTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <EyeIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-600">
                          {post.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ClientSiteRoute>
            ))}
        </div>
      </section>

      <section className="py-10">
        <div className="flex items-baseline mb-4">
          <h1 className="text-2xl">Thịnh Hành</h1>
          <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
        </div>

        <div>
          {popularPosts.length > 0 &&
            popularPosts.slice(0, 4).map((post) => (
              <ClientSiteRoute
                route={`/${post.slug}`}
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

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-600">
                        {format(new Date(post.createdAt), "dd-MM-yyyy", {
                          locale: vi,
                        })}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <BookOpenIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-600">
                          {post.readTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <EyeIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-600">
                          {post.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ClientSiteRoute>
            ))}
        </div>
      </section>

      <section className="py-10">
        <div className="flex items-baseline mb-4">
          <h1 className="text-2xl">Danh Mục</h1>
          <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => {
            const bgColors = [
              "bg-blue-500 hover:bg-blue-400",
              "bg-red-500 hover:bg-red-400",
              "bg-green-500 hover:bg-green-400",
              "bg-yellow-500 hover:bg-yellow-400",
              "bg-purple-500 hover:bg-purple-400",
              "bg-pink-500 hover:bg-pink-400",
              "bg-indigo-500 hover:bg-indigo-400",
              "bg-gray-500 hover:bg-gray-400",
              "bg-orange-500 hover:bg-orange-400",
              "bg-teal-500 hover:bg-teal-400",
            ];

            const focusBgColors = [
              "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
              "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
              "focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
              "focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
              "focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2",
              "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
              "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
              "focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
              "focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2",
            ];

            const background =
              index < bgColors.length
                ? bgColors[index]
                : bgColors[Math.floor(Math.random() * bgColors.length)];

            const focusBg =
              index < focusBgColors.length
                ? focusBgColors[index]
                : focusBgColors[
                    Math.floor(Math.random() * focusBgColors.length)
                  ];

            return (
              <ClientSiteRoute
                route={`/category/${category.slug}`}
                key={category._id}
                className={`btn px-3 py-1 text-white text-sm ${background} ${focusBg}`}
              >
                {category.title}
              </ClientSiteRoute>
            );
          })}
        </div>
      </section>

      <section className="py-10">
        <div className="flex items-baseline mb-4">
          <h1 className="text-2xl">Quảng cáo</h1>
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
