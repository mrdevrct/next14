/* eslint-disable @typescript-eslint/no-explicit-any */
// features/products/actions/getProduct.ts
"use server";

import { apiFetchServer } from "@/lib/api/server";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Product } from "@/features/products/types/product.types";

export async function getProduct(slug: string): Promise<Product> {
  try {
    const product = await apiFetchServer<Product>(
      API_ENDPOINTS.product.single(slug),
      { revalidate: 3600 }
    );

    if (!product) {
      throw new Error("محصول یافت نشد");
    }

    return product;
  } catch (error: any) {
    console.error("❌ Error fetching product:", error);
    throw error;
  }
}