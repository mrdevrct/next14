// lib/auth/requireAuth.ts
import { redirect } from "next/navigation";
import { getServerAuth } from "./getServerAuth";

export async function requireAuth(redirectTo?: string) {
  const { isLoggedIn, user } = await getServerAuth();

  if (!isLoggedIn || !user) {
    const loginUrl = redirectTo
      ? `/login?redirect=${encodeURIComponent(redirectTo)}`
      : "/login";

    redirect(loginUrl);
  }

  return user;
}
