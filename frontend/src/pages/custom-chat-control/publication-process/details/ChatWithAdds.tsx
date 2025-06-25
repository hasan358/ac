import { Link } from "react-router-dom";

export default function ChatWithAds() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-center">
      <div className="flex justify-center">
        <img
          src="/chat-with-adds.png"
          alt="Ads Icon"
          className="w-30 h-30 mb-4 mt-20"
        />
      </div>
      <h1 className="text-3xl font-semibold mb-6">Chat with adds</h1>

      <div className="text-left text-gray-800 space-y-4">
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
        <p>
          Section 1.10.32 of “de Finibus Bonorum et Malorum”, written by Cicero in 45 BC...
        </p>
        <p>
          1914 translation by H. Rackham...
        </p>
        <p>
          "On the other hand, we denounce with righteous indignation..."
        </p>
      </div>

      <div className="mt-10 mb-4 text-black">
          <label className="text-black mr-2">There will be one advertisement every</label>
          <input
            type="text"
            className="text-black p-2 border border-gray-300 rounded-md mr-2"
            placeholder="time"
          />
        minute.
        </div>

      {/* Navigation Buttons */}
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
  );
}
