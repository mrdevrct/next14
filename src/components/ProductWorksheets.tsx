/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { getProductWorksheets } from "@/actions/getProductWorksheetsAction";
import { submitWorksheetAnswers } from "@/actions/submitWorksheetAnswersAction"; // اکشن ارسال پاسخ‌ها

export default function ProductWorksheets({
  productId,
}: {
  productId: number;
}) {
  const [worksheets, setWorksheets] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<any[]>([]); // آرایه‌ای برای ذخیره پاسخ‌ها
  const [submissions, setSubmissions] = useState<any[]>([]); // ذخیره پاسخ‌های قبلی
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchWorksheets = async () => {
      setLoading(true);
      const res = await getProductWorksheets(productId);
      if (res.success) {
        setWorksheets(res.worksheets);
        setSubmissions(res.worksheets.submissions || []); // ذخیره کردن submissions
      } else {
        setError(res.message);
      }
      setLoading(false);
    };
    fetchWorksheets();
  }, [productId]);

  // تغییرات پاسخ در فیلدهای مختلف
  const handleAnswerChange = (questionId: number, value: any, type: string) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswer) {
        existingAnswer.answer = value;
      } else {
        prevAnswers.push({
          question_id: questionId,
          type: type,
          answer: value,
        });
      }
      return [...prevAnswers];
    });
  };

  // ارسال پاسخ‌ها به سرور
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const res = await submitWorksheetAnswers(worksheets.product_id, answers);
    setSending(false);
    if (res.success) {
      setAnswers([]); // پاک کردن پاسخ‌ها بعد از ارسال موفق
      alert("پاسخ‌ها با موفقیت ارسال شدند!");
    } else {
      alert(res.message || "خطا در ارسال پاسخ‌ها");
    }
  };

  if (loading)
    return <p className="mt-4 text-gray-500">در حال بارگذاری تمرین‌ها...</p>;

  if (!worksheets)
    return (
      <p className="text-red-500 mt-4">{error || "خطا در بارگیری تمرین‌ها"}</p>
    );

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">تمرین‌های دوره 📝</h3>

      {worksheets.worksheets && worksheets.worksheets.length > 0 ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {worksheets.worksheets.map((worksheet: any, i: number) => (
            <div key={i} className="border p-4 rounded-lg space-y-2">
              <h4 className="font-medium">{worksheet.title}</h4>

              {worksheet.questions.map((question: any, idx: number) => {
                const existingAnswer = submissions.find((submission) =>
                  submission.answers.find(
                    (answer: any) => answer.question_id === question.id
                  )
                );

                const previousAnswer = existingAnswer
                  ? existingAnswer.answers.find(
                      (answer: any) => answer.question_id === question.id
                    )?.answer
                  : null;

                return (
                  <div key={idx} className="space-y-2">
                    <p className="text-sm">{question.text}</p>
                    {question.type === "checkbox" && (
                      <div className="space-x-4">
                        <label>
                          <input
                            type="checkbox"
                            checked={previousAnswer ? previousAnswer : false}
                            onChange={(e) =>
                              handleAnswerChange(
                                question.id,
                                e.target.checked,
                                "checkbox"
                              )
                            }
                          />
                          گزینه 1
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={previousAnswer ? previousAnswer : false}
                            onChange={(e) =>
                              handleAnswerChange(
                                question.id,
                                e.target.checked,
                                "checkbox"
                              )
                            }
                          />
                          گزینه 2
                        </label>
                      </div>
                    )}
                    {question.type === "number" && (
                      <input
                        type="number"
                        value={previousAnswer || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            question.id,
                            e.target.value,
                            "number"
                          )
                        }
                        className="border p-2 rounded-lg w-full"
                      />
                    )}
                    {/* می‌توانید انواع سوالات دیگر را نیز نمایش دهید */}
                  </div>
                );
              })}
            </div>
          ))}

          <button
            type="submit"
            disabled={sending}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {sending ? "در حال ارسال..." : "ارسال پاسخ‌ها"}
          </button>
        </form>
      ) : (
        <p className="text-gray-500">هیچ تمرینی برای این دوره ثبت نشده است.</p>
      )}
    </div>
  );
}
