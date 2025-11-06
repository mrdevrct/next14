/* eslint-disable @typescript-eslint/no-explicit-any */
// components/cart/CartSummary.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  cart: any;
  isPending: boolean;
}

export default function CartSummary({ cart, isPending }: CartSummaryProps) {
  const router = useRouter();
  const { cart_total, cart_subtotal } = cart || {};

  return (
    <div className="p-6 rounded-2xl border shadow-sm bg-white space-y-4">
      <h2 className="text-xl font-semibold">Order Summary</h2>
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${cart_subtotal?.toFixed(2) || "0.00"}</span>
      </div>
      <div className="border-t pt-3 flex justify-between font-semibold">
        <span>Total</span>
        <span>${cart_total?.toFixed(2) || "0.00"}</span>
      </div>
      <Button
        className="w-full mt-4"
        disabled={isPending || !cart?.cart_items?.length}
        onClick={() => router.push("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
