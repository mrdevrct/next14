/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { API_ENDPOINTS, API_URL } from "@/lib/api/endpoints";
import { cookies } from "next/headers";

export async function getProductTickets(productId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      message: "برای مشاهده تیکت‌ها باید وارد حساب کاربری شوید.",
      tickets: null,
    };
  }

  try {
    const res = await fetch(
      `${API_URL}${API_ENDPOINTS.product.ticket}?product_id=${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.error || "خطا در دریافت تیکت‌ها",
        tickets: null,
      };
    }

    return {
      success: true,
      message: "تیکت‌ها با موفقیت دریافت شدند.",
      tickets: data,
    };
  } catch (err: any) {
    console.error("Ticket fetch error:", err);
    return {
      success: false,
      message: "خطا در ارتباط با سرور",
      tickets: null,
    };
  }
}
