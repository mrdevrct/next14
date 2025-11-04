/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://yoursite.com";

interface ApiFetchOptions extends RequestInit {
  params?: Record<string, any>;
  revalidate?: number | false;
}

export async function apiFetchServer<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { params, revalidate = false, ...fetchOptions } = options;

  const queryString = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const nextConfig: { next?: { revalidate?: number; cache?: "no-store" } } = {};

  if (typeof revalidate === "number") {
    nextConfig.next = { revalidate };
  } else if (revalidate === false) {
    nextConfig.next = { cache: "no-store" };
  }

  console.log(`${API_URL}${path}${queryString}`);
  
  const res = await fetch(`${API_URL}${path}${queryString}`, {
    ...fetchOptions,
    headers,
    ...nextConfig,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText || res.statusText}`);
  }

  return res.json() as Promise<T>;
}