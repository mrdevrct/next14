/* eslint-disable @typescript-eslint/no-explicit-any */
// features/auth/actions/verifyOtp.ts
"use server";

import { apiFetchServer } from "@/lib/api/server";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function verifyOtp(mobile: string, otp: string) {
  try {
    const res = await apiFetchServer<{ token: string }>(
      API_ENDPOINTS.auth.verifyOtp,
      {
        method: "POST",
        body: JSON.stringify({ mobile, otp }),
      }
    );

    const cookieStore = await cookies();
    cookieStore.set("token", res.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    revalidatePath("/", "layout");
    return { success: true, message: "ورود موفق" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}