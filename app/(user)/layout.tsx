import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { openGraphImage } from "../share-metadata";

export const metadata = {
  title: {
    default: "Blog - Reviews - News | KhanhReview",
    template: "%s | KhanhReview",
  },
  description:
    "Trang cập nhật sản phẩm hot và đáng mua trong các lĩnh vực công nghệ, thời trang, thể thao và kinh doanh v.v. Theo dõi để không bỏ lỡ thông tin!",
  openGraph: {
    title: "Blog - Reviews - News | KhanhReview",
    description:
      "Trang cập nhật sản phẩm hot và đáng mua trong các lĩnh vực công nghệ, thời trang, thể thao và kinh doanh v.v. Theo dõi để không bỏ lỡ thông tin!",
    ...openGraphImage,
  },
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white min-h-screen">
      <Sidebar />

      <Header />

      <main>{children}</main>

      {/* @ts-expect-error Async Server Component */}
      <Footer />
    </div>
  );
}
