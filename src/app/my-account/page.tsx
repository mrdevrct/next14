// app/(main)/my-account/page.tsx

import { requireAuth } from "@/lib/auth";

export default async function MyAccountPage() {
  // اگر لاگین نبود، redirect میشه به /login
  const user = await requireAuth("/my-account");

  return (
    <div>
      <h1>حساب کاربری</h1>
      <p>خوش آمدید {user.display_name}</p>
      <p>ایمیل: {user.user_email}</p>
    </div>
  );
}