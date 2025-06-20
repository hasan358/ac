import { Link, useParams } from "react-router-dom";
import { Home } from "lucide-react";
import AvatarOrSignIn from "../../components/AvatarOrSignIn";
import { useEffect, useState } from "react";

interface ChatSettingsPage {
  name: string;
  logo: string; // could be a URL or base64
  description: string;
  foundation: string;
  interfaceType: string;
  monetizationType: string;
}

export default function ChatSettingsPage() {
  const { chatId } = useParams();
  const isSignedIn = false;
  const [chat, setChat] = useState<ChatSettingsPage | null>(null);

  useEffect(() => {
    // Здесь ты можешь подключиться к backend и получить данные по chatId
    // Пока используется мок
    setChat({
      name: "Chat example",
      logo: "Ex",
      description: "tttttttttttttttttttttttttttttttttttttttt\ntttttttttttttttttttttttttttttttttttttttt\ntttttttttttttttttttttttttttttttttttttttt\ntttttttttttttttttttttttttttttttttttttttt",
      foundation: "ChatGPT",
      interfaceType: "Classic chat",
      monetizationType: "Paid chat",
    });
  }, [chatId]);

  if (!chat) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-end items-center p-4 border-b border-gray-900">
        <nav className="flex items-center gap-5">
          <AvatarOrSignIn isSignedIn={isSignedIn} />
          <Link
            to="/home"
            className="text-black p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Go to about page"
          >
            <Home size={20} className="text-black" />
          </Link>
        </nav>
      </div>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 pb-4 w-full">
          <img
            src="/ai-logo-placeholder.png"
            alt={chat.name}
            className="w-12 h-12 flex-shrink-0"
          />
          <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
            {chat.name}
          </h1>
          <div className="flex justify-end gap-4 flex-1">
            <Link
              to={`/chat/${chatId}`}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            >
              Test
            </Link>
          </div>
        </div>
        <hr className="border border-gray-900 w-full mb-30" />
        <p className="text-black text-4xl ml-70">Settings</p>
        <div className="flex justify-between border-b py-2">
          <span className="text-black text-2xl font-medium">Name :</span>
          <span className="text-black bg-gray-100 px-4 py-1 rounded-md">{chat.name}</span>
        </div>
        <hr className="border border-gray-300 w-full" />

        <div className="flex justify-between items-center border-b py-2">
          <span className="text-black text-2xl font-medium">Logo:</span>
          <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
            {chat.logo}
          </div>
        </div>
        <hr className="border border-gray-300 w-full" />

        <div className="flex justify-between border-b py-2 items-start">
          <span className="text-black text-2xl font-medium pt-1">Description:</span>
          <div className="text-black bg-gray-100 p-3 rounded-md whitespace-pre-wrap">
            {chat.description}
          </div>
        </div>
        <hr className="border border-gray-300 w-full" />

        <div className="flex justify-between border-b py-2">
          <span className="text-black text-2xl font-medium">Foundation :</span>
          <span className="text-black bg-gray-100 px-4 py-1 rounded-md">{chat.foundation}</span>
        </div>
        <hr className="border border-gray-300 w-full" />

        <div className="flex justify-between border-b py-2">
          <span className="text-black text-2xl font-medium">Interface type :</span>
          <span className="text-black bg-gray-100 px-4 py-1 rounded-md">{chat.interfaceType}</span>
        </div>
      </div>
    </div>
  );
}
