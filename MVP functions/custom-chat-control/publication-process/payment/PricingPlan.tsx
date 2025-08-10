import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PricingPlan {
  id: string;
  price: string;
  title: string;
  features: string[];
  selected: boolean;
}

const AIChatPricing: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PricingPlan[]>([
    {
      id: 'monthly',
      price: '$5',
      title: 'Monthly subscription',
      features: [
        'Publish a public chat',
        'Ability to earn on subscriptions',
        'Statistics and analytics',
        'Priority level support',
        'Cancel at any time'
      ],
      selected: false
    },
    {
      id: 'lifetime',
      price: '$49',
      title: 'Lifetime access',
      features: [
        'One-time payment - forever!',
        'All the features of a monthly subscription',
        'Unlimited term',
        'The best for regular users'
      ],
      selected: false
    }
  ]);

  const selectPlan = (planId: string) => {
    setPlans(prev =>
      prev.map(plan => ({
        ...plan,
        selected: plan.id === planId
      }))
    );
  };

  const handlePurchase = (planId: string) => {
    // Handle purchase logic here
    console.log(`Purchasing plan: ${planId}`);
    navigate(`/${planId}/payment`)
  };

  const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
    return (
      <div 
        className={`relative bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all duration-200 hover:shadow-lg ${
          plan.selected 
            ? 'border-blue-500 shadow-xl' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => selectPlan(plan.id)}
      >
        {/* Price Circle */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{plan.price}</span>
          </div>
        </div>

        {/* Title */}
        <div className="pt-12 pb-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            {plan.title}
          </h3>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-base leading-relaxed">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Buy Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePurchase(plan.id);
          }}
          className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Buy
        </button>

        {/* Selection Indicator */}
        {plan.selected && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Publish your AI chat and earn!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the ability to publish your custom chats and earn on subscriptions of other users
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            All purchases are secure and backed by our satisfaction guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChatPricing;