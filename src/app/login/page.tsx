"use client";

import { sendOtp, verifyOtp } from "@/features/auth/actions";
import { useState } from "react";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await sendOtp(mobile);

    setLoading(false);
    setMessage(res.message);
    if (res.success) setStep("otp");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await verifyOtp(mobile, otp);

    setLoading(false);
    setMessage(res.message);
    if (res.success) {
      window.location.href = "/"; // ✅ ریدایرکت بعد از ورود موفق
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-bold text-center mb-4">
        ورود به حساب کاربری
      </h1>

      {step === "mobile" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              شماره موبایل
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="مثلاً 09123456789"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "در حال ارسال..." : "ارسال کد تأیید"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">کد تأیید</label>
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
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "تأیید و ورود"}
          </button>
        </form>
      )}

      {message && (
        <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
