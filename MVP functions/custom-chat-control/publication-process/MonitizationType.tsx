import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MonetizationType {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  selected: boolean;
}

const MonetizationSelector: React.FC = () => {
  const [monetizationTypes, setMonetizationTypes] = useState<MonetizationType[]>([
    {
      id: 'paid',
      title: 'Paid chat',
      description: 'The user sets the price himself, access to the chat is by subscription or one-time payment.',
      features: [
        'Gives creators direct income.',
        'A simple and intuitive way to monetize.'
      ],
      icon: <img src="/paid-chat.png" className="w-20 h-20 flex-shrink-0" />,
      selected: false
    },
    {
      id: 'ads',
      title: 'Chat with ads',
      description: 'Advertising is introduced into the chat interface, and the user receives a share of the revenue if his chat is popular.',
      features: [
        'Creators can earn money without direct payment from users.'
      ],
      icon: <img src="/chat-with-adds.png" className="w-20 h-20 flex-shrink-0" />,
      selected: false
    },
    {
      id: 'free',
      title: 'Free chat',
      description: 'Access is free for everyone, without advertising or payment.',
      features: [
        'Attracts traffic.',
        'Useful for beginners, enthusiasts, and educational chats.'
      ],
      icon: <img src="/free-chat.png" className="w-20 h-19 flex-shrink-0" />,
      selected: false
    }
  ]);

  const navigate = useNavigate();

  const selectMonetizationType = (id: string) => {
    setMonetizationTypes(prev =>
      prev.map(type => ({
        ...type,
        selected: type.id === id
      }))
    );
  };

  const handleContinue = () => {
    const selectedType = monetizationTypes.find(type => type.selected);
    if (selectedType) {
      if (selectedType.id === 'free') {
        navigate(`/pricing-plan`);
      } else {
        navigate(`/details/${selectedType.id}`);
      }
    }
  };

  const MonetizationCard: React.FC<{ type: MonetizationType }> = ({ type }) => {
    return (
      <div 
        className={`relative bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
          type.selected 
            ? 'border-blue-500 shadow-lg' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => selectMonetizationType(type.id)}
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-600 rounded-full px-6 py-2 flex items-center justify-center">
            <div className="w-3 h-3 bg-white transform rotate-45"></div>
          </div>
        </div>

        <div className="flex justify-center mb-6 mt-4">
          <div className="w-20 h-20 rounded-full border-2 border-gray-200 flex items-center justify-center bg-gray-50">
            {type.icon}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
          {type.title}
        </h3>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Description:</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {type.description}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
          <ul className="space-y-1">
            {type.features.map((feature, index) => (
              <li key={index} className="text-gray-600 text-sm leading-relaxed">
                +{feature}
              </li>
            ))}
          </ul>
        </div>

        {type.selected && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose the Monetization type
          </h1>
          <p className="text-lg text-gray-600">
            Here are 3 ways to monetize that will help you make money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {monetizationTypes.map((type) => (
            <MonetizationCard key={type.id} type={type} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button 
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              monetizationTypes.some(type => type.selected)
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!monetizationTypes.some(type => type.selected)}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonetizationSelector;