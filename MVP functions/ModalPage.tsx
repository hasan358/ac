import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import AvatarOrSignIn from '../components/AvatarOrSignIn';

interface ChatData {
  title: string;
  description?: string;
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
    title: 'Example',
    description: 'AI-powered travel assistant for planning trips.',
    interfaceType: 'push-button',
  },
};

// Функция для форматирования slug
const formatSlug = (slug?: string) => {
  if (!slug) return null;
  return slug
    .replace(/-/g, ' ') // Заменяем дефисы на пробелы
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Делаем первую букву заглавной
    .join(' ');
};

const ModalChatInterfacePage: React.FC = () => {
  const { chatId, slug } = useParams<{ chatId?: string; slug?: string }>(); // Изменено с convName на slug
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const isSignedIn = false;


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
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Filter button clicked', event);
  };

  const currentChat = chatId && chatData[chatId] ? chatData[chatId] : chatData['gpt'] || { title: 'Default Chat' };

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
      <header className="flex flex-col md:flex-row items-start md:items-center px-4 py-2 gap-15 md:gap-0 w-full">
        {/* Левая часть: поиск + фильтр */}
        <div className="w-full md:w-[440px] flex items-center gap-2 order-2 md:order-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            aria-label="Search AI chats"
          />
          <Link to="/filter" aria-label="Go to filter page">
            <FilterButton onClick={() => handleFilterClick} />
          </Link>
        </div>
      
        {/* Правая часть: avatar и home */}
        <div className="w-full md:w-auto flex items-center justify-end order-1 md:order-2 md:ml-auto">
          <div className="flex items-center gap-2">
            <AvatarOrSignIn isSignedIn={isSignedIn} />
            <Link
              to="/home"
              className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Go to about page"
            >
              <Home size={20} className="text-black" />
            </Link>
          </div>
        </div>
      </header>
      <hr className="border border-gray-300 w-full" />

      {/* Main section */}
      <section className="relative flex-1 flex">
        {/* Right Section */}
        <div className="flex flex-col flex-1 relative">
  <div className="flex-1 overflow-y-auto p-10 pb-40"> 
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
          <hr className="border border-gray-300 w-full mb-12 " />
          {/* Chat Area */}
          <div className="space-y-6">
            <div className='w-full relative left-200'>
            <div className="  max-w-[125px] bg-gray-200 text-black px-4 py-2 rounded-t-xl rounded-bl-xl shadow ">
              {messages[0].text}
            </div>
            </div>
            <div className="text-gray-800 px-5 xl:px-15">
              <strong className="block text-2xl">What is Lorem Ipsum?</strong>
              <p className="mt-2 text-2xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                It has been the industry's standard dummy text ever since the 1500s.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptates maiores at placeat explicabo? Ex doloribus rerum culpa, ipsam iste iusto!
              </p>
              <Link to={`/${chatId}/answer/${slug}`}>
                <button className="mt-4 px-30 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
                  Lorem Ipsum
                </button>
              </Link>
            </div>
          </div>
          </div>
          {/* Input */}
          <div className="w-full fixed bottom-4 px-10">
  <textarea
    placeholder="Write a prompt..."
    className="w-full mx-auto min-h-[120px] bg-white p-4 border border-gray-400 text-black rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 "
  />
</div>
        </div>
      </section>
    </div>
  );
};

export default ModalChatInterfacePage;