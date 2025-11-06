export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://yoursite.com";

export const API_ENDPOINTS = {
  auth: {
    requestOtp: "/wp-json/custom/v1/otp/request",
    verifyOtp: "/wp-json/custom/v1/otp/verify",
    me: "/wp-json/custom/v1/me",
  },
  cart: {
    get: "/wp-json/custom/v1/cart",
    add: "/wp-json/custom/v1/cart/add",
    remove: "/wp-json/custom/v1/cart/remove",
  },
  posts: {
    all: "/wp-json/custom/v1/posts",
    single: (id: number) => `/wp-json/custom/v1/post/${id}`,
    review: (id: number) => `/wp-json/custom/v1/post/${id}/review`,
  },
  product: {
    all: "/wp-json/custom/v1/products",
    single: (slug: string) => `/wp-json/custom/v1/product/${slug}`,
    review: (id: number) => `/wp-json/custom/v1/product/${id}/review`,
    sections: "/wp-json/custom/v1/product-sections",
    worksheets: "/wp-json/custom/v1/product-worksheets",
    ticket: "/wp-json/custom/v1/product-ticket",
  },
  checkout: {
    submit: "/wp-json/custom/v1/checkout/submit",
    info: "/wp-json/custom/v1/checkout/info",
  },
};
