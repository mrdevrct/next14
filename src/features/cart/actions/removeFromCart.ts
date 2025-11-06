/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiFetchServer } from "@/lib/api/server";

export async function removeFromCart(cartItemKey: string) {
  try {
    const res = await apiFetchServer(API_ENDPOINTS.cart.remove, {
      method: "POST",
      body: JSON.stringify({ cart_item_key: cartItemKey }),
    });
    return { success: true, data: res };
  } catch (error: any) {
    console.error("Error removing item from cart:", error);
    return { success: false, message: error.message || "خطا در حذف آیتم از سبد خرید" };
  }
}

