import ClientSiteRoute from "@/app/components/ClientSiteRoute";
import ProductsTable from "@/app/components/admin/ProductsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

function Products() {
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <h2 className="text-3xl uppercase mb-4">Products</h2>

        <ClientSiteRoute
          route="/dashboard/products/create"
          className="btn btn-primary inline-block mb-4 text-center"
        >
          Create new product
        </ClientSiteRoute>
      </div>

      <ProductsTable />
    </section>
  );
}

export default Products;
