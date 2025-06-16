import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BusinessQuestions() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(Array(6).fill(""));

  const questions = [
    "In what field will this AI be used (finance, HR, medicine, etc.)?",
    "What tasks should he solve (data analysis, report generation, answering questions, etc.)?",
    "What should be the tone of communication (formal, neutral, polite, etc.)?",
    "What actions should he be able to perform (sending emails, calculating, searching for information)?",
    "What are the security or privacy restrictions?",
    "What systems or data should it interact with?",
  ];

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleCreate = () => {
    console.log("Entertainment AI Config:", answers);
    // Навигация на следующий шаг (позже можно заменить на реальный маршрут)
    navigate("/create/foundation/ai-type/entertainment/summary");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-black text-4xl font-bold mb-2">Questions for Business AI</h1>
        <p className="text-sm text-gray-600 mb-10">
          The user is given 6 questions about the AI that the user wants to create, depending on the type of AI that the user has selected. This is done in order to collect the necessary information
        </p>

        <form className="space-y-6">
          {questions.map((q, i) => (
            <div key={i}>
              <label className="block mb-2 text-black text-base">{q}</label>
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-full text-black border border-blue-500 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          ))}
        </form>

        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={() => navigate("/create/fast-mode/ai-type")}
            className="px-6 py-2 border border-blue-500 text-blue-600 rounded hover:bg-gray-100 transition"
          >
            Back
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
