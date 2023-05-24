import AsideContent from "@/app/components/AsideContent";
import { getData } from "@/app/lib/getApi";

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 px-4 pt-6 pb-12 md:px-6 md:pt-12 md:pb-24 max-w-7xl mx-auto">
      <div className="col-span-2">{children}</div>

      <AsideContent posts={posts} categories={categories} />
    </div>
  );
}
