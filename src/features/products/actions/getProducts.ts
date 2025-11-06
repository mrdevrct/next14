/* eslint-disable @typescript-eslint/no-explicit-any */
// features/products/actions/getProducts.ts
"use server";

import { apiFetchServer } from "@/lib/api/server";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import {
  ProductListResponse,
  ProductQueryParams,
} from "../types/product.types";

export async function getProducts(
  params: ProductQueryParams = { page: 1, per_page: 12 }
): Promise<ProductListResponse> {
  try {
    const data = await apiFetchServer<ProductListResponse>(
      API_ENDPOINTS.product.all,
      {
        revalidate: 3600,
        params,
      }
    );

    if (!data || !data.products) {
      throw new Error("لیست محصولات یافت نشد");
    }

    return data;
  } catch (error: any) {
    console.error("❌ Error fetching products:", error);
    throw error;
  }
}
