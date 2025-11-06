/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/types/product.type.ts

// رابط برای تگ‌های محصول
export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// رابط برای تخفیف‌های tiered
export interface TieredDiscount {
  min: number;
  max: number;
  discount: number;
  price_after_discount: number;
}

// رابط برای نظرات کاربران
export interface Review {
  id: string;
  author: string;
  content: string;
  date: string;
  rating: number;
}

// رابط برای پارامترهای کوئری محصولات
export interface ProductQueryParams {
  per_page?: number;
  page?: number;
  category?: string | string[];
  type?: string | string[];
  tag?: string | string[];
  min_price?: number;
  max_price?: number;
  search?: string;
}

// رابط برای محصول
export interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  status: string;
  permalink: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock";
  stock_quantity: number | null;
  image: string;
  gallery_images: string[];
  categories: any[];
  tags: Tag[];
  attributes: any[];
  variations: any[];
  reviews: Review[];
  oneprice: number;
  last_category_hierarchy: any[];
  tiered_discounts: TieredDiscount[];
  has_purchased: boolean;
}

// رابط برای پاسخ لیست محصولات
export interface ProductListResponse {
  products: Product[];
  pagination?: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_products: number;
  };
}

// رابط برای درخواست ثبت نظر
export interface ProductReviewRequest {
  author_name: string;
  author_email: string;
  review: string;
  rating: number;
}

// رابط برای پاسخ ثبت نظر
export interface ProductReviewResponse {
  message: string;
  success: boolean;
}

