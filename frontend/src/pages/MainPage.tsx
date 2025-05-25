import React, { useState, useMemo } from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

// стало
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import ChatCard from '../components/ChatCard';
import AvatarOrSignIn from '../components/AvatarOrSignIn';

// Define interfaces for type safety
interface Chat {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
}

interface MainPageProps {
  // Add props if needed for extensibility
}

// Use constants for static data
const POPULAR_CHATS: Chat[] = [
  {
    id: 'gpt-assistant',
    title: 'GPT Assistant',
    description: 'Your friendly everyday AI',
    logoUrl: '/ai-logo-placeholder.png',
  },
  {
    id: 'code-helper',
    title: 'Code Helper',
    description: 'Get coding help instantly',
    logoUrl: '/ai-logo-placeholder.png',
  },
  {
    id: 'travel-buddy',
    title: 'Travel Buddy',
    description: 'AI-powered travel tips',
    logoUrl: '/ai-logo-placeholder.png',
  },
];

const MainPage: React.FC<MainPageProps> = () => {
  const [search, setSearch] = useState<string>('');
  const isSignedIn = false; // Replace with useAuth() hook in production

  // Memoize filtered chats to prevent unnecessary re-renders
  const filteredChats = useMemo(() => {
    if (!search.trim()) return POPULAR_CHATS;
    const searchLower = search.toLowerCase();
    return POPULAR_CHATS.filter(
      (chat) =>
        chat.title.toLowerCase().includes(searchLower) ||
        chat.description.toLowerCase().includes(searchLower)
    );
  }, [search]);

  // Handle filter button click with proper event type
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Implement filter logic or open filter menu
    console.log('Filter button clicked', event);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-8">
      {/* Top Navigation */}
      <header className="flex justify-between items-center">
        {/* Left: Search and Filter */}
        <div className="flex items-center gap-2 w-full sm:w-1/2">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search AI Chats..."
            aria-label="Search AI chats"
          />
        <FilterButton onClick={(e) => handleFilterClick(e)} />
        </div>

        {/* Right: Home + Avatar or Sign In */}
        <nav className="flex items-center gap-4">
          <Link
            to="/about"
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Go to about page"
          >
            <Home size={20} />
          </Link>
          <AvatarOrSignIn isSignedIn={isSignedIn} />
        </nav>
      </header>

      {/* Create Chat Link */}
      <section>
        <Link
          to="/create"
          className="text-blue-600 text-lg font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Create a new chat"
        >
          + Create Chat
        </Link>
      </section>

      {/* Popular Chats */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Popular Chats
        </h2>
        {filteredChats.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChats.map((chat) => (
              <ChatCard
                key={chat.id} // Use unique id instead of index
                title={chat.title}
                description={chat.description}
                logoUrl={chat.logoUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No chats found matching your search.
          </p>
        )}
      </section>
    </div>
  );
};

export default MainPage;