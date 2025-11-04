import { apiFetchServer } from "@/lib/apiServer";
import { API_ENDPOINTS } from "@/config/api";
import PostsClient from "./PostsClient";

// ⏳ کش سمت سرور برای کل صفحه
export const revalidate = 3600;

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  // ✅ گرفتن داده از API سمت سرور با cache و params
  const data = await apiFetchServer<{
    posts: any[];
    total: number;
    total_pages: number;
  }>(API_ENDPOINTS.posts.all, {
    params: {
      page,
      per_page: 6,
      ...(search && { search }),
    },
    revalidate: 3600, // کش ۱ ساعته
  });

  return (
    <PostsClient
      initialPosts={data.posts}
      totalPages={data.total_pages}
      currentPage={page}
      initialSearch={search}
    />
  );
}
