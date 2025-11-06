/* eslint-disable @typescript-eslint/no-explicit-any */
// features/products/actions/checkProductInCart.ts
"use server";

import { getCart } from "@/features/cart/actions";
import { getServerAuth } from "@/lib/auth";

export async function checkProductInCart(
  productId: number
): Promise<boolean> {
  try {
    const { isLoggedIn } = await getServerAuth();

    if (!isLoggedIn) {
      return false;
    }

    const cartResult = await getCart();

    if (!cartResult.success || !cartResult.data) {
      return false;
    }

    return cartResult.data.cart_items?.some(
      (item: any) => item.product_id === productId
    ) || false;
  } catch (error) {
    console.error("❌ Error checking product in cart:", error);
    return false;
  }
}