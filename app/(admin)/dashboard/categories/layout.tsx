import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
