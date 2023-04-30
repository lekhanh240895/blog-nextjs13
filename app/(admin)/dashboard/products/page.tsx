import ClientSiteRoute from "@/app/components/ClientSiteRoute";
import ProductsTable from "@/app/components/admin/ProductsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

function Products() {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl uppercase mb-4">Products</h2>

        <ClientSiteRoute route="/dashboard/products/create">
          <span className="btn btn-primary inline-block mb-4">
            Create new product
          </span>
        </ClientSiteRoute>
      </div>

      <ProductsTable />
    </section>
  );
}

export default Products;
