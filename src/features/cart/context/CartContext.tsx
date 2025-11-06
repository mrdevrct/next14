"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../actions";

type CartContextType = {
  count: number;
  refreshCount: () => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  count: 0,
  refreshCount: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const refreshCount = async () => {
    try {
      const result = await getCart();

      if (result.success && result.data) {
        setCount(result.data.cart_contents_count || 0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await refreshCount();
    };
    fetchData();
  }, []);

  return (
    <CartContext.Provider value={{ count, refreshCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
