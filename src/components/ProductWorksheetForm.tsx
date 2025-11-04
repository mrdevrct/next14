/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent } from "react";
import { submitWorksheetAnswers } from "@/actions/submitWorksheetAnswersAction";

export default function ProductWorksheetForm({
  worksheetId,
  questions,
}: {
  worksheetId: number;
  questions: any[];
}) {
  const [answers, setAnswers] = useState<any[]>([]); // آرایه‌ای از پاسخ‌ها
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCheckboxChange = (questionId: number, value: boolean) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswer) {
        existingAnswer.answer = value;
      } else {
        prevAnswers.push({
          question_id: questionId,
          type: "checkbox",
          answer: value,
        });
      }
      return [...prevAnswers];
    });
  };

  const handleNumberChange = (questionId: number, value: string) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswer) {
        existingAnswer.answer = value;
      } else {
        prevAnswers.push({
          question_id: questionId,
          type: "number",
          answer: value,
        });
      }
      return [...prevAnswers];
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    const res = await submitWorksheetAnswers(worksheetId, answers);
    setSending(false);
    setMessage(res.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">پاسخ به تمرین</h3>

      {questions.map((question) => (
        <div key={question.id} className="space-y-2">
          <p>{question.text}</p>
          {question.type === "checkbox" && (
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  handleCheckboxChange(question.id, e.target.checked)
                }
              />
              پاسخ
            </label>
          )}
          {question.type === "number" && (
            <input
              type="number"
              onChange={(e) => handleNumberChange(question.id, e.target.value)}
              className="border p-2 rounded-lg"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={sending}
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {sending ? "در حال ارسال..." : "ارسال پاسخ‌ها"}
      </button>

      {message && <p className="text-gray-500 mt-2">{message}</p>}
    </form>
  );
}
