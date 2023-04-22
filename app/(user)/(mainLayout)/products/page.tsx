import AddCartButton from "@/app/components/AddCartButton";
import ClientSiteRoute from "@/app/components/ClientSiteRoute";
import { getProducts } from "@/app/lib/api";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: "Products",
  };
}
export const revalidate = 60;

async function Products() {
  const products: Product[] = await getProducts();

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 grid-flow-dense">
        {products.map((product) => (
          <li key={product._id}>
            <div className="rounded-md border border-gray-200 shadow-lg p-4 flex flex-col justify-between gap-4 h-full">
              <ClientSiteRoute route={"/product/" + product.slug}>
                <div className="relative w-full min-h-[320px] h-full">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
              </ClientSiteRoute>

              <div className="flex flex-nowrap overflow-hidden gap-1">
                {product.images.map((img) => (
                  <div key={img} className="relative w-10 h-10">
                    <Image
                      src={img}
                      alt={product.title + "Images"}
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-between gap-2">
                <div className="">
                  <h2 className="font-bold">{product.title}</h2>
                  <p>{product.price} VND</p>
                </div>

                <AddCartButton productId={product._id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
