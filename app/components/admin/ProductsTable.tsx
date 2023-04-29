"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openDeleteProductModal } from "@/app/features/appSlice";
import { productSelector } from "@/app/redux/selector";
import { AppDispatch } from "@/app/redux/store";
import { useEffect } from "react";
import { fetchProducts } from "@/app/features/productSlice";

function ProductsTable() {
  const { products } = useSelector(productSelector);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleEdit = (product: Product) => {
    router.push("/dashboard/products/" + product._id + "/edit");
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <table className="basic table-auto">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.title}</td>

            <td className="align-middle space-y-1 space-x-1 text-center">
              <button className="btn" onClick={() => handleEdit(product)}>
                Edit
              </button>
              <button
                className="btn"
                onClick={() => dispatch(openDeleteProductModal(product))}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;
