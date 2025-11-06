/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useCart } from "@/features/cart/context/CartContext";
import { CartData } from "@/types/cart";
import { removeFromCart } from "@/features/cart/actions";

interface CartClientProps {
  initialCart: CartData | null;
}

export default function CartClient({ initialCart }: CartClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticCart, setOptimisticCart] = useState(initialCart);
  const { refreshCount } = useCart();

  const handleRemove = async (cartItemKey: string) => {
    // Optimistic update
    setOptimisticCart((prev: CartData | null) => {
      if (!prev) return prev;
      return {
        ...prev,
        cart_items: prev.cart_items.filter(
          (item: any) => item.cart_item_key !== cartItemKey
        ),
      };
    });

    // Server action
    const result = await removeFromCart(cartItemKey);

    if (result.success) {
      // Refresh از سرور
      startTransition(() => {
        router.refresh();
      });

      // 👇 بعد از موفقیت، تعداد آیتم‌ها را آپدیت کن
      await refreshCount();
    } else {
      // اگر خطا داشت، state رو برگردون
      setOptimisticCart(initialCart);
    }
  };

  const cart = optimisticCart || initialCart;
  const items = cart?.cart_items || [];

  return (
    <div className="container py-8">
      {items.length === 0 ? (
        <p></p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item: any) => (
              <CartItem
                key={item.cart_item_key}
                item={item}
                onRemove={handleRemove}
                isPending={isPending}
              />
            ))}
          </div>
          <CartSummary cart={cart} isPending={isPending} />
        </div>
      )}
    </div>
  );
}
