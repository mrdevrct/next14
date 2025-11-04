"use server";

import { API_ENDPOINTS } from "@/config/api";
import { apiFetchServer } from "@/lib/apiServer";

export async function addToCart(productId: number) {
  try {
    const res = await apiFetchServer(API_ENDPOINTS.cart.add, {
      method: "POST",
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    });

    return { success: true, data: res };
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    return { success: false, message: error.message || "خطا در افزودن به سبد خرید" };
  }
}
