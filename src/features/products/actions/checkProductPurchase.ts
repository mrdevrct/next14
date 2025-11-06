// features/products/actions/checkProductPurchase.ts
"use server";

import { apiFetchServer } from "@/lib/api/server";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { getServerAuth } from "@/lib/auth";

export async function checkProductPurchase(
  slug: string
): Promise<{ has_purchased: boolean }> {
  try {
    const { isLoggedIn } = await getServerAuth();

    if (!isLoggedIn) {
      return { has_purchased: false };
    }

    const result = await apiFetchServer<{ has_purchased: boolean }>(
      API_ENDPOINTS.product.single(slug),
      { cache: "no-store" }
    );

    return { has_purchased: result.has_purchased || false };
  } catch (error) {
    console.error("❌ Error checking purchase:", error);
    return { has_purchased: false };
  }
}