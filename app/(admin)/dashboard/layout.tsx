import Header from "@/app/components/admin/Header";
import Sidebar from "@/app/components/admin/Sidebar";
import DeleteCategory from "@/app/modal/DeleteCategory";
import DeletePost from "@/app/modal/DeletePost";
import DeleteProduct from "@/app/modal/DeleteProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Admin | KhanhReview",
    template: "%s | Admin | KhanhReview",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DeletePost />
      <DeleteCategory />
      <DeleteProduct />

      <div className="bg-blue-900 min-h-screen grid grid-cols-1 md:grid-cols-4 pt-14 md:pt-0">
        <Header />

        <Sidebar />

        <main className="bg-gray-200 md:text-black md:bg-white md:m-4 md:ml-0 md:col-span-3 md:rounded-md p-4">
          {children}
        </main>
      </div>
    </>
  );
}
