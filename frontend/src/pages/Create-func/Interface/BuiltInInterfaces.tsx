import { Link, useNavigate } from 'react-router-dom';

export default function BuiltInInterfaces() {
  const navigate = useNavigate();

  const handleSelect = (type: 'built-in' | 'add' | 'custom') => {
    if (type === 'built-in') {
      navigate('/create/final-step');
    } else if (type === 'add') {
      navigate('/create/final-step');
    } else {
      navigate('/create/final-step'); // Adjust this route as needed
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center text-center">
      <h1 className="text-black text-5xl font-semibold mb-8">Choose the Interface</h1>
      <p className="text-gray-600 mb-10">
        Here is a list of the main interfaces that we can offer as templates when creating a chat.
      </p>

      {/* Grid for the first two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Built-in Interfaces Card */}
        <div
          onClick={() => handleSelect('built-in')}
          className="mt-10 border border-blue-600 rounded-xl p-6 cursor-pointer hover:shadow-lg transition group relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="rotate-45 w-6 h-6 bg-blue-600 border-1 border-white" />
          </div>
          <img
            src="/classic-chat.png"
            alt="Unique AI"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h2 className="text-black text-xl font-bold mb-2">Classic chat</h2>
          <p className="text-sm text-gray-600 mb-4">
            The usual chat style, as in Telegram, WhatsApp, ChatGPT.Usage: Universal assistant, AI friend, translator, teacher, etc.
          </p>
          <div className="text-left">
            <p className="text-black font-medium">Features:</p>
            <ul className="text-black text-sm list-disc ml-5">
              <li>Messages in the form of "bubbles"</li>
              <li>Support for text, links, emojis</li>
            </ul>
            <p className="text-black font-medium mt-2">Usage:</p>
            <ul className="text-black text-sm list-disc ml-5">
              <li> Universal assistant</li>
              <li>AI friend</li>
              <li> Translator,teacher, ect</li>
            </ul>
          </div>
        </div>

        {/* Add Interface Card */}
        <div
          onClick={() => handleSelect('add')}
          className="mt-10 border border-blue-600 rounded-xl p-6 cursor-pointer hover:shadow-lg transition group relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="rotate-45 w-6 h-6 bg-blue-600 border-1 border-white" />
          </div>
          <img
            src="/modal-response.png"
            alt="Add Foundation"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h2 className="text-black text-xl font-bold mb-2">Modal response</h2>
          <p className="text-sm text-gray-600 mb-4">
            The response opens in a separate window (model), for example, when clicked.
          </p>
          <div className="text-left">
            <p className="text-black font-medium">Features:</p>
            <ul className="text-black text-sm list-disc ml-5">
              <li> Detailed information</li>
              <li>Steps according to the instructions, step-by-step actions</li>
            </ul>
            <p className="text-black font-medium mt-2">Usage:</p>
            <ul className="text-black text-sm list-disc ml-5">
              <li>Tutorials</li>
              <li>Step explanations</li>
              <li>Detailed hints</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Third Card (Below the Grid) */}
      <div className="w-full max-w-md mt-6">
        <div
          onClick={() => handleSelect('custom')}
          className="border border-blue-600 rounded-xl p-6 cursor-pointer hover:shadow-lg transition group relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="rotate-45 w-6 h-6 bg-blue-600 border-1 border-white" />
          </div>
          <img
            src="/push-button.png"
            alt="Custom Interface"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h2 className="text-black text-xl font-bold mb-2">Push-button interface</h2>
          <p className="text-sm text-gray-600 mb-4">
           The user interacts with the AI through buttons or options.
          </p>
          <div className="text-left">
            <p className="text-black font-medium">Features:</p>
            <ul className="text-black text-sm list-disc ml-5">
              <li>Simple interface (no text input)</li>
              <li>Quick responses or choices</li>
            </ul>
            <p className="text-black font-medium mt-2">Usage:</p>
            <ul className="text-black text-sm list-disc ml-5">
              <li>Quiz bots</li>
              <li>Meditation</li>
              <li>Training, Advice, coaching</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-10">
        <Link
          to="/create/interface"
          className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          Back
        </Link>
      </div>
    </div>
  );
}