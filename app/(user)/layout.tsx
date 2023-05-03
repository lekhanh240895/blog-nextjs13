import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Blog - Lê Khánh - Reviews - News",
  description:
    "Trang cập nhật sản phẩm hot và đáng mua trong các lĩnh vực công nghệ, thời trang, thể thao và kinh doanh v.v. Theo dõi để không bỏ lỡ thông tin!",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white">
      <Sidebar />
      <Header />

      <main>{children}</main>
    </div>
  );
}
