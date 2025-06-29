import React, { useState, useMemo } from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import ChatCard from '../components/ChatCard';
import AvatarOrSignIn from '../components/AvatarOrSignIn';

interface Chat {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
}

interface MainPageProps {}

const POPULAR_CHATS: Chat[] = [
  {
    id: 'gpt',
    title: 'ChatGPT',
    description: 'Your friendly everyday AI for quick tasks and help.',
    logoUrl: '/ai-logo-placeholder.png',
  },
  {
    id: 'vison',
    title: 'Cloud Vison',
    description: 'Get instant coding assistance from AI.',
    logoUrl: '/ai-logo-placeholder.png',
  },
  {
    id: 'hug-face',
    title: 'Hugging Face',
    description: 'Discover places and get travel tips powered by AI.',
    logoUrl: '/ai-logo-placeholder.png',
  },
  {
    id: 'replicate',
    title: 'Replicate',
    description: 'Your friendly everyday AI for quick tasks and help.',
    logoUrl: '/ai-logo-placeholder.png',
  },
  {
    id: 'stability-ai',
    title: 'Stability AI',
    description: 'Get instant coding assistance from AI.',
    logoUrl: '/ai-logo-placeholder.png',
  },
  {
    id: 'ex',
    title: 'Example',
    description: 'Discover places and get travel tips powered by AI.',
    logoUrl: '/ai-logo-placeholder.png',
  },
  {
    id: 'paid-ex',
    title: 'Paid Example',
    description: 'Your friendly everyday AI for quick tasks and help.',
    logoUrl: '/ai-logo-placeholder.png',
  },
];

const MainPage: React.FC<MainPageProps> = () => {
  const [search, setSearch] = useState<string>('');
  const isSignedIn = false;

  const filteredChats = useMemo(() => {
    if (!search.trim()) return POPULAR_CHATS;
    const searchLower = search.toLowerCase();
    return POPULAR_CHATS.filter(
      (chat) =>
        chat.title.toLowerCase().includes(searchLower) ||
        chat.description.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Filter button clicked', event);
  };

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
      <section className="relative flex-1 flex flex-col-reverse md:flex-row">
        <div className="absolute left-[0px] top-0 bottom-0 w-px bg-gray-300 z-0 xl:left-[455px] lg:left-[370px] md:left-[300px]" />
        {/* Left panel: chat list */}
        <div className="flex flex-col w-full md:w-[300px] lg:w-[370px] xl:w-[455px]">
          {/* + Create Chat (только для мобильной версии) */}
          <div className="block md:hidden ml-1  mr-1 w-[416px] px-30 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50">
            <Link
              to="/create"
              className="text-blue-600 text-xl font-bold hover:underline"
            >
              + Create Chat
            </Link>
          </div>

          {/* + Create Chat (фиксированная кнопка для планшетов и десктопа) */}
          <div className="hidden md:block left-90 bottom-220 -translate-x-1/2 md:fixed md:left-130 md:bottom-100 lg:fixed lg:left-180 lg:bottom-100 xl:fixed xl:left-235 xl:bottom-100 2xl:fixed 2xl:left-275 2xl:bottom-100 z-10">
            <Link
              to="/create"
              className="text-blue-600 text-2xl font-bold hover:underline md:text-3xl lg:text-4xl xl:text-6xl"
            >
              + Create Chat
            </Link>
          </div>

          <hr className="border-t border-gray-300 w-full mb-2" />

          {/* Список чатов */}
          <div className="flex flex-col gap-0">
            {filteredChats.map((chat, idx) => (
              <React.Fragment key={chat.id}>
                {idx > 0 && (
                  <hr className="border-t border-gray-300 w-full" />
                )}
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
        </div>
      </section>
    </div>
  );
};

export default MainPage;