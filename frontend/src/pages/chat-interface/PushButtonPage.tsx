import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import FilterButton from '../../components/FilterButton';
import AvatarOrSignIn from '../../components/AvatarOrSignIn';
import ChatCard from '../../components/ChatCard';

interface ChatData {
  title: string;
  description?: string; // Made optional to match chatData
  tags?: string[];
  rating?: string;
  comments?: string;
  updated?: string;
  id?: string;
  interfaceType?: 'classic' | 'model' | 'push-button';
}

const chatData: Record<string, ChatData> = {
  gpt: {
    title: 'ChatGPT',
    description: 'This AI helps you with everyday questions and tasks.',
    interfaceType: 'classic',
  },
  vison: {
    title: 'Cloud Vision',
    description: 'Ask coding questions, get examples and fix bugs in seconds.',
    interfaceType: 'model',
  },
  'hug-face': {
    title: 'Hugging Face',
    description: 'AI-powered travel assistant to help you plan trips.',
    interfaceType: 'push-button',
  },
  replicate: {
    title: 'Replicate',
    description: 'This AI helps you with everyday questions and tasks.',
    interfaceType: 'classic',
  },
  'stability-ai': {
    title: 'Stability AI',
    description: 'Ask coding questions, get examples and fix bugs.',
    interfaceType: 'model',
  },
  'paid-ex': {
    title: 'Paid Example',
    description: 'AI-powered travel assistant for planning trips.',
    interfaceType: 'classic',
  },
  ex: {
    title: 'Example', // Unique title
    description: 'AI-powered travel assistant for planning trips.',
    interfaceType: 'push-button',
  },
};

const POPULAR_CHATS = Object.keys(chatData).map((id) => ({
  id,
  title: chatData[id].title,
  description: chatData[id].description || '',
  logoUrl: '/ai-logo-placeholder.png',
}));

// Функция для форматирования slug
const formatSlug = (slug?: string) => {
  if (!slug) return null;
  return slug
    .replace(/-/g, ' ') // Заменяем дефисы на пробелы
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Делаем первую букву заглавной
    .join(' ');
};

const PushButtonInterfacePage: React.FC = () => {
  const { chatId, slug } = useParams<{ chatId?: string; slug?: string }>(); // Изменено с convName на slug
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  // Логирование для отладки
  console.log('chatId:', chatId); // Должно вывести: vison
  console.log('slug:', slug); // Должно вывести: chat-5
  console.log('currentChat:', chatId && chatData[chatId]);

  // Редирект, если chatId недействителен
  if (chatId && !chatData[chatId]) {
    console.log('Redirecting to /menu/gpt because chatId is invalid');
    navigate('/menu/gpt');
    return null;
  }

  const currentChat = chatId && chatData[chatId] ? chatData[chatId] : chatData['gpt'] || { title: 'Default Chat' };

  const filteredChats = POPULAR_CHATS.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );
  const exampleButtons = [
    "Suggest a trip plan",
    "What can you do?",
    "Summarize this paragraph",
  ];

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col overflow-auto">
      {/* Topbar */}
      <header className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2 w-[440px]">
          <SearchBar
            value={search}
            onChange={(val: string) => setSearch(val)}
            aria-label="Search AI chats"
            placeholder="Search..."
          />
          <Link to="/filter" aria-label="Go to filter page">
            <FilterButton onClick={() => {}} />
          </Link>
        </div>
        <nav className="flex items-center gap-5">
          <AvatarOrSignIn isSignedIn={false} />
          <Link
            to="/home"
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100"
          >
            <Home size={20} className="text-black" />
          </Link>
        </nav>
      </header>
      <hr className="border border-gray-300 w-full" />

      {/* Main section */}
      <section className="relative flex-1 flex">
        {/* Vertical separator */}
        <div className="absolute left-[455px] top-0 bottom-0 w-px bg-gray-300 z-0" />

        {/* Sidebar */}
        <div className="flex flex-col gap-0 w-[455px]">
          {filteredChats.map((chat, idx) => (
            <React.Fragment key={chat.id}>
              {idx > 0 && <hr className="border-t border-gray-300 w-full" />}
              <Link to={`/chat/${chat.id}`}>
                <ChatCard
                  title={chat.title}
                  description={chat.description}
                  logoUrl={chat.logoUrl}
                />
              </Link>
            </React.Fragment>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex flex-col flex-1 p-10 gap-6">
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 w-full">
            <h1 className="text-2xl font-bold text-gray-800">
              {formatSlug(slug) || currentChat.title || 'Untitled Chat'}
            </h1>
            <div className="flex justify-end gap-4 flex-1">
              <Link
                to={`/chat/${chatId}/menu`}
                className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Back
              </Link>
            </div>
          </div>
          <hr className="border border-gray-300 w-full mb-10" />
          <h2 className="text-2xl font-semibold text-gray-700 text-center">How can I help you?</h2>

          {/* User selection */}
          {selectedPrompt ? (
            <div className="mb-10 ml-auto max-w-[60%] bg-blue-100 text-black px-6 py-3 rounded-xl text-center shadow">
              {selectedPrompt}
            </div>
          ) : null}

          {/* AI response */}
          {selectedPrompt && (
            <div className="text-gray-800 px-10 text-lg">
              <p><strong>Answer:</strong> This is a placeholder answer for: <em>{selectedPrompt}</em></p>
            </div>
          )}

          {/* Buttons */}
<div className="fixed bottom-0 left-270 transform -translate-x-1/2 w-full max-w-2xl px-10 pb-6 z-10">
            <div className="flex flex-col gap-6 justify-center pt-6">
              {exampleButtons.map((prompt, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPrompt(prompt)}
                  className={`flex items-center cursor-pointer p-4 rounded-lg border transition shadow-sm ${
                    selectedPrompt === prompt
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold mr-4">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-gray-800 text-lg sm:text-base">{prompt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PushButtonInterfacePage;