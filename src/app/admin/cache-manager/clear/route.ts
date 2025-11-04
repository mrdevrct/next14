/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/cache-manager/clear/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    // پاک کردن کش تمام مسیرها
    revalidatePath("/", "layout");
    revalidatePath("/products");
    revalidatePath("/posts");
    // یا: revalidatePath("/") برای همه

    return NextResponse.json({
      success: true,
      message: "کش سایت با موفقیت پاک شد.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "خطا: " + err.message },
      { status: 500 }
    );
  }
}