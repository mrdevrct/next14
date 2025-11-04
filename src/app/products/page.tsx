/* eslint-disable @typescript-eslint/no-explicit-any */
// server component
import { API_ENDPOINTS } from "@/config/api";
import { ProductListClient } from "./ProductListClient";
import { apiFetchServer } from "@/lib/apiServer";

export default async function ProductsPage() {
  const products = await apiFetchServer<{ products: any[] }>(
    API_ENDPOINTS.product.all,
    {
      revalidate: 3600,
      params: { per_page: 12 , page: 1},
    }
  );

  return <ProductListClient products={products.products} />;
}
