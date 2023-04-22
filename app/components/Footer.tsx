import Image from "next/image";
import { BookOpenIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import ClientSiteRoute from "./ClientSiteRoute";
import { getCategories, getPopularPosts, getProducts } from "../lib/api";
import { vi } from "date-fns/locale";
import Link from "next/link";

async function Footer() {
  const posts: Post[] = await getPopularPosts();
  const categories: Category[] = await getCategories();
  const products: Product[] = await getProducts();

  return (
    <footer className="max-w-7xl mx-auto px-4 pt-6 pb-12 md:px-6 md:pt-12 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <section>
          <div className="flex items-baseline mb-6">
            <h1 className="text-2xl">Thịnh Hành</h1>
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
                  <div className="w-full lg:w-24 min-h-[96px] relative flex-shrink-0 self-stretch">
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

        <section>
          <div className="flex items-baseline mb-6">
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

        <section>
          <div className="flex items-baseline mb-6">
            <h1 className="text-2xl">Menu</h1>
            <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
          </div>

          <nav className="flex flex-col divide-y divide-gray-200">
            <ClientSiteRoute
              route="/"
              className="px-1 md:px-2 hover:text-primary pb-5"
            >
              Trang chủ
            </ClientSiteRoute>

            <ClientSiteRoute
              route="/products"
              className="px-1 md:px-2 hover:text-primary py-5"
            >
              Sản phẩm
            </ClientSiteRoute>

            <ClientSiteRoute
              route="/contact"
              className="px-1 md:px-2 hover:text-primary py-5"
            >
              Liên lạc
            </ClientSiteRoute>
          </nav>
        </section>

        <section className="">
          <div className="flex items-baseline mb-4">
            <h1 className="text-2xl">Thư Viện Ảnh</h1>
            <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {products.map((product) => (
              <Link
                href={`/product/${product.slug}`}
                className="relative w-auto min-h-[128px] h-auto"
                key={product._id}
              >
                <Image
                  src={product.images[0]}
                  alt="Advetising Image"
                  fill
                  sizes="100%"
                  className="object-cover object-center"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="py-10 grid place-items-center">
        <h1 className="flex text-3xl sm:text-4xl md:text-5xl lg:text-7xl gap-x-1 md:gap-x-2 items-baseline">
          KhanhReview
          <span className="w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-primary" />
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
