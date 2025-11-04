"use client";

import { useState, useTransition } from "react";

export default function CacheManagerPage() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleWarmCache = async () => {
    setMessage("در حال کش کردن داده‌ها...");
    startTransition(async () => {
      const res = await fetch("/admin/cache-manager/warm", {
        method: "POST",
      });
      const data = await res.json();
      setMessage(data.message);
    });
  };

  const handleClearCache = async () => {
    setMessage("در حال حذف کش...");
    startTransition(async () => {
      const res = await fetch("/admin/cache-manager/clear", {
        method: "POST",
      });
      const data = await res.json();
      setMessage(data.message);
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-2xl shadow bg-white text-center space-y-6">
      <h1 className="text-xl font-bold">مدیریت کش سایت</h1>

      <button
        onClick={handleWarmCache}
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        ⚡️ ساخت کش برای همه داده‌ها
      </button>

      <button
        onClick={handleClearCache}
        disabled={isPending}
        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
      >
        🧹 حذف کامل کش
      </button>

      {message && <p className="text-gray-700 mt-4">{message}</p>}
    </div>
  );
}
