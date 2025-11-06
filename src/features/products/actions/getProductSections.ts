/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { API_ENDPOINTS, API_URL } from "@/lib/api/endpoints";
import { cookies } from "next/headers";

export async function getProductSections(productId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(
      `${API_URL}${API_ENDPOINTS.product.sections}?product_id=${productId}`,
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
      console.error("Sections fetch error:", data);
      return {
        success: false,
        message: data?.error || "خطا در دریافت سکشن‌ها",
        sections: null,
      };
    }

    return {
      success: true,
      message: "سکشن‌ها با موفقیت دریافت شدند.",
      sections: data,
    };
  } catch (err: any) {
    console.error("Sections error:", err);
    return {
      success: false,
      message: "خطا در ارتباط با سرور",
      sections: null,
    };
  }
}
