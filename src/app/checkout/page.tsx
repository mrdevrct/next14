// app/checkout/page.tsx
import { isUserLoggedIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm"; // فرم مرحله بعد

export default async function CheckoutPage() {
  const loggedIn = await isUserLoggedIn();

  if (!loggedIn) {
    // ✅ اگر کاربر لاگین نبود، بفرستش به لاگین با redirect
    redirect("/login?redirect=/checkout");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4">تکمیل خرید</h1>
      <CheckoutForm />
    </div>
  );
}
