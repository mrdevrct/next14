import { apiFetchServer } from "@/lib/apiServer";
import { API_ENDPOINTS } from "@/config/api";
import { notFound } from "next/navigation";

// ⏳ کش برای یک ساعت
export const revalidate = 3600;

export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  try {
    // 📦 دریافت داده از API سمت سرور
    const post = await apiFetchServer<{
      id: number;
      title: string;
      content: string;
      excerpt?: string;
      date: string;
    }>(API_ENDPOINTS.posts.single(Number(id)), {
      revalidate: 3600,
    });

    if (!post) {
      notFound();
    }

    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {new Date(post.date).toLocaleDateString("fa-IR")}
        </p>

        {/* محتوای HTML مقاله */}
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    );
  } catch (error: any) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
