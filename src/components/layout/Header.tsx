"use client";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useCart } from "@/features/cart/context/CartContext";
import React from "react";

function Header() {
  const { count } = useCart();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center border-b border-2">
        <span>Cart :</span>
        <p>{count}</p>
      </div>

      <div className="flex items-center">
        <span>User :</span>
        <span>{user?.user_login}</span>
      </div>
    </div>
  );
}

export default Header;
