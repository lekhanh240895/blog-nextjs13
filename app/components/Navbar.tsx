import { getPopularPosts } from "../lib/api";
import BasicMenu from "./BasicMenu";
import ClientSiteRoute from "./ClientSiteRoute";

async function Navbar() {
  const posts: Post[] = await getPopularPosts();

  const categories: Category[] = Array.from(
    new Set(posts.map((post) => post.category.title))
  ).map(
    (title) => posts.find((post) => post.category.title === title)!.category
  );

  return (
    <nav className="items-center justify-center gap-x-4 hidden md:flex text-xl pt-4">
      <ClientSiteRoute route="/" className="px-1 md:px-2 hover:text-primary">
        Trang chủ
      </ClientSiteRoute>

      <ClientSiteRoute
        route="/products"
        className="px-1 md:px-2 hover:text-primary"
      >
        Sản phẩm
      </ClientSiteRoute>

      {posts.length > 0 && (
        <BasicMenu items={posts.slice(0, 4)} rotateIconDown>
          <span className="group-hover:text-primary transition-all">
            Thịnh hành
          </span>
        </BasicMenu>
      )}

      {categories.length > 0 && (
        <BasicMenu items={categories} rotateIconDown itemPreHref="category">
          <span className="group-hover:text-primary transition-all">
            Danh mục
          </span>
        </BasicMenu>
      )}

      <ClientSiteRoute
        route="/contact"
        className="px-1 md:px-2 hover:text-primary"
      >
        Liên lạc
      </ClientSiteRoute>
    </nav>
  );
}

export default Navbar;
