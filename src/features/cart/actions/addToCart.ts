/* eslint-disable @typescript-eslint/no-explicit-any */
// features/cart/actions/addToCart.ts
"use server";

import { apiFetchServer } from "@/lib/api/server";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: number) {
  try {
    const res = await apiFetchServer(API_ENDPOINTS.cart.add, {
      method: "POST",
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    });
    
    revalidatePath("/cart");
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}