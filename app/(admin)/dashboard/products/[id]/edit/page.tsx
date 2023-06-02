import BackButton from "@/app/components/admin/BackButton";
import EditProductBody from "@/app/components/admin/EditProductBody";
import ProductForm from "@/app/components/admin/ProductForm";
import { getData } from "@/app/lib/getApi";
import { Suspense } from "react";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const product = await getData("products", { _id: id });

  if (!product) return {};

  return {
    title: product.title,
  };
}

export async function generateStaticParams() {
  const products: Product[] = await getData("products");

  return products.map((product) => ({
    id: product._id,
  }));
}

async function EditPost() {
  return <EditProductBody />;
}

export default EditPost;
