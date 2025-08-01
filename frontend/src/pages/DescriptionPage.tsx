import { useParams, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AvatarOrSignIn from '../components/AvatarOrSignIn';
import ChatCard from '../components/ChatCard';
import { useAuth } from '../context/AuthContext';
import React from 'react';

interface Chat {
  id: string;
  title: string;
  description: string;
  tags: string[];
  rating: string;
  comments: string;
  updated: string;
  ispaid: boolean;
  cost: number;
}

const chatData: Record<string, Chat> = {
  'gpt': {
    title: 'ChatGPT',
    description: 'This AI helps you with everyday questions and tasks.',
    tags: ['Universal ai', 'Assistant', 'English', 'Free', 'Classic chat'],
    rating: '9.5',
    comments: '80k',
    updated: '2 months ago',
    id: 'gpt',
    ispaid: false,
    cost: 0,
  },
  'vison': {
    title: 'Cloud Vison',
    description: 'Ask coding questions, get examples and fix bugs in seconds.',
    tags: ['Devtools', 'New', 'English', 'Free', 'Modal'],
    rating: '9.0',
    comments: '60k',
    updated: '1 week ago',
    id: 'vison',
    ispaid: false,
    cost: 0,
  },
  'hug-face': {
    title: 'Hugging Face',
    description: 'AI-powered travel assistant to help you plan trips and explore the world.',
    tags: ['Travel', 'Assistant', 'English', 'Free', 'Push-button'],
    rating: '8.8',
    comments: '15k',
    updated: '5 days ago',
    id: 'hug-face',
    ispaid: false,
    cost: 0,
  },
  'replicate': {
    title: 'Replicate',
    description: 'This AI helps you with everyday questions and tasks.',
    tags: ['Universal ai', 'Assistant', 'English', 'Free', 'Classic chat'],
    rating: '9.5',
    comments: '80k',
    updated: '2 months ago',
    id: 'replicate',
    ispaid: false,
    cost: 0,
  },
  'stability-ai': {
    title: 'Stability AI',
    description: 'Ask coding questions, get examples and fix bugs in seconds.',
    tags: ['Devtools', 'New', 'English', 'Free', 'Modal'],
    rating: '9.0',
    comments: '60k',
    updated: '1 week ago',
    id: 'stability-ai',
    ispaid: false,
    cost: 0,
  },
  'ex': {
    title: 'Example',
    description: 'AI-powered travel assistant to help you plan trips and explore the world.',
    tags: ['Travel', 'Assistant', 'English', 'Free', 'Push-button'],
    rating: '8.8',
    comments: '15k',
    updated: '5 days ago',
    id: 'ex',
    ispaid: false,
    cost: 0,
  },
  'paid-ex': {
    title: 'Paid Example',
    description: 'AI-powered travel assistant to help you plan trips and explore the world.',
    tags: ['Travel', 'Assistant', 'English', 'Free', 'Push-button'],
    rating: '8.8',
    comments: '15k',
    updated: '5 days ago',
    id: 'paid-ex',
    ispaid: true,
    cost: 9.99,
  },
};

const DescriptionPage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const chat = chatId ? chatData[chatId] : undefined;
  const [search, setSearch] = React.useState('');
  const { user } = useAuth();

  // Convert chatData to an array for mapping
  const filteredChats: Chat[] = Object.values(chatData);

  if (!chat) {
    return (
      <div className="p-10 text-center text-gray-500">
        <p>Chat not found.</p>
        <Link to="/" className="text-blue-500 underline mt-4 inline-block">Go back to main page</Link>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-none bg-gray-50 flex flex-col gap-0 overflow-auto">
      {/* Topbar */}
      <header className="flex flex-col md:flex-row items-start md:items-center px-4 py-2 gap-15 md:gap-0 w-full">
        {/* Left part: search + filter */}
        <div className="w-full md:w-[440px] flex items-center gap-2 order-2 md:order-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            aria-label="Search AI chats"
          />
        </div>

        {/* Right part: avatar and home */}
        <div className="w-full md:w-auto flex items-center justify-end order-1 md:order-2 md:ml-auto">
          <div className="flex items-center gap-2">
                  <AvatarOrSignIn
        isSignedIn={!!user}
        avatarUrl={"/ai-logo-placeholder.png"} // Передаем avatarUrl
      />
          </div>
        </div>
      </header>

      <hr className="border border-gray-300 w-full" />

      {/* Main section */}
      <section className="relative flex-1 flex">
        <div className='hidden sm:block'>
          <div className="absolute left-[0px] top-0 bottom-0 w-px bg-gray-300 z-0 xl:left-[455px] lg:left-[370px] md:left-[300px]" />
          <div className="flex flex-col gap-0">
            {filteredChats.map((chat: Chat, idx: number) => (
              <React.Fragment key={chat.id}>
                {idx > 0 && <hr className="border-t border-gray-300 w-full" />}
                <Link to={`/${chat.id}/menu`}>
                  <ChatCard
                    title={chat.title}
                    description={chat.description}
                    logoUrl="/ai-logo-placeholder.png"
                  />
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-4 px-10 py-6 flex-1">
          <div className="flex items-center gap-4">
            <img
              src="/ai-logo-placeholder.png"
              alt={chat.title}
              className="w-16 h-16"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{chat.title}</h1>
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed">{chat.description}</p>

          <div className="flex flex-wrap gap-2">
            {chat.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-4">
            <Link
              to={`/${chatId}/menu`}
              className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              Back
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DescriptionPage;