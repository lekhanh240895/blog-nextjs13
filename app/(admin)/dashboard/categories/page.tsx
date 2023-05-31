import CategoryBody from "@/app/components/admin/CategoryBody";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default function Categories() {
  return <CategoryBody />;
}
