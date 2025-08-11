import { useParams, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AvatarOrSignIn from '../components/AvatarOrSignIn';
import ChatCard from '../components/ChatCard';
import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';

// Интерфейс данных AI
interface ChatData {
  title: string;
  model: string;
  id: string;
  description: string;
  tags: string[];
  updated?: string;
}

// Функция для получения списка AI
async function fetchAis(limit: number = 100): Promise<ChatData[]> {
  const response = await fetch(`http://127.0.0.1:8000/ai/get?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch AIs');
  }
  const ais = await response.json();
  return ais.map((ai: any) => ({
    id: ai.id.toString(),
    title: ai.title,
    model: ai.model,
    description: ai.description,
    tags: ai.tags,
    updated: ai.updated,
  }));
}

// Функция для получения конкретного AI
async function fetchAi(aiId: string): Promise<ChatData> {
  const response = await fetch(`http://127.0.0.1:8000/ai/get/${aiId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch AI');
  }
  const ai = await response.json();
  return {
    id: ai.id.toString(),
    title: ai.title,
    model: ai.model,
    description: ai.description,
    tags: ai.tags,
    updated: ai.updated,
  };
}

const DescriptionPage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const [chats, setChats] = useState<{ id: string; title: string; description: string; logoUrl: string }[]>([]);
  const [chat, setChat] = useState<ChatData | null>(null);
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  // Загрузка списка AI при монтировании компонента
  useEffect(() => {
    async function loadAis() {
      try {
        const ais = await fetchAis();
        setChats(ais.map(ai => ({
          id: ai.id,
          title: ai.title,
          description: ai.description,
          logoUrl: '/ai-logo-placeholder.png',
        })));
      } catch (error) {
        console.error('Error fetching AIs:', error);
      }
    }
    loadAis();
  }, []);

  // Загрузка данных конкретного AI при изменении chatId
  useEffect(() => {
    async function loadChat() {
      if (chatId) {
        try {
          const ai = await fetchAi(chatId);
          setChat(ai);
        } catch (error) {
          console.error('Error fetching AI:', error);
          setChat(null); // Если AI не найден, устанавливаем null
        }
      } else {
        setChat(null);
      }
    }
    loadChat();
  }, [chatId]);

  // Фильтрация списка AI по поисковому запросу
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  // Если AI не найден, отображаем сообщение
  if (!chat) {
    return (
      <div className="p-10 text-center text-gray-500">
        <p>Chat not found.</p>
        <Link to="/" className="text-blue-500 underline mt-4 inline-block">Go back to main page</Link>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-none bg-gray-50 flex flex-col gap-0">
      {/* Topbar */}
      <header className="flex flex-col md:flex-row items-start md:items-center px-4 py-2 gap-4 md:gap-0 w-full">
        <div className="w-full md:w-[440px] flex items-center gap-2 order-2 md:order-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            aria-label="Search AI chats"
          />
        </div>
        <div className="w-full md:w-auto flex items-center justify-end order-1 md:order-2 md:ml-auto">
          <div className="flex items-center gap-2">
            <AvatarOrSignIn
              isSignedIn={!!user}
              avatarUrl="/ai-logo-placeholder.png"
            />
          </div>
        </div>
      </header>

      <hr className="border border-gray-300 w-full" />

      {/* Main section */}
      <section className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <div className="hidden sm:block w-[445px] h-full bg-white border-r border-gray-200 overflow-y-auto overflow-x-hidden">
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

        {/* Main content */}
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