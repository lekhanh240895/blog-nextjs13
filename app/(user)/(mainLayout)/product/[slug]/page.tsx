import ClientSiteRoute from "@/app/components/ClientSiteRoute";
import ProductImageSlider from "@/app/components/ProductImageSlider";
import { getProducts } from "@/app/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import "react-quill/dist/quill.snow.css";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const product: Product = await getProducts({ slug });

  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images,
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product: Product) => ({
    slug: product.slug,
  }));
}

export const revalidate = 60;

async function Product({ params }: Props) {
  const { slug } = params;
  const product: Product = await getProducts({ slug });

  if (!product) return notFound();

  return (
    <article className="product">
      <div className="text-center my-4">
        <ClientSiteRoute
          route={`/dashboard/products/${product._id}/edit`}
          className="btn btn-primary px-4 text-lg min-w-[244px]"
        >
          Edit this product
        </ClientSiteRoute>
      </div>

      <section className="relative min-h-[256px] ">
        <div className="absolute top-0 w-full h-full p-10 opacity-10 blur-sm">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="100%"
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative px-5 py-10 bg-[rgb(245,245,245,0.1)] w-full text-black">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold">{product.title}</h1>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <h2 className="italic">{product.description}</h2>

            <div className="flex items-center justify-end space-x-2 mt-auto">
              <ClientSiteRoute
                route={`/category/${product.category.slug}`}
                className="btn btn-primary text-white"
              >
                {product.category?.title}
              </ClientSiteRoute>

              {product.category?.parent && (
                <ClientSiteRoute
                  route={`/category/${product.category?.title.toLowerCase()}`}
                  className="btn btn-primary text-white"
                >
                  {product.category?.parent.title}
                </ClientSiteRoute>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        {product.images.length > 0 && <ProductImageSlider product={product} />}
      </section>
    </article>
  );
}

export default Product;
