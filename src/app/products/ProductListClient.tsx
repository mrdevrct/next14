/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";

export function ProductListClient({ products }: { products: any }) {
  return (
    <ul>
      {products.map((p: any) => (
        <li key={p.id}>
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  );
}
