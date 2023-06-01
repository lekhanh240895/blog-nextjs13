import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollTopButton from "../components/ScrollTopButton";
import Sidebar from "../components/Sidebar";
import { getData } from "../lib/getApi";

export const metadata = {
  title: {
    default: "Blog - Reviews - News | KhanhReview",
    template: "%s | KhanhReview",
  },
  description:
    "Trang cập nhật sản phẩm hot và đáng mua trong các lĩnh vực công nghệ, thời trang, thể thao và kinh doanh v.v. Theo dõi để không bỏ lỡ thông tin!",
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts: Post[] = await getData("posts");
  const categories: Category[] = await getData("categories");

  return (
    <div className="relative bg-white min-h-screen">
      <Sidebar />

      <Header />

      <main>{children}</main>

      <Footer posts={posts} categories={categories} />
    </div>
  );
}
