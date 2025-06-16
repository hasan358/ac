import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import AvatarOrSignIn from '../components/AvatarOrSignIn';
import ChatCard from '../components/ChatCard';

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

const ClassicInterfacePage: React.FC = () => {
  const { chatId, slug } = useParams<{ chatId?: string; slug?: string }>(); // Изменено с convName на slug
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

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

  const messages = [
    {
      role: 'user',
      text: 'Lorem Ipsum',
    },
    {
      role: 'ai',
      text: `**What is Lorem Ipsum?**
Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s.

**Why do we use it?**
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
    },
  ];

  return (
    <div className="h-screen w-full max-w-none bg-gray-50 flex flex-col gap-0 overflow-auto">
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
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition"
          >
            <Home size={20} className="text-black" />
          </Link>
        </nav>
      </header>
      <hr className="border border-gray-300 w-full" />

      {/* Main section */}
      <section className="relative flex-1 flex">
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

        {/* Right Section */}
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
          <hr className="border border-gray-300 w-full mb-12" />
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto space-y-6">
            <div className="mb-15 ml-215 max-w-[125px] bg-gray-200 text-black px-4 py-2 rounded-t-xl rounded-bl-xl shadow">
              {messages[0].text}
            </div>
            <div className="text-gray-800 px-45">
              <strong className="block text-2xl">What is Lorem Ipsum?</strong>
              <p className="mt-2 text-2xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                It has been the industry's standard dummy text ever since the 1500s.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptates maiores at placeat explicabo? Ex doloribus rerum culpa, ipsam iste iusto!
              </p>
              <strong className="block mt-4 text-2xl">Why do we use it?</strong>
              <p className="mt-2 text-2xl">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                 Ad, ratione atque ipsam dolores eaque soluta harum beatae ullam itaque impedit consequatur aliquam veniam ab veritatis error omnis quasi cum pariatur.
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="w-full mt-10">
            <textarea
              placeholder="Write a prompt"
              className="fixed bottom-10 left-165  w-[830px] min-h-[120px] bg-white p-4 border border-gray-400 text-black rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassicInterfacePage;