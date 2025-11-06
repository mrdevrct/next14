/* eslint-disable @typescript-eslint/no-explicit-any */
// features/auth/actions/sendOtp.ts
"use server";

import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiFetchServer } from "@/lib/api/server";

export async function sendOtp(mobile: string) {
  try {
    await apiFetchServer(API_ENDPOINTS.auth.requestOtp, {
      method: "POST",
      body: JSON.stringify({ mobile }),
    });
    return { success: true, message: "کد ارسال شد" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
