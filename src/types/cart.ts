/* eslint-disable @typescript-eslint/no-explicit-any */
// types/cart.ts
export interface CartItem {
  cart_item_key: string;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    [key: string]: any;
  };
  quantity: number;
  total_price: number;
}

export interface CartData {
  cart_contents_count: number;
  subtotal_price: number;
  total_price: number;
  discount_total?: number;
  cart_items: CartItem[];
  [key: string]: any;
}
