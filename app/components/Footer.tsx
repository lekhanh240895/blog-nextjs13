import Image from "next/image";
import { ClockIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import ClientSiteRoute from "./ClientSiteRoute";

type Props = {
  posts: Post[];
  categories: Category[];
};
function Footer({ posts, categories }: Props) {
  return (
    <footer className="max-w-7xl mx-auto px-4 pt-6 pb-12 md:px-6 md:pt-12 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <section>
          <div className="flex items-baseline mb-6">
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

        <section>
          <div className="flex items-baseline mb-6">
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
              Home
            </ClientSiteRoute>

            <ClientSiteRoute
              route="/products"
              className="px-1 md:px-2 hover:text-primary py-5"
            >
              Products
            </ClientSiteRoute>

            <ClientSiteRoute
              route="/contact"
              className="px-1 md:px-2 hover:text-primary py-5"
            >
              Contact
            </ClientSiteRoute>
          </nav>
        </section>

        <section className="">
          <div className="flex items-baseline mb-4">
            <h1 className="text-2xl">Gallery</h1>
            <span className="w-[5px] h-[5px] rounded-full bg-primary ml-2"></span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="relative  w-auto min-h-[128px] h-auto">
              <Image
                src="/logo.png"
                alt="Advetising Image"
                fill
                sizes="100%"
                className="object-cover object-center"
              />
            </div>
            <div className="relative  w-auto min-h-[128px] h-auto">
              <Image
                src="/logo.png"
                alt="Advetising Image"
                fill
                sizes="100%"
                className="object-cover object-center"
              />
            </div>
            <div className="relative  w-auto min-h-[128px] h-auto">
              <Image
                src="/logo.png"
                alt="Advetising Image"
                fill
                sizes="100%"
                className="object-cover object-center"
              />
            </div>
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
