// app/cart/page.tsx
import CartClient from "@/components/CartClient";
import { getCart } from "@/features/cart/actions";
import { CartData } from "@/types/cart";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cartResult = await getCart();

  let initialCart: CartData | null = null;

  if (cartResult.success && cartResult.data) {
    initialCart = cartResult.data;
  }

  return <CartClient initialCart={initialCart} />;
}
