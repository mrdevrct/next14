"use client";

import { submitCheckout } from "@/features/checkout/actions/submitCheckout";
import { useState } from "react";

export default function CheckoutForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await submitCheckout({ firstName, lastName });
    setLoading(false);

    if (res.success) {
      setMessage("در حال انتقال به درگاه پرداخت...");
    } else {
      setMessage(res.message || "خطا در تکمیل خرید");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">نام</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="مثلاً علی"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">نام خانوادگی</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="مثلاً رضایی"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "در حال ارسال..." : "ثبت سفارش و پرداخت"}
      </button>

      {message && (
        <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
      )}
    </form>
  );
}
