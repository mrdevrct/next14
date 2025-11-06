/* eslint-disable @typescript-eslint/no-explicit-any */
// components/cart/CartItem.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  item: any;
  onRemove: (cartItemKey: string) => void;
  isPending: boolean;
}

export default function CartItem({ item, onRemove, isPending }: CartItemProps) {
  const { cart_item_key, name, image, quantity, total } = item;

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        {image && (
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">
            Quantity: <span className="font-medium">{quantity}</span>
          </p>
          <p className="text-sm font-medium">${total}</p>
        </div>
      </div>

      <Button
        variant="destructive"
        size="icon"
        onClick={() => onRemove(cart_item_key)}
        disabled={isPending}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
