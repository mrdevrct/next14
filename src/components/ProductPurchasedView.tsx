// app/(main)/products/[slug]/components/ProductPurchasedView.tsx
import { Product } from "@/features/products/types/product.types";
import { User } from "@/types/user.types";
import ProductTicketForm from "./ProductTicketForm";
import ProductSections from "./ProductSections";
import ProductWorksheets from "./ProductWorksheets";

interface ProductPurchasedViewProps {
  product: Product;
  user: User | null;
}

export default function ProductPurchasedView({
  product,
  user,
}: ProductPurchasedViewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🎓</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="text-sm text-gray-600">
              خوش آمدید {user?.display_name}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* دکمه مشاهده دوره */}
      <button className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-3 shadow-lg">
        <span>شروع یادگیری</span>
        <span>▶️</span>
      </button>

      {/* محتوای دوره */}
      <div className="space-y-6">
        <ProductSections productId={product.id} />
        <ProductWorksheets productId={product.id} />
        <ProductTicketForm productId={product.id} />
      </div>
    </div>
  );
}