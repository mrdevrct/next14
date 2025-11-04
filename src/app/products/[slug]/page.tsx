/* eslint-disable react-hooks/error-boundaries */
import { apiFetchServer } from "@/lib/apiServer";
import { API_ENDPOINTS } from "@/config/api";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ProductTicketForm from "@/components/ProductTicketForm";
import ProductSections from "@/components/ProductSections";
import ProductWorksheets from "@/components/ProductWorksheets";
import ProductWorksheetForm from "@/components/ProductWorksheetForm";

export const revalidate = 3600;

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const productPromise = apiFetchServer<{
      id: number;
      title: string;
      description: string;
      price: number;
      has_purchased?: boolean;
    }>(API_ENDPOINTS.product.single(slug), { revalidate: 3600 });

    const userProductPromise = token
      ? apiFetchServer<{ has_purchased: boolean }>(
          API_ENDPOINTS.product.single(slug),
          { cache: "no-store" }
        ).catch(() => ({ has_purchased: false }))
      : Promise.resolve({ has_purchased: false });

    const [product, userData] = await Promise.all([
      productPromise,
      userProductPromise,
    ]);

    if (!product) notFound();
    product.has_purchased = userData.has_purchased;

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-semibold">{product.price} تومان</p>

        {product.has_purchased ? (
          <>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
              مشاهده دوره 🎓
            </button>
            <ProductTicketForm productId={product.id} />
            <ProductSections productId={product.id} />
            <ProductWorksheets productId={product.id} />
          </>
        ) : (
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
            خرید دوره 💳
          </button>
        )}
      </div>
    );
  } catch (err) {
    console.error("Error fetching product:", err);
    notFound();
  }
}
