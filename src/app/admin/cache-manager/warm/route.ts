// app/admin/cache-manager/warm/route.ts
import { NextResponse } from "next/server";
import { apiRouteFetch } from "@/lib/apiRouteFetch";
import { API_ENDPOINTS } from "@/config/api";
import { cookies } from "next/headers";

const endpointsToWarm = [
  // عمومی — بدون token
  API_ENDPOINTS.product.all,
  API_ENDPOINTS.posts.all,
  "/wp-json/custom/v1/product-sections",
  "/wp-json/custom/v1/product-worksheets",
  // خصوصی — با token
  API_ENDPOINTS.auth.me, // تست token
];

// app/admin/cache-manager/warm/route.ts (نسخه ساده)
export async function POST() {
  try {
    await Promise.all([
      apiRouteFetch<any>(API_ENDPOINTS.product.all, undefined, { 
        revalidate: 3600, 
        auth: false 
      }),
      apiRouteFetch<any>(API_ENDPOINTS.posts.all, undefined, { 
        revalidate: 3600, 
        auth: false 
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "کش عمومی ساخته شد.",
    });
  } catch (err: any) {
    console.error("Cache warm error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}