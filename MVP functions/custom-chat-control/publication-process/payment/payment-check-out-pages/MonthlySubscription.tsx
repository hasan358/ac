import React from 'react';
import { Link } from 'react-router-dom';

const MonthlyPayment: React.FC = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Тёмная волна сверху */}
      <div className="relative bg-gradient-to-br from-black to-gray-800 h-48 px-12 flex items-center">
        <h1 className="text-4xl text-white font-semibold">Monthly subscription</h1>
      </div>

      {/* Секция оплаты */}
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <h2 className="text-2xl text-black font-semibold mb-2">$5/month</h2>

        <form className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name on the card
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Validity period
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              type="password"
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Link to={`/chats`}>
             <button
              type="submit"
              className="px-8 py-2 rounded-xl bg-black text-white hover:bg-gray-900"
             >
              Buy
             </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonthlyPayment;