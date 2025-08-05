import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, ArrowUp, ArrowDown } from 'lucide-react';
import ChatCard from '../components/ChatCard';
import { Link, useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AvatarOrSignIn from '../components/AvatarOrSignIn';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatData {
  title: string;
  model: string;
  id?: string;
  description?: string;
  tags?: string[];
  updated?: string;
}

const chatData: Record<string, ChatData> = {
  gpt: {
    title: 'ChatGPT',
    model: "openai/gpt-4.1",
    description: "The gpt-4.1 series is the latest iteration of the gpt-4o model family. This iteration of models is specifically targeted for better coding and instruction following, making it better at handling complex technical and coding problems./nIn addition, it has all chatGPT features.",
    tags: ['coding', 'instruction following', 'long-context understanding'],
  },
  grock: {
    title: 'Grok 3',
    model: "xai/grok-3",
    description: "Grok 3 is xAI's debut non-reasoning model, pre-trained by the Colossus datacenter at supermassive scale to excel in enterprise domains like finance, healthcare, and legal. It has exceptional instruction following capabilities and is purpose-built for common business use cases like data extraction, coding, and text summarization.",
    tags: ['specialized domains', 'coding', 'problem-soloving'],
  },
  mistral: {
    title: 'Mistral Medium 3',
    model: "mistral-ai/mistral-medium-2505",
    description: 'Mistral Medium 3 is a SOTA & versatile model designed for a wide range of tasks, including programming, mathematical reasoning, understanding long documents, summarization, and dialogue./nIt boasts multi-modal capabilities, enabling it to process visual inputs, and supports dozens of languages, including over 80 coding languages. Additionally, it features function calling and agentic workflows.',
    tags: ['state-of-the-art', 'reasoning', 'knowledge', 'coding', 'vision capabilities'],
  },
  deepseek: {
    title: 'DeepSeek',
    model: "deepseek/DeepSeek-R1-0528",
    description: 'The DeepSeek R1 model has undergone a minor version upgrade, with the current version being DeepSeek-R1-0528. In the latest update, DeepSeek R1 has significantly improved its depth of reasoning and inference capabilities by leveraging increased computational resources and introducing algorithmic optimization mechanisms during post-training. The model has demonstrated outstanding performance across various benchmark evaluations, including mathematics, programming, and general logic. Its overall performance is now approaching that of leading models, such as O3 and Gemini 2.5 Pro.',
    tags: ['reasoning capabilities', 'reduced hallucination rate', 'enhanced support for function calling', 'vibe coding'],
  },
  llama: {
    title: 'Llama',
    model: "meta/Llama-4-Scout-17B-16E-Instruct",
    description: 'The Llama 4 collection of models are natively multimodal AI models that enable text and multimodal experiences. These models leverage a mixture-of-experts architecture to offer industry-leading performance in text and image understanding.',
    tags: ['reasoning', 'assistant', 'multi-modal'],
  },
  cohere: {
    title: 'Cohere Command',
    model: "cohere/cohere-command-a",
    description: "Command A is Cohere's flagship generative model, optimized for companies that require fast, secure, and highly-performant AI solutions. Command A delivers maximum performance with minimal hardware costs when compared to leading proprietary and open-weights models, such as GPT-4o and DeepSeek-V3. For private deployments, Command A excels on business-critical agentic and multilingual tasks, and can be deployed on just 2 GPUs, compared to competitive models that typically require as many as 32 GPUs.",
    tags: ['efficient generative model', 'agentic', 'multilingual'],
  },
  microsoft: {
    title: 'Microsoft',
    model: "microsoft/Phi-4-mini-reasoning",
    description: 'Phi-4-Reasoning is a state-of-the-art open-weight reasoning model finetuned from Phi-4 using supervised fine-tuning on a dataset of chain-of-thought traces and reinforcement learning. The supervised fine-tuning dataset includes a blend of synthetic prompts and high-quality filtered data from public domain websites, focused on math, science, and coding skills as well as alignment data for safety and Responsible AI. The goal of this approach was to ensure that small capable models were trained with data focused on high quality and advanced reasoning.',
    tags: ['State-of-the-art', 'open-weight', 'reasoning model'],
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

// Компонент для отображения кода в рамочке
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy code:', err);
    });
  };

  return (
    <div className="relative bg-gray-800 text-white rounded-lg p-4 my-2 font-mono text-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">text</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-gray-200 flex items-center gap-1"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
      </div>
      <pre className="whitespace-pre-wrap overflow-x-auto">{code}</pre>
    </div>
  );
};

// Парсинг текста для выделения кодовых блоков и жирного текста
const parseMessageText = (text: string) => {
  const parts: { type: 'text' | 'code' | 'bold'; content: string }[] = [];
  const codeBlockRegex = /```[\s\S]*?```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = matchStart + match[0].length;

    if (matchStart > lastIndex) {
      const preCodeText = text.slice(lastIndex, matchStart);
      const boldRegex = /\*\*([^\*]+)\*\*/g;
      let boldLastIndex = 0;
      let boldMatch;

      while ((boldMatch = boldRegex.exec(preCodeText)) !== null) {
        const boldStart = boldMatch.index;
        const boldEnd = boldStart + boldMatch[0].length;

        if (boldStart > boldLastIndex) {
          parts.push({ type: 'text', content: preCodeText.slice(boldLastIndex, boldStart) });
        }

        parts.push({ type: 'bold', content: boldMatch[1] });
        boldLastIndex = boldEnd;
      }

      if (boldLastIndex < preCodeText.length) {
        parts.push({ type: 'text', content: preCodeText.slice(boldLastIndex) });
      }
    }

    const codeContent = match[0].replace(/^```[\n]?|```$/g, '');
    parts.push({ type: 'code', content: codeContent });

    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    const boldRegex = /\*\*([^\*]+)\*\*/g;
    let boldLastIndex = 0;
    let boldMatch;

    while ((boldMatch = boldRegex.exec(remainingText)) !== null) {
      const boldStart = boldMatch.index;
      const boldEnd = boldStart + boldMatch[0].length;

      if (boldStart > boldLastIndex) {
        parts.push({ type: 'text', content: remainingText.slice(boldLastIndex, boldStart) });
      }

      parts.push({ type: 'bold', content: boldMatch[1] });
      boldLastIndex = boldEnd;
    }

    if (boldLastIndex < remainingText.length) {
      parts.push({ type: 'text', content: remainingText.slice(boldLastIndex) });
    }
  }

  return parts;
};

const ModalChatInterfacePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chatName, setChatName] = useState<string | undefined>(undefined);
  const [isScrollToTop, setIsScrollToTop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable messages container
  const { chatId } = useParams<{ chatId?: string }>();
  const { user, token } = useAuth();

  const filteredChats = POPULAR_CHATS.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsScrollToTop(false);
  };

  const scrollToTop = () => {
    messagesContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setIsScrollToTop(true);
  };

  const handleScrollToggle = () => {
    if (isScrollToTop) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
  };

  useEffect(() => {
    if (!isScrollToTop) {
      scrollToBottom();
    }
  }, [messages]);

  const currentChat = chatId && chatData[chatId] ? chatData[chatId] : chatData['gpt'] || { title: 'Default Chat' };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/conversations/',
        { question: inputMessage },
        {
          params: { model: currentChat.model },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response.replace(/#/g, '\n') || 'Ответ не получен',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setChatName(response.data.name);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Ошибка при отправке сообщения',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
            <AvatarOrSignIn
              isSignedIn={!!user}
              avatarUrl="/ai-logo-placeholder.png"
            />
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
              <Link to={`/${chat.id}/menu`} className="block w-full">
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
          {/* Chat header - conditionally rendered */}
          {isSubmitted && (
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-4 w-full">
                <h1 className="text-2xl font-bold text-gray-800">
                  {formatSlug(chatName) || currentChat.title || 'Untitled Chat'}
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
          )}

          {/* Messages and input form */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={messagesContainerRef}>
              <div ref={messagesStartRef} className="h-0" />
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
                        <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-blue-500 text-white">
                          <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>
                            {message.text}
                          </p>
                          <p className="text-xs mt-1 text-blue-100">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      ) : (
                        <div className="max-w-5xl w-full">
                          {parseMessageText(message.text).map((part, index) => (
                            <div key={index}>
                              {part.type === 'code' ? (
                                <CodeBlock code={part.content} />
                              ) : part.type === 'bold' ? (
                                <span className="text-3xl font-bold text-gray-800">
                                  {part.content}
                                </span>
                              ) : (
                                <p className="text-2xl text-gray-800" style={{ whiteSpace: 'pre-wrap' }}>
                                  {part.content}
                                </p>
                              )}
                            </div>
                          ))}
                          <p className="text-xs mt-1 text-gray-500">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
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
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
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
                <button
                  onClick={handleScrollToggle}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  aria-label={isScrollToTop ? 'Scroll to bottom' : 'Scroll to top'}
                  title={isScrollToTop ? 'Scroll to bottom' : 'Scroll to top'}
                >
                  {isScrollToTop ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
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