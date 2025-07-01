import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function FinalStep() {
  const navigate = useNavigate();

  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    const data = {
      name,
      description,
      logo,
    };
    console.log("Chat created:", data);
    navigate("/chats");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-2 py-4">
      <h1 className="text-black text-5xl font-semibold mb-8">Final Stage</h1>
      <p className="text-gray-600 mb-10 text-center">
Here is the remaining information that needs to be filled in      </p>
      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full">
       <div className="flex items-center space-x-6 mb-8">
  <div className="flex flex-col items-center">
    <label className="relative flex items-center justify-center w-24 h-24 border border-gray-400 rounded-full cursor-pointer overflow-hidden bg-gray-100">
      {preview ? (
        <img src={preview} alt="Logo preview" className="w-full h-full object-cover" />
      ) : (
        <span className="text-4xl text-gray-500">+</span>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleLogoChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </label>
    <span className="mt-2 text-gray-600 text-sm">Logo:</span>
  </div>
  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="flex-1 px-4 py-2 border border-gray-400 rounded-full text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-400 rounded-2xl resize-none text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-center gap-6 mt-10">
          <Link
        to={`/create/interface`}
        className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
      >
        Back
      </Link>
          <button
            onClick={handleFinish}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
