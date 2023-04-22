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
  return (
    <div className="px-4 pt-6 pb-12 md:px-6 md:pt-12 md:pb-24 max-w-7xl mx-auto">
      {children}
    </div>
  );
}
