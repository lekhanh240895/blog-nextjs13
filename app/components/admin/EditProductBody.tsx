"use client";

import BackButton from "@/app/components/admin/BackButton";
import ProductForm from "@/app/components/admin/ProductForm";
import { productSelector } from "@/app/redux/selector";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { useSelector } from "react-redux";

function EditProductBody() {
  const params = useParams();
  const { products } = useSelector(productSelector);
  const { id } = params;

  const editedProduct = products.find((product) => product._id === id);

  return (
    <section>
      <BackButton />

      <h2 className="text-3xl mb-4 md:mr-24">
        Edit product - {editedProduct?.title}
      </h2>

      <Suspense fallback={"loading..."}>
        <ProductForm editedProduct={editedProduct} />
      </Suspense>
    </section>
  );
}

export default EditProductBody;
