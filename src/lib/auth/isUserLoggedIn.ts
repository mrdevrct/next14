// lib/auth/isUserLoggedIn.ts
import { cookies } from "next/headers";

export async function isUserLoggedIn(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    return !!token;
  } catch (error) {
    console.error("❌ Error checking login status:", error);
    return false;
  }
}