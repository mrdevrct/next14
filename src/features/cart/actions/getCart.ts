/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiFetchServer } from "@/lib/api/server";
import type { CartData } from "@/types/cart";

export async function getCart(): Promise<{ success: true; data: CartData } | { success: false; message: string }> {
  try {
    const res = await apiFetchServer(API_ENDPOINTS.cart.get, {
      method: "GET",
    });

    return { success: true, data: res as CartData };
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    return { success: false, message: error.message || "خطا در دریافت سبد خرید" };
  }
}
