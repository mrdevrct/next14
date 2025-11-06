/* eslint-disable @typescript-eslint/no-explicit-any */
// features/auth/actions/logout.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    revalidatePath("/", "layout");
    return { success: true, message: "خروج موفق" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}