// lib/apiRouteFetch.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://yoursite.com";

interface ApiRouteFetchOptions extends RequestInit {
  params?: Record<string, any>;
  revalidate?: number | false;
  auth?: boolean; // آیا token بفرست یا نه
}

export async function apiRouteFetch<T>(
  path: string,
  token?: string,
  options: ApiRouteFetchOptions = {}
): Promise<T> {
  const { params, revalidate = false, auth = true, ...fetchOptions } = options;

  const queryString = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  // فقط اگر auth=true و token وجود داشته باشه، header بفرست
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const nextConfig: { next?: { revalidate?: number; cache?: "no-store" } } = {};
  if (typeof revalidate === "number") {
    nextConfig.next = { revalidate };
  } else if (revalidate === false) {
    nextConfig.next = { cache: "no-store" };
  }

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