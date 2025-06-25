import React from 'react';
import { useParams } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import FilterButton from '../../components/FilterButton';
import AvatarOrSignIn from '../../components/AvatarOrSignIn';
import ChatCard from '../../components/ChatCard';

const chatData: Record<string, {
  title: string;
  description: string;
  tags: string[];
  rating: string;
  comments: string;
  updated: string;
  id: string;
  ispaid: boolean;
  cost: number;
}> = {
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
  const { chatId } = useParams();
  const chat = chatData[chatId || ''];

  const isSignedIn = false;
  const [search, setSearch] = React.useState('');

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
      <header className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2 w-[440px]">
          <SearchBar
            value={search}
            onChange={setSearch}
            aria-label="Search AI chats"
          />
          <Link to="/filter" aria-label="Go to filter page">
            <FilterButton onClick={() => {}} />
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

        {/* Left panel */}
        <div className="relative w-[455px] border-r border-gray-300 z-0">
          {Object.keys(chatData).map((id, i) => (
            <React.Fragment key={id}>
              {i > 0 && <hr className="border-t border-gray-300 w-full" />}
              <Link to={`/chat/${id}`}>
                <ChatCard
                  title={chatData[id].title}
                  description={chatData[id].description}
                  logoUrl="/ai-logo-placeholder.png"
                />
              </Link>
            </React.Fragment>
          ))}
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
              <div className="text-sm text-gray-500">
                Rating: <span className="text-yellow-500 font-medium">{chat.rating}★</span> |
                Comments: <span className="font-medium">{chat.comments}</span> |
                Last update: <span className="text-gray-400">{chat.updated}</span>
              </div>
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
    to={`/`}
    className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
  >
    Back
  </Link>

  {chat.ispaid ? (
    <Link to={`/chat/${chat.id}/checkout-page`}>
    <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
      Buy for ${chat.cost}
    </button>
    </Link>
  ) : (
  <Link to={`/chat/${chat.id}/menu`}>
    <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
      Try
    </button>
  </Link>
  )}
</div>
        </div>
      </section>
    </div>
  );
};

export default DescriptionPage;