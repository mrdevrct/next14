/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { API_ENDPOINTS } from "@/config/api";
import { apiFetchServer } from "@/lib/apiServer";
import { cookies } from "next/headers";

export async function sendOtpAction(formData: FormData) {
  const mobile = formData.get("mobile") as string;

  if (!mobile) {
    return { success: false, message: "شماره موبایل الزامی است" };
  }

  try {
    const res = await apiFetchServer<{ success: boolean }>(
      API_ENDPOINTS.auth.requestOtp,
      {
        method: "POST",
        body: JSON.stringify({ mobile }),
      }
    );

    if (res.success) {
      return { success: true, message: "کد تأیید ارسال شد", mobile };
    } else {
      return { success: false, message: "ارسال کد تأیید ناموفق بود" };
    }
  } catch (err: any) {
    console.error("OTP request error:", err);
    return { success: false, message: err.message || "خطا در ارسال کد" };
  }
}

export async function verifyOtpAction(formData: FormData) {
  const mobile = formData.get("mobile") as string;
  const otp = formData.get("otp") as string;

  if (!mobile || !otp) {
    return { success: false, message: "شماره یا کد وارد نشده است" };
  }

  try {
    const res = await apiFetchServer<{
      success: boolean;
      token?: string;
      user?: { wp_data: any };
    }>(API_ENDPOINTS.auth.verifyOtp, {
      method: "POST",
      body: JSON.stringify({ mobile, otp }),
    });

    if (!res.success || !res.token) {
      return { success: false, message: "کد تأیید نامعتبر است" };
    }

    const cookieStore = await cookies();
    console.log(res.token);
    


    cookieStore.set("token", res.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    cookieStore.set("isLoggedIn", "true", {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
    });

    if (res.user?.wp_data) {
      cookieStore.set("user", JSON.stringify(res.user.wp_data), {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
      });
    }

    return { success: true, message: "ورود موفقیت‌آمیز بود" };
  } catch (err: any) {
    console.error("OTP verify error:", err);
    return { success: false, message: err.message || "خطا در تأیید کد" };
  }
}
