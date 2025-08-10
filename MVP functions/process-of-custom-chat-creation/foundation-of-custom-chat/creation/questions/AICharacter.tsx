import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CharacterQuestions() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(Array(6).fill(""));

  const questions = [
    "Who is this character (name, age, origin, occupation)?",
    "In what setting does it exist (fiction, historical era, real world, etc.)?",
    "What is his character and style of speech??",
    "What topics does she/he know/understand? What is unknown to her/him?",
    "Is there a goal, motivation, or role that she/he should fulfill?",
    "How should he/she react to personal or provocative questions?",
  ];

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleCreate = () => {
    console.log("Entertainment AI Config:", answers);
    // Навигация на следующий шаг (позже можно заменить на реальный маршрут)
    navigate("/create/interface");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-black text-4xl font-bold mb-2">Questions for AI Character</h1>
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
