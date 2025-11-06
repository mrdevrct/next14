/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getProductSections } from "@/features/products/actions";
import { useEffect, useState } from "react";

export default function ProductSections({ productId }: { productId: number }) {
  const [sections, setSections] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      const res = await getProductSections(productId);
      if (res.success) setSections(res.sections);
      else setError(res.message);
      setLoading(false);
    };
    fetchSections();
  }, [productId]);

  if (loading)
    return <p className="mt-4 text-gray-500">در حال بارگذاری سکشن‌ها...</p>;

  if (!sections)
    return (
      <p className="text-red-500 mt-4">
        {error || "خطا در بارگیری سکشن‌های دوره"}
      </p>
    );

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">سرفصل‌های دوره 📚</h3>

      {sections.sections && sections.sections.length > 0 ? (
        <div className="space-y-3">
          {sections.sections.map((item: any, i: number) => (
            <div
              key={i}
              className="border p-3 rounded-lg flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-gray-500 text-sm mt-1">{item.content}</p>
              </div>

              {item.free ? (
                <span className="text-green-600 text-sm font-semibold">
                  🎁 رایگان
                </span>
              ) : (
                <span className="text-gray-400 text-sm font-semibold">
                  🔒 فقط برای خریداران
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">هنوز سکشنی برای این دوره ثبت نشده است.</p>
      )}
    </div>
  );
}
