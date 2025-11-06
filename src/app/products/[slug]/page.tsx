/* eslint-disable react-hooks/error-boundaries */
// app/(main)/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getServerAuth } from "@/lib/auth";
import {
  getProduct,
  checkProductPurchase,
  checkProductInCart,
} from "@/features/products/actions";
import ProductPurchasedView from "@/components/ProductPurchasedView";
import ProductClient from "@/components/ProductClient";

export const revalidate = 3600;

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  try {
    // ✅ Parallel fetching برای بهبود performance
    const [product, auth, purchaseStatus] = await Promise.all([
      getProduct(slug),
      getServerAuth(),
      checkProductPurchase(slug),
    ]);

    if (!product) {
      notFound();
    }

    // اگر خریداری شده، نمایش محتوای دوره
    if (purchaseStatus.has_purchased) {
      return (
        <ProductPurchasedView
          product={product}
          user={auth.user}
        />
      );
    }

    // اگر خریداری نشده، چک کنیم در سبد خرید هست یا نه
    const isInCart = auth.isLoggedIn
      ? await checkProductInCart(product.id)
      : false;

    return (
      <ProductClient
        product={product}
        isLoggedIn={auth.isLoggedIn}
        isInCart={isInCart}
      />
    );
  } catch (error) {
    console.error("❌ Error in ProductPage:", error);
    notFound();
  }
}

// ✅ Generate Metadata
export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const product = await getProduct(params.slug);
    
    return {
      title: product.name,
      description: product.description,
    };
  } catch {
    return {
      title: "محصول یافت نشد",
    };
  }
}