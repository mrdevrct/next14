"use client";

import { useState } from "react";
import { sendOtpAction, verifyOtpAction } from "@/actions/authActions";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("mobile", mobile);
    const res = await sendOtpAction(formData);
    setLoading(false);
    setMessage(res.message);
    if (res.success) setStep("otp");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("mobile", mobile);
    formData.append("otp", otp);
    const res = await verifyOtpAction(formData);
    setLoading(false);
    setMessage(res.message);
    if (res.success) {
      window.location.href = "/"; // ✅ بعد از ورود، ریدایرکت به صفحه اصلی
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-2xl shadow-lg bg-white">
      <h1 className="text-xl font-bold mb-4 text-center">ورود به حساب کاربری</h1>

      {step === "mobile" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">شماره موبایل</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="مثلاً 09123456789"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            {loading ? "در حال ارسال..." : "ارسال کد تأیید"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">کد تأیید</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="کد ۴ رقمی"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
          >
            {loading ? "در حال ورود..." : "تأیید و ورود"}
          </button>
        </form>
      )}

      {message && <p className="text-center text-sm mt-4 text-gray-600">{message}</p>}
    </div>
  );
}
