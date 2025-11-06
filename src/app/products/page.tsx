/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProducts } from "@/features/products/actions/getProducts";
import { ProductListClient } from "./ProductListClient";

export default async function ProductsPage() {
  const { products } = await getProducts({ per_page: 12, page: 1 });

  return <ProductListClient products={products} />;
}
