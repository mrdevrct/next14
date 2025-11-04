import Image from "next/image";
import Link from "next/link";

// ✅ اجرای سمت سرور با کش اولیه و revalidate
async function getProducts() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/products?per_page=10`;

  try {
    const res = await fetch(apiUrl, {
      cache: "force-cache",
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }

    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}

export const revalidate = 600;

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-8">
          محصولات
        </h1>

        <div className="flex flex-col gap-4 w-full">
          {products.length === 0 ? (
            <p className="text-zinc-500">هیچ محصولی یافت نشد.</p>
          ) : (
            products.map((p: any) => (
              <Link
                href={`/products/${p.slug}`} // 👈 لینک به صفحه پیش‌رندر شده
                key={p.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition block"
              >
                <h2 className="text-lg font-medium text-black dark:text-zinc-50">
                  {p.name || "بدون عنوان"}
                </h2>
                {p.price && (
                  <p className="text-zinc-600 dark:text-zinc-400">
                    قیمت: {p.price} تومان
                  </p>
                )}
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
