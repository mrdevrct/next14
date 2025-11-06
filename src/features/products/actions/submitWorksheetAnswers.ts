/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { API_ENDPOINTS, API_URL } from "@/lib/api/endpoints";
import { cookies } from "next/headers";

export async function submitWorksheetAnswers(
  worksheetId: number,
  answers: any[]
): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      message: "برای ارسال پاسخ‌ها باید وارد حساب شوید.",
    };
  }

  try {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.product.worksheets}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: 13944, // محصول شما
        worksheet_id: worksheetId,
        date: new Date().toISOString(), // تاریخ ارسال
        answers: answers, // پاسخ‌های کاربر
      }),
      cache: "no-store", // از کش استفاده نکن
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.error || "خطا در ارسال پاسخ‌ها.",
      };
    }

    return { success: true, message: "پاسخ‌ها با موفقیت ثبت شدند." };
  } catch (err: any) {
    console.error("Error submitting worksheet answers:", err);
    return { success: false, message: "خطا در ارتباط با سرور" };
  }
}
