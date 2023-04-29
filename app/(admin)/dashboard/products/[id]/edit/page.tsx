import BackButton from "@/app/components/BackButton";
import PostForm from "@/app/components/admin/PostForm";
import ProductForm from "@/app/components/admin/ProductForm";
import { getProducts } from "@/app/lib/getApi";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const product = await getProducts(id);

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

async function EditPost({ params }: Props) {
  const { id } = params;

  const editedProduct: Product = await getProducts(id);

  return (
    <main>
      <div className="flex items-start justify-between mb-4 gap-x-4">
        <h2 className="text-3xl">Edit product - {editedProduct?.title}</h2>

        <BackButton />
      </div>

      <ProductForm editedProduct={editedProduct} />
    </main>
  );
}

export default EditPost;
