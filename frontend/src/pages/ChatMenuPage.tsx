import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AvatarOrSignIn from '../components/AvatarOrSignIn';
import ChatCard from '../components/ChatCard';

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

  const [conversations] = useState<string[]>([]);

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
    if (chatId) {
      navigate(`/${chatId}`);
    }
  };

  const handleConversationClick = (convName: string) => {
    if (!chatId) return;

    const data = chatData[chatId];
    const slug = convName.replace(/\s+/g, '-').toLowerCase();
    const interfacePath =
      data.interfaceType === 'push-button'
        ? 'pushbutton-interface'
        : data.interfaceType === 'model'
        ? 'model-interface'
        : 'classic-interface';
    navigate(`/chat/${chatId}/${interfacePath}/${slug}`);
  };

  return (
    <div className="h-screen w-full max-w-none bg-gray-50 flex flex-col gap-0 overflow-auto">
      <header className="flex flex-col md:flex-row items-start md:items-center px-4 py-2 gap-15 md:gap-0 w-full">
        {/* Левая часть: поиск + фильтр */}
        <div className="w-full md:w-[440px] flex items-center gap-2 order-2 md:order-1">
          <SearchBar
            value={searchChats}
            onChange={setSearchChats}
            aria-label="Search AI chats"
          />
        </div>

        {/* Правая часть: avatar и home */}
        <div className="w-full md:w-auto flex items-center justify-end order-1 md:order-2 md:ml-auto">
          <div className="flex items-center gap-2">
            <AvatarOrSignIn isSignedIn/>
          </div>
        </div>
      </header>
      <hr className="border border-gray-300 w-full" />

      <section className="relative flex-1 flex">
        <div className="hidden sm:block">
          {/* Вертикальная линия */}
          <div className="absolute left-[0px] top-0 bottom-0 w-px bg-gray-300 z-0 xl:left-[455px] lg:left-[370px] md:left-[300px]" />

          {/* Sidebar */}
          <div className="flex flex-col gap-0">
            {filteredChats.map((chat, idx) => (
              <React.Fragment key={chat.id}>
                {idx > 0 && <hr className="border-t border-gray-300 w-full" />}
                <Link to={`/${chat.id}/menu`}>
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

        <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 gap-6 flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-4 pb-4 w-full">
            <img
              src="/ai-logo-placeholder.png"
              alt={currentChat.title}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-6rem)] sm:max-w-[calc(100%-8rem)]">
              {currentChat.title}
            </h1>
            <div className="flex justify-end gap-2 sm:gap-4 flex-1">
              <Link
                to={`/chat/${chatId}`}
                className="px-3 py-1 sm:px-4 sm:py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 text-sm"
              >
                AI Description
              </Link>
            </div>
          </div>
          <hr className="border border-gray-300 w-full" />
          <div className="w-full max-w-4xl mx-auto border border-gray-400 rounded-xl p-4 sm:p-6 bg-white mt-4">
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
              className="w-full mb-4 px-4 py-2 text-black border border-black rounded-md font-semibold hover:bg-gray-100 text-sm sm:text-base"
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
                    className="px-4 py-2 text-black border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                    role="button"
                    tabIndex={0}
                    aria-label={`Conversation ${conv}`}
                  >
                    {conv}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center text-sm sm:text-base">No conversations found</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatMenuPage;