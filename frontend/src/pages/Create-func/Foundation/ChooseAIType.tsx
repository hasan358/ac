import { useNavigate } from "react-router-dom";

const aiTypes = [
  { label: "Entertainment AI", value: "entertainment" },
  { label: "Business AI", value: "business" },
  { label: "Training AI", value: "training" },
  { label: "Ai Assistant", value: "assistant" },
  { label: "Ai Character", value: "character" },
];

export default function ChooseAIType() {
  const navigate = useNavigate();

  const handleSelect = (type: string) => {
    navigate(`/create/foundation/${type}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      <h1 className="text-black text-4xl font-bold mb-10">Chose the Type of AI</h1>

      <div className="w-full max-w-xl border border-blue-500 rounded-lg">
        {aiTypes.map((ai, idx) => (
          <button
            key={ai.value}
            onClick={() => handleSelect(ai.value)}
            className={`w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-blue-50 transition ${
              idx < aiTypes.length - 1 ? "border-b border-blue-500" : ""
            }`}
          >
            <div className="w-4 h-4 bg-blue-600 rotate-45"></div>
            <span className="text-lg text-black">{ai.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate("/create/foundation")}
        className="mt-10 px-6 py-2 border border-blue-500 text-blue-600 rounded hover:bg-gray-100 transition"
      >
        Back
      </button>
    </div>
  );
}
