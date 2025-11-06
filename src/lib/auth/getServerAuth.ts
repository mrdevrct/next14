// lib/auth/getServerAuth.ts
import { cookies } from "next/headers";
import { apiFetchServer } from "@/lib/api/server";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { User } from "@/types/user.types";

export interface ServerAuthResult {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}

export async function getServerAuth(): Promise<ServerAuthResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        isLoggedIn: false,
        user: null,
        token: null,
      };
    }

    const response = await apiFetchServer<{
      success: boolean;
      user?: User;
    }>(API_ENDPOINTS.auth.me, {
      cache: "no-store",
    });

    if (response.success && response.user) {
      return {
        isLoggedIn: true,
        user: response.user,
        token,
      };
    }

    cookieStore.delete("token");

    return {
      isLoggedIn: false,
      user: null,
      token: null,
    };
  } catch (error) {
    console.error("❌ Server Auth Error:", error);

    try {
      const cookieStore = await cookies();
      cookieStore.delete("token");
    } catch {}

    return {
      isLoggedIn: false,
      user: null,
      token: null,
    };
  }
}
