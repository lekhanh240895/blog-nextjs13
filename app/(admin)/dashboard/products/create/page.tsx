import BackButton from "@/app/components/admin/BackButton";
import ProductForm from "@/app/components/admin/ProductForm";

export const metadata = {
  title: "Create product",
};

export default function CreateProduct() {
  return (
    <section>
      <BackButton />

      <h2 className="text-3xl mb-4">Create new product</h2>

      <ProductForm />
    </section>
  );
}
