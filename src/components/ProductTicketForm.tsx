/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { sendProductTicket } from "@/actions/sendProductTicketAction";
import { getProductTickets } from "@/actions/getProductTicketsAction";

export default function ProductTicketForm({
  productId,
}: {
  productId: number;
}) {
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 📦 گرفتن لیست تیکت‌ها هنگام لود
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      const res = await getProductTickets(productId);
      if (res.success) setTickets(res.tickets);
      else setError(res.message);
      setLoading(false);
    };
    fetchTickets();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    const res = await sendProductTicket(productId, message);
    setSending(false);

    if (res.success) {
      setMessage("");
      const updated = await getProductTickets(productId);
      if (updated.success) setTickets(updated.tickets);
    } else {
      setError(res.message);
    }
  };

  if (loading) return <p className="mt-6 text-gray-500">در حال بارگذاری...</p>;

  if (!tickets)
    return (
      <p className="text-red-500 mt-6">{error || "خطا در بارگیری تیکت‌ها"}</p>
    );

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold">پشتیبانی دوره 🎫</h3>

      {/* لیست پیام‌ها */}
      {tickets.messages && tickets.messages.length > 0 ? (
        <div className="border rounded-lg p-4 bg-gray-50 max-h-80 overflow-y-auto">
          {tickets.messages.map((msg: any, idx: number) => (
            <div
              key={idx}
              className={`p-3 my-2 rounded-xl ${
                msg.support
                  ? "bg-blue-100 text-blue-900 text-right"
                  : "bg-gray-200 text-gray-800 text-left"
              }`}
            >
              <p>{msg.message}</p>
              <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">هیچ پیامی ثبت نشده است.</p>
      )}

      {/* فرم ارسال پیام */}
      {tickets.can_send ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            className="w-full border rounded-lg p-2"
            rows={3}
            placeholder="پیام خود را بنویسید..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            disabled={sending || !message.trim()}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {sending ? "در حال ارسال..." : "ارسال پیام"}
          </button>
        </form>
      ) : (
        <p className="text-gray-400 text-sm">
          پشتیبانی این محصول به پایان رسیده است ❌
        </p>
      )}
    </div>
  );
}
