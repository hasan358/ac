import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';


export default function AddFoundation() {
  const navigate = useNavigate();
  const [filePath, setFilePath] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFilePath(e.target.files[0].name);
    }
  };

  const handleAdd = () => {
    // Тут можно отправить файл на сервер или сохранить путь
    alert(`File selected: ${filePath}`);
    navigate("/create/interface"); // Пример: переход к следующему этапу
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      <h1 className="text-black text-4xl font-bold mb-4">Add Interface</h1>
      <p className="text-gray-600 max-w-xl text-center mb-10">
        This means that the user will add a file with the code from a personal computer.
        <br />
        <span className="font-medium">Please note:</span> your file will be checked when you try to use it or when you try to publish it.
      </p>

      <div className="w-full max-w-2xl border border-blue-400 rounded-lg shadow-md p-6 mb-10">
        <label className="block text-left font-medium mb-2">Location:</label>
        <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2">
            <FolderIcon className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700">{filePath || "Choose file..."}</span>
          </label>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <Link
        to={`/create/interface`}
        className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
      >
        Back
      </Link>
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}