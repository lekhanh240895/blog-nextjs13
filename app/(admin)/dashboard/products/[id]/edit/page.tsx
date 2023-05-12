import BackButton from "@/app/components/admin/BackButton";
import ProductForm from "@/app/components/admin/ProductForm";
import { getData } from "@/app/lib/getApi";

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

async function EditPost({ params }: Props) {
  const { id } = params;

  const editedProduct: Product = await getData("products", { _id: id });

  return (
    <section>
      <BackButton />

      <h2 className="text-3xl mb-4 md:mr-24">
        Edit product - {editedProduct?.title}
      </h2>

      <ProductForm editedProduct={editedProduct} />
    </section>
  );
}

export default EditPost;
