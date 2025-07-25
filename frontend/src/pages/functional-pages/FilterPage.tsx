import React, { useState, useMemo } from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import FilterButton from '../../components/FilterButton';
import AvatarOrSignIn from '../../components/AvatarOrSignIn';
import ChatCard from '../../components/ChatCard';

interface Chat {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
}


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

const FilterPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const isSignedIn = false;

  // Значения по умолчанию
  const [aiType, setAiType] = useState('Assistant');
  const [monetization, setMonetization] = useState('Free');
  const [interfaceType, setInterfaceType] = useState('Classic chat');
  const [theme, setTheme] = useState('');
  const [language, setLanguage] = useState('');
  const [ratingFrom, setRatingFrom] = useState('');
  const [ratingTo, setRatingTo] = useState('');
  const [isNew, setIsNew] = useState(false);

  const aiTypeOptions = ['Assistant', 'Business AI', 'Training AI', 'Entertainment AI', 'AI Character'];
  const monetizationOptions = ['Free', 'Paid', 'Chat with ads'];
  const interfaceOptions = ['Classic chat', 'Modal response', 'Push-button'];

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
      <section className="relative flex-1 flex">
       <div className='hidden sm:block'>
        <div className="absolute left-[0px] top-0 bottom-0 w-px bg-gray-300 z-0 xl:left-[455px] lg:left-[370px] md:left-[300px]" />        {/* Left panel: chat list */}
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

<div className="flex flex-col gap-5 px-6 py-6 flex-1">
  {/* Theme */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Theme:
    </label>
    <input
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      placeholder="e.g. Productivity, Storytelling..."
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* AI Type */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      AI Type:
    </label>
    <select
      value={aiType}
      onChange={(e) => setAiType(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {aiTypeOptions.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>

  {/* Language */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Language:
    </label>
    <input
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      placeholder="e.g. English, Spanish..."
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Rating */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Rating:
    </label>
    <div className="flex gap-2">
      <input
        placeholder="from"
        value={ratingFrom}
        onChange={(e) => setRatingFrom(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        placeholder="to"
        value={ratingTo}
        onChange={(e) => setRatingTo(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* New */}
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={isNew}
      onChange={(e) => setIsNew(e.target.checked)}
      className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
    />
    <label className="text-sm font-medium text-gray-700">New</label>
  </div>

  {/* Monetization type */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Monetization type:
    </label>
    <select
      value={monetization}
      onChange={(e) => setMonetization(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {monetizationOptions.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>

  {/* Interface type */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Interface type:
    </label>
    <select
      value={interfaceType}
      onChange={(e) => setInterfaceType(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {interfaceOptions.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>

  {/* Кнопки */}
  <div className="flex items-center gap-8">
    <Link
        to={`/`}
        className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
      >
        Back
      </Link>
    <button className="px-6 py-2 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600">
      Select
    </button>
    </div>
  </div>
  </section>
</div>

  );
};

export default FilterPage;