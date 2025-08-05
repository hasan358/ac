import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AvatarOrSignIn from '../components/AvatarOrSignIn';
import ChatCard from '../components/ChatCard';
import { useAuth } from '../context/AuthContext';

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

const ChatMenuPage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const [searchChats, setSearchChats] = useState('');
  const [searchConversations, setSearchConversations] = useState('');
  const { user } = useAuth();

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
    } else {
      navigate('/gpt');
    }
  };

  const handleConversationClick = (convName: string) => {
    if (!chatId) return;

    const slug = convName.replace(/\s+/g, '-').toLowerCase();
    navigate(`/${chatId}/${slug}`);
  };

  return (
    <div className="h-screen w-full max-w-none bg-gray-50 flex flex-col gap-0">
      <header className="flex flex-col md:flex-row items-start md:items-center px-4 py-2 gap-4 md:gap-0 w-full">
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
            <AvatarOrSignIn
              isSignedIn={!!user}
              avatarUrl="/ai-logo-placeholder.png"
            />
          </div>
        </div>
      </header>
      <hr className="border border-gray-300 w-full" />

      <section className="flex-1 flex min-h-0">
        <div className="hidden sm:block w-[445px] h-full bg-white border-r border-gray-200 overflow-y-auto overflow-x-hidden">
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