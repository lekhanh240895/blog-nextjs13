import Sidebar from "@/app/components/admin/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | KhanhReview",
    template: "%s | KhanhReview",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="bg-blue-900 min-h-screen grid grid-cols-4">
        <Sidebar />

        <div className="bg-white m-4 ml-0 col-span-3 rounded-md p-4">
          {children}
        </div>
      </div>
    </main>
  );
}
