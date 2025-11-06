// app/products/[slug]/ProductClient.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/features/cart/context/CartContext";
import { useRouter } from "next/navigation";
import { addToCart } from "@/features/cart/actions";
import Link from "next/link";

interface ProductClientProps {
  productId: number;
  isInCart: boolean;
}

export default function ProductClient({ productId, isInCart: initialIsInCart }: ProductClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(initialIsInCart);
  const { refreshCount } = useCart();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const result = await addToCart(productId);
      
      if (result.success) {
        setIsInCart(true);
        await refreshCount(); // آپدیت count در header
        showToast("محصول به سبد خرید اضافه شد ✅", "success");
        router.refresh(); // refresh کردن صفحه برای sync
      } else {
        showToast(result.message || "خطا در افزودن به سبد ❌", "error");
      }
    } catch (error) {
      showToast("خطا در افزودن به سبد خرید", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    const toast = document.createElement("div");
    toast.className = `fixed right-4 top-4 z-50 bg-white border rounded-xl shadow-xl px-4 py-3 flex items-center gap-2 ${
      type === "success"
        ? "border-green-200 text-green-700"
        : "border-red-200 text-red-700"
    }`;
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  if (isInCart) {
    return (
      <div className="flex gap-3">
        <Link
          href="/cart"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <span>مشاهده سبد خرید</span>
          <span>🛒</span>
        </Link>
        <span className="bg-green-100 text-green-700 py-2 px-4 rounded-lg flex items-center gap-2">
          <span>در سبد خرید</span>
          <span>✓</span>
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {loading ? (
        <>
          <span className="animate-spin">⏳</span>
          <span>در حال افزودن...</span>
        </>
      ) : (
        <>
          <span>افزودن به سبد خرید</span>
          <span>💳</span>
        </>
      )}
    </button>
  );
}