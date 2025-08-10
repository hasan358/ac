import { Link, useNavigate } from 'react-router-dom';

export default function FoundationTypeChoice() {
  const navigate = useNavigate();

   const handleSelect = (type: 'fast' | 'advanced') => {
    if (type === 'fast') {
      navigate('/create/fast-mode/ai-type');
    } else {
      navigate('/create/advanced-mode/config-block');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto xl:mt-30">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chose the Mode
          </h1>
          <p className="text-lg text-gray-600">
            Chose the mode which you will use while creating your unique ai
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Unique Card */}
        <div
          onClick={() => handleSelect('fast')}
          className="border border-blue-600 rounded-xl p-6 cursor-pointer hover:shadow-lg transition group relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="rotate-45 w-6 h-6 bg-blue-600 border-1 border-white" />
          </div>
          <img
            src="/create/fast-mode.png"
            alt="Unique AI"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Fast Mode</h2>
          <p className="text-sm text-gray-600 mb-4">
             For whom: Beginners
          </p>
          <p className="text-sm text-gray-600 mb-4">
             Interface: Step-by-step questions about ai that you want to create
          </p>
          <div className="text-left">
            <p className="text-black font-medium">Pros:</p>
            <ul className="text-green-600 text-sm list-disc ml-5">
              <li>Easier</li>
            </ul>
            <p className="text-black font-medium mt-2">Cons:</p>
            <ul className="text-red-600 text-sm list-disc ml-5">
              <li>Less controllable</li>
            </ul>
          </div>
        </div>

        {/* Add Foundation Card */}
        <div
          onClick={() => handleSelect('advanced')}
          className=" border border-blue-600 rounded-xl p-6 cursor-pointer hover:shadow-lg transition group relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="rotate-45 w-6 h-6 bg-blue-600 border-1 border-white" />
          </div>
          <img
            src="/create/advanced-mode.png"
            alt="Add Foundation"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6"> Advanced Mode</h2>
          <p className="text-sm text-gray-600 mb-4">For whom: Experienced users</p>
          <p className="text-sm text-gray-600 mb-4">Interface: Configuration block + visualization </p>
          <div className="text-left">
            <p className="text-black font-medium">Pros:</p>
            <ul className="text-green-600 text-sm list-disc ml-5">
              <li>More controllable</li>
            </ul>
            <p className="text-black font-medium mt-2">Cons:</p>
            <ul className="text-red-600 text-sm list-disc ml-5">
              <li>Requires more knowledge about ai</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-12">
        <Link
          to={`/create`}
          className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          Back
        </Link>
      </div>
    </div>
    </div>
  );
}