import { addProduct, removeProduct } from "@/app/features/appSlice";
import { fetchProducts } from "@/app/features/productSlice";
import { appSelector, productSelector } from "@/app/redux/selector";
import { AppDispatch } from "@/app/redux/store";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

function CartTable() {
  const { cartProductIds } = useSelector(appSelector);
  const { products } = useSelector(productSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const cartProducts =
    products.filter((p) => cartProductIds.includes(p._id)) || [];

  const total = useMemo<number>(() => {
    return cartProductIds.reduce((total, productId) => {
      const productQuantity = products.filter(
        (p) => p._id === productId
      ).length;
      const productPrice =
        products.find((p) => p._id === productId)?.price || 0;
      return total + productQuantity * productPrice;
    }, 0);
  }, [cartProductIds, products]);

  return (
    <>
      {cartProductIds.length > 0 && (
        <div className="overflow-x-auto">
          <table className="basic table-auto">
            <thead>
              <tr className="hover:!bg-gray-200">
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price (VND)</th>
              </tr>
            </thead>

            <tbody>
              {cartProducts.map((product) => {
                const productQuantity = cartProductIds.filter(
                  (id) => id === product._id
                ).length;
                return (
                  <tr key={product._id} className="hover:!bg-gray-200">
                    <td className="min-w-[160px]">{product?.title}</td>

                    <td>
                      <div className="flex gap-3 items-center justify-center min-w-[160px]">
                        <button
                          type="button"
                          className="btn py-1 text-gray-700"
                          onClick={() => dispatch(removeProduct(product._id))}
                        >
                          -
                        </button>
                        {productQuantity}
                        <button
                          type="button"
                          className="btn py-1 text-gray-700"
                          onClick={() => dispatch(addProduct(product._id))}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      {(product?.price * productQuantity).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td className="border-none pointer-events-none"></td>
                <td className="border-none pointer-events-none"></td>
                <td className="hover:!bg-gray-200">
                  <div className="flex gap-2">
                    Total:
                    <span className="flex-1 text-center font-bold">
                      {total.toLocaleString()}
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
}

export default CartTable;
