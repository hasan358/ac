import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import FilterButton from '../../components/FilterButton';
import AvatarOrSignIn from '../../components/AvatarOrSignIn';
import ChatCard from '../../components/ChatCard';

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

const POPULAR_CHATS = Object.keys(chatData).map((id) => ({
  id,
  title: chatData[id].title,
  description: chatData[id].description || '',
  logoUrl: '/ai-logo-placeholder.png',
}));

const ChatMenuPage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const [searchChats, setSearchChats] = useState('');
  const [searchConversations, setSearchConversations] = useState('');
  const isSignedIn = false;

  const [conversations, setConversations] = useState<string[]>([
    'chat 5', 'chat 4', 'chat 3', 'chat 2', 'chat 1',
  ]);

  if (chatId && !chatData[chatId]) {
    navigate('/menu/gpt');
  }

  const currentChat = chatId && chatData[chatId] ? chatData[chatId] : chatData['gpt'];

  const filteredChats = POPULAR_CHATS.filter((chat) =>
    chat.title.toLowerCase().includes(searchChats.toLowerCase())
  );

  const filteredConversations = conversations.filter((conv) =>
    conv.toLowerCase().includes(searchConversations.toLowerCase())
  );

  const handleNewConversation = () => {
    const newChat = `chat ${conversations.length + 1}`;
    setConversations([newChat, ...conversations]);
  };

  const handleConversationClick = (convName: string) => {
    if (!chatId) return;

    const data = chatData[chatId];
    const slug = convName.replace(/\s+/g, '-').toLowerCase();

    switch (data.interfaceType) {
      case 'classic':
        navigate(`/chat/${chatId}/classic-interface/${slug}`);
        break;
      case 'model':
        navigate(`/chat/${chatId}/model-interface/${slug}`);
        break;
      case 'push-button':
        navigate(`/chat/${chatId}/pushbutton-interface/${slug}`);
        break;
      default:
        console.warn('Unknown interface type');
    }
  };

  return (
    <div className="h-screen w-full max-w-none bg-gray-50 flex flex-col gap-0 overflow-auto">
      <header className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2 w-[440px]">
          <SearchBar
            value={searchChats}
            onChange={(value: string) => setSearchChats(value)}
            aria-label="Search"
            placeholder="Search..."
          />
          <Link to="/filter" aria-label="Go to filter page">
            <FilterButton onClick={() => {}} />
          </Link>
        </div>
        <nav className="flex items-center gap-5">
          <AvatarOrSignIn isSignedIn={isSignedIn} />
          <Link
            to="/home"
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition"
          >
            <Home size={20} className="text-black" />
          </Link>
        </nav>
      </header>
      <hr className="border border-gray-300 w-full" />

      <section className="relative flex-1 flex">
        <div className="absolute left-[455px] top-0 bottom-0 w-px bg-gray-300 z-0" />
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
        <div className="flex flex-col items-start p-10 gap-6 flex-1">
          <div className="flex items-center gap-4 pb-4 w-full">
  <img
    src="/ai-logo-placeholder.png"
    alt={currentChat.title}
    className="w-12 h-12 flex-shrink-0"
  />
  <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
    {currentChat.title}
  </h1>
  <div className="flex justify-end gap-4 flex-1">
    <Link
      to={`/chat/${chatId}`}
      className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
    >
      Back
    </Link>
  </div>
</div>
          <hr className="border border-gray-300 w-full" />
          <div className="ml-20 w-[1000px] border border-gray-400 rounded-xl p-6 bg-white mt-5">
            <div className="mb-4">
              <SearchBar
                value={searchConversations}
                onChange={(value: string) => setSearchConversations(value)}
                aria-label="Search conversations"
                placeholder="Search conversations..."
              />
            </div>
            <button
              onClick={() => handleNewConversation()}
              className="w-full mb-4 px-4 py-2 text-black border border-black rounded-md font-semibold hover:bg-gray-100"
              aria-label="Start new conversation"
            >
              New conversation
            </button>
            <div className="flex flex-col gap-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleConversationClick(conv)}
                    className="px-4 py-2 text-black border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Conversation ${conv}`}
                  >
                    {conv}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center">No conversations found</div>
              )}
            </div>
          </div>
          {/* Fixed Rating and Comments Section */}
        </div>
      </section>
    </div>
  );
};

export default ChatMenuPage;