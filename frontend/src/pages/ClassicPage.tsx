import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatCard from '../components/ChatCard';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AvatarOrSignIn from '../components/AvatarOrSignIn';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

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

// Функция для форматирования slug
const formatSlug = (slug?: string) => {
  if (!slug) return null;
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Симуляция ответа ИИ
const generateAIResponse = (userMessage: string): string => {
  const responses = [
    `Интересный вопрос! По поводу "${userMessage}" могу сказать, что это довольно сложная тема.`,
    `Спасибо за ваш вопрос о "${userMessage}". Вот что я думаю по этому поводу...`,
    `Относительно "${userMessage}" - это требует детального рассмотрения.`,
    `Ваш запрос "${userMessage}" очень актуален. Позвольте мне объяснить.`,
    `По поводу "${userMessage}" я могу предложить несколько вариантов решения.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const ModalChatInterfacePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatId = 'gpt'; // Статическое значение для демонстрации
  const slug = 'chat-example'; // Статическое значение для демонстрации

  const filteredChats = POPULAR_CHATS.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  // Автоскролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentChat = chatId && chatData[chatId] ? chatData[chatId] : chatData['gpt'] || { title: 'Default Chat' };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Симуляция задержки ответа ИИ
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(userMessage.text),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // 1-3 секунды задержка
  };

  return (
    <div className="h-screen w-full max-w-none bg-gray-50 flex flex-col gap-0 overflow-hidden">
      {/* Topbar */}
      <header className="flex flex-col md:flex-row items-start md:items-center px-4 py-2 gap-4 md:gap-0 w-full bg-white shadow-sm">
        <div className="w-full text-black md:w-[440px] flex items-center gap-2 order-2 md:order-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            aria-label="Search AI chats"
          />
        </div>
        <div className="w-full md:w-auto flex items-center justify-end order-1 md:order-2 md:ml-auto">
          <div className="flex items-center gap-2">
            <AvatarOrSignIn isSignedIn/> {/* Removed isSignedIn prop */}
          </div>
        </div>
      </header>
      <hr className="border border-gray-300 w-full" />

      {/* Main section */}
      <section className="relative flex-1 flex overflow-hidden">
        {/* Sidebar with chat list */}
        <div className="w-[445px] bg-white border-r border-gray-200 overflow-y-auto overflow-x-hidden">
          {filteredChats.map((chat, idx) => (
            <React.Fragment key={chat.id}>
              {idx > 0 && <hr className="border-t border-gray-300 w-full" />}
              <Link to={`/${chatId}/menu`} className="block w-full">
                <ChatCard
                  title={chat.title}
                  description={chat.description}
                  logoUrl={chat.logoUrl}
                />
              </Link>
            </React.Fragment>
          ))}
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-4 w-full">
              <h1 className="text-2xl font-bold text-gray-800">
                {formatSlug(slug) || currentChat.title || 'Untitled Chat'}
              </h1>
              <div className="flex justify-end gap-4 flex-1">
                <Link to={`/${chatId}/menu`}>
                  <button
                    className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                    onClick={() => console.log('Back clicked')}
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Messages and input form */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p className="font-semibold text-4xl mb-4">AC</p>
                  <p className="text-lg font-semibold mb-2">Добро пожаловать в чат!</p>
                  <p className="text-sm">Задайте любой вопрос, чтобы начать общение</p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-center text-center'}`}
                    >
                      {message.isUser ? (
                        <>
                          <div
                            className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-blue-500 text-white"
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs mt-1 text-blue-100">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="max-w-2xl w-full">
                          <p className="text-sm text-gray-800">{message.text}</p>
                          <p className="text-xs mt-1 text-gray-500">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-center">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Введите ваше сообщение..."
                  className="flex-1 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isLoading ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalChatInterfacePage;