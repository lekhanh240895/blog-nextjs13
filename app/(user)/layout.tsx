import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: {
    default: "Blog - Reviews - News | KhanhReview",
    template: "%s | KhanhReview",
  },
  description:
    "Trang cập nhật sản phẩm hot và đáng mua trong các lĩnh vực công nghệ, thời trang, thể thao và kinh doanh v.v. Theo dõi để không bỏ lỡ thông tin!",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white min-h-screen">
      <Sidebar />
      <Header />

      <main>
        <div className="px-4 pt-6 pb-12 md:px-10 md:pt-12 md:pb-24 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
