import { Link, useNavigate } from 'react-router-dom';

export default function FoundationTypeChoice() {
  const navigate = useNavigate();

  const handleSelect = (type: 'unique' | 'add') => {
    if (type === 'unique') {
      navigate('/create/foundation');
    } else {
      navigate('/create/add-foundation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto xl:mt-30">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chose the Foundation Type
          </h1>
          <p className="text-lg text-gray-600">
            Chose an ai (foundation) type on the basis of which you will add functionality to your own chat..
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Unique Card */}
        <div
          onClick={() => handleSelect('unique')}
          className="border border-blue-600 rounded-xl p-6 cursor-pointer hover:shadow-lg transition group relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="rotate-45 w-6 h-6 bg-blue-600 border-1 border-white" />
          </div>
          <img
            src="/create.png"
            alt="Unique AI"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Create</h2>
          <p className="text-sm text-gray-600 mb-4">
            The user creates the ai himself using AI Catalog. On the basis of ChatGPT, Claude, Gemini,
            Mistral, Perplexity ai.
          </p>
          <div className="text-left">
            <p className="text-black font-medium">Pros:</p>
            <ul className="text-green-600 text-sm list-disc ml-5">
              <li>Fast</li>
              <li>Essay</li>
            </ul>
            <p className="text-black font-medium mt-2">Cons:</p>
            <ul className="text-red-600 text-sm list-disc ml-5">
              <li>No unique functions</li>
              <li>Low-level of control</li>
            </ul>
          </div>
        </div>

        {/* Add Foundation Card */}
        <div
          onClick={() => handleSelect('add')}
          className=" border border-blue-600 rounded-xl p-6 cursor-pointer hover:shadow-lg transition group relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="rotate-45 w-6 h-6 bg-blue-600 border-1 border-white" />
          </div>
          <img
            src="uniqueness icon.png"
            alt="Add Foundation"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Add Foundation</h2>
          <p className="text-sm text-gray-600 mb-4">The user adds a foundation tailored to user's needs.</p>
          <div className="text-left">
            <p className="text-black font-medium">Pros:</p>
            <ul className="text-green-600 text-sm list-disc ml-5">
              <li>Highly controllable</li>
              <li>Unique functions</li>
            </ul>
            <p className="text-black font-medium mt-2">Cons:</p>
            <ul className="text-red-600 text-sm list-disc ml-5">
              <li>Time-consuming</li>
        <li>Requires expertise</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-12">
        <Link
          to={`/`}
          className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          Back
        </Link>
      </div>
    </div>
    </div>
  );
}