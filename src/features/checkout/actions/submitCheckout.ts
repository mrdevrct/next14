/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCart } from "@/features/cart/actions";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiFetchServer } from "@/lib/api/server";
import { redirect } from "next/navigation";
import { isUserLoggedIn } from "@/lib/auth";

type CartResponse = any;
type CheckoutSubmitRequest = any;
type CheckoutSubmitResponse = any;

interface MinimalCheckoutPayload {
  firstName: string;
  lastName: string;
}

export async function submitCheckout(payload: MinimalCheckoutPayload) {
  const loggedIn = await isUserLoggedIn();
  if (!loggedIn) {
    return {
      success: false,
      message: "برای ادامه خرید لطفاً وارد حساب شوید.",
    } as const;
  }

  let res: CheckoutSubmitResponse | null = null;

  try {
    const cartResult = await getCart();
    const cart: CartResponse | null =
      cartResult.success && cartResult.data
        ? (cartResult.data as CartResponse)
        : null;

    const products = cart?.cart_items ?? [];
    const totalPrice = cart ? Number(cart.cart_total || 0) : 0;

    const body: CheckoutSubmitRequest = {
      billing_first_name: payload.firstName,
      billing_last_name: payload.lastName,
      billing_email: "",
      billing_phone: "",
      billing_state: "",
      billing_address_1: "",
      billing_city: "",
      billing_postcode: "",

      shipping_first_name: payload.firstName,
      shipping_last_name: payload.lastName,
      shipping_address_1: "",
      shipping_city: "",
      shipping_postcode: "",

      order_note: "",
      payment_method: "online",
      products,
      total_price: totalPrice,
      discount: "",
      shipping_method: "post",
      company: "",
    };

    res = await apiFetchServer<CheckoutSubmitResponse>(
      API_ENDPOINTS.checkout.submit,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    console.log("✅ Checkout response:", res);
  } catch (error: any) {
    console.error("❌ Checkout submit error:", error);
    return {
      success: false,
      message: error?.message || "خطا در ثبت سفارش",
    } as const;
  }

  if (res?.payment_url) {
    redirect(res.payment_url);
  }

  return {
    success: true,
    data: res,
  } as const;
}
