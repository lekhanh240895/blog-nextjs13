import EditProductBody from "@/app/components/admin/EditProductBody";
import { getProducts } from "@/app/lib/api";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const product = await getProducts({ _id: id });

  if (!product) return {};

  return {
    title: product.title,
  };
}

export async function generateStaticParams() {
  const products: Product[] = await getProducts();

  return products.map((product) => ({
    id: product._id,
  }));
}

async function EditPost() {
  return <EditProductBody />;
}

export default EditPost;
