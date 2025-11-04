/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { API_ENDPOINTS } from "@/config/api";
import { apiFetchServer } from "@/lib/apiServer";
import { cookies } from "next/headers";

export async function sendProductTicket(
  productId: number,
  message: string
): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, message: "برای ارسال تیکت باید وارد حساب شوید." };
  }

  console.log(API_ENDPOINTS.product.ticket);
  
  try {
    await apiFetchServer(API_ENDPOINTS.product.ticket, {
      method: "POST",
      body: JSON.stringify({
        product_id: productId,
        ticket_message: message,
      }),
      cache: "no-store",
    });

    return { success: true, message: "تیکت با موفقیت ارسال شد ✅" };
  } catch (err: any) {
    console.error("Ticket error:", err);
    return { success: false, message: "خطا در ارسال تیکت" };
  }
}
