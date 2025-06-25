import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaidChatDetails: React.FC = () => {
  const [cost, setCost] = useState('');


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
<img src="/paid-chat.png" className="w-30 h-30 flex-shrink-0" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Paid chat</h1>
        <p className="text-gray-600 mb-4">Description: The user sets the price himself, access to the chat is by subscription or one-time payment.</p>
        <ul className="text-gray-600 mb-4 list-disc list-inside">
          <li>Gives creators direct income.</li>
          <li>A simple and intuitive way to monetize.</li>
        </ul>
        <div className="mb-4">
          <label className="text-black mr-2">Put the Cost:</label>
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="text-black p-2 border border-gray-300 rounded-md"
            placeholder="$/month"
          />
        </div>
       <div className="flex gap-4 mt-8 ml-135">
         <Link
           to={`/chat/monitization`}
           className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
         >
           Back
         </Link>
         <Link to={`/pricing-plan`}>
           <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
             Select
           </button>
         </Link>
       </div>
      </div>
    </div>
  );
};

export default PaidChatDetails;