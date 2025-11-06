/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Cookies from "js-cookie";
import { API_URL } from "./endpoints";

interface ApiFetchOptions extends RequestInit {
  params?: Record<string, any>;
  revalidate?: number | false;
}

export async function apiFetchClient<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  const queryString = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  const token = Cookies.get("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_URL}${path}${queryString}`, {
    ...fetchOptions,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText || res.statusText}`);
  }

  return res.json() as Promise<T>;
}
