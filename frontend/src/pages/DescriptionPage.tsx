import { useParams, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AvatarOrSignIn from '../components/AvatarOrSignIn';
import ChatCard from '../components/ChatCard';
import { useAuth } from '../context/AuthContext';
import React, { useState } from 'react';

interface ChatData {
  title: string;
  model: string;
  id?: string;
  description: string;
  tags: string[];
  updated?: string;
}

const chatData: Record<string, ChatData> = {
  gpt: {
    title: 'ChatGPT',
    model: "openai/gpt-4.1",
    description: "The gpt-4.1 series is the latest iteration of the gpt-4o model family. This iteration of models is specifically targeted for better coding and instruction following, making it better at handling complex technical and coding problems.",
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

const DescriptionPage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const chat = chatId ? chatData[chatId] : undefined;
  const [searchChats] = useState('');
  const [search, setSearch] = React.useState('');
  const { user } = useAuth();

  // Convert chatData to an array for mapping
  const filteredChats = POPULAR_CHATS.filter((chat) =>
    chat.title.toLowerCase().includes(searchChats.toLowerCase())
  );

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
              avatarUrl="/ai-logo-placeholder.png"
            />
          </div>
        </div>
      </header>

      <hr className="border border-gray-300 w-full" />

      {/* Main section */}
      <section className="flex-1 flex min-h-0">
        <div className="hidden sm:block w-[445px] h-full bg-white border-r border-gray-200 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-0">
            {filteredChats.map((chat, idx) => (
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