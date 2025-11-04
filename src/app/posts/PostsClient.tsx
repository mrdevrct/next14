"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetchClient } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/config/api";

interface PostsClientProps {
  initialPosts: any[];
  totalPages: number;
  currentPage: number;
  initialSearch: string;
}

export default function PostsClient({
  initialPosts,
  totalPages,
  currentPage,
  initialSearch,
}: PostsClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);

  // 🔁 همگام‌سازی داده‌ها با URL
  useEffect(() => {
    const page = searchParams.get("page") || "1";
    const q = searchParams.get("search") || "";

    startTransition(() => {
      apiFetchClient<{
        posts: any[];
        total: number;
        total_pages: number;
      }>(API_ENDPOINTS.posts.all, {
        params: {
          page: Number(page),
          per_page: 6,
          ...(q && { search: q }),
        },
      }).then((data) => {
        setPosts(data.posts);
      });
    });
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", "1");
    router.push(`/posts?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    if (!search) params.delete("search");
    router.push(`/posts?${params.toString()}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">مقالات</h1>

      {/* 🔍 فرم جستجو */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی مقاله..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          جستجو
        </button>
      </form>

      {/* ⏳ لودینگ حین تغییر */}
      {isPending && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* 📰 لیست مقالات */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.ID} className="border p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
              <a
                href={`/posts/${post.ID}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </a>
            </h2>
            <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
            <div className="mt-3 text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString("fa-IR")}
            </div>
          </article>
        ))}
      </div>

      {/* 📄 صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              disabled={p === currentPage}
              className={`px-4 py-2 rounded ${
                p === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
