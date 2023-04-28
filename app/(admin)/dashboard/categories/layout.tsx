import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
