/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { API_ENDPOINTS, API_URL } from "@/lib/api/endpoints";
import { cookies } from "next/headers";

export async function getProductWorksheets(productId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(
      `${API_URL}${API_ENDPOINTS.product.worksheets}?product_id=${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store", // چون وضعیت کاربر متفاوت است
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Worksheets fetch error:", data);
      return {
        success: false,
        message: data?.error || "خطا در دریافت تمرین‌ها",
        worksheets: null,
      };
    }

    return {
      success: true,
      message: "تمرین‌ها با موفقیت دریافت شدند.",
      worksheets: data,
    };
  } catch (err: any) {
    console.error("Worksheets error:", err);
    return {
      success: false,
      message: "خطا در ارتباط با سرور",
      worksheets: null,
    };
  }
}
