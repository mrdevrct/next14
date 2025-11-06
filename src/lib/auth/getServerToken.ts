// lib/auth/getServerToken.ts
import { cookies } from "next/headers";

export async function getServerToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value || null;
  } catch (error) {
    console.error("❌ Error getting token:", error);
    return null;
  }
}