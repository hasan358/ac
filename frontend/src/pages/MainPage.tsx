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
          <header className="flex justify-between items-center px-4 py-2">
            <div className="flex items-center gap-2 w-[440px]">
              <SearchBar
                value={search}
                onChange={setSearch}
                aria-label="Search AI chats"
              />
              <Link to="/filter" aria-label="Go to filter page">
                <FilterButton onClick={() => {handleFilterClick}} />
              </Link>
            </div>
            <nav className="flex items-center gap-5">
              <AvatarOrSignIn isSignedIn={isSignedIn} />
              <Link
                to="/home"
                className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Go to about page"
              >
                <Home size={20} className="text-black" />
              </Link>
            </nav>
          </header>
          <hr className="border border-gray-300 w-full" />
    
          {/* Main section */}
          <section className="relative flex-1 flex">
            <div className="absolute left-[455px] top-0 bottom-0 w-px bg-gray-300 z-0" />
            {/* Left panel: chat list */}
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
      <div className="fixed bottom-100 left-275 -translate-x-1/2">
        <Link to="/create" className="text-blue-600 text-6xl font-bold hover:">
          + Create Chat
        </Link>
      </div>
      </section>
    </div>
  );
};

export default MainPage;