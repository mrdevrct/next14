// app/(main)/products/[slug]/components/ProductClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/features/cart/actions";
import { useCart } from "@/features/cart/context/CartContext";
import { Product } from "@/features/products/types/product.types";

interface ProductClientProps {
  product: Product;
  isLoggedIn: boolean;
  isInCart: boolean;
}

export default function ProductClient({
  product,
  isLoggedIn,
  isInCart: initialIsInCart,
}: ProductClientProps) {
  const router = useRouter();
  const { refreshCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(initialIsInCart);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/products/${product.slug}`);
      return;
    }

    setLoading(true);
    try {
      const result = await addToCart(product.id);

      if (result.success) {
        setIsInCart(true);
        await refreshCount();
        showToast("محصول به سبد خرید اضافه شد ✅", "success");
        router.refresh();
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
    // Toast implementation
    const toast = document.createElement("div");
    toast.className = `fixed right-4 top-4 z-50 bg-white border rounded-xl shadow-xl px-4 py-3 flex items-center gap-2 animate-slide-in ${
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* تصویر محصول */}
        {product.image && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* اطلاعات محصول */}
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* قیمت */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary-main">
              {(product.price)}
            </span>
            {product.regular_price && product.regular_price > product.price && (
              <span className="text-xl text-gray-400 line-through">
                {(product.regular_price)}
              </span>
            )}
          </div>

          {/* دکمه‌ها */}
          <div className="flex flex-col sm:flex-row gap-3">
            {isInCart ? (
              <>
                <Link
                  href="/cart"
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <span>مشاهده سبد خرید</span>
                  <span>🛒</span>
                </Link>
                <div className="flex-1 bg-green-100 text-green-700 py-3 px-6 rounded-xl font-bold text-center flex items-center justify-center gap-2">
                  <span>در سبد خرید</span>
                  <span>✓</span>
                </div>
              </>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="w-full bg-primary-main text-white py-3 px-6 rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            )}
          </div>

          {!isLoggedIn && (
            <p className="text-sm text-gray-500 text-center">
              برای خرید این محصول باید{" "}
              <Link
                href={`/login?redirect=/products/${product.slug}`}
                className="text-primary-main font-bold hover:underline"
              >
                وارد حساب کاربری
              </Link>{" "}
              خود شوید
            </p>
          )}
        </div>
      </div>
    </div>
  );
}