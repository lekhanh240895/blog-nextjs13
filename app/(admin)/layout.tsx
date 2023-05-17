import DeleteCategory from "@/app/modal/DeleteCategory";
import DeletePost from "@/app/modal/DeletePost";
import DeleteProduct from "../modal/DeleteProduct";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DeletePost />
      <DeleteCategory />
      <DeleteProduct />

      {children}
    </div>
  );
}
