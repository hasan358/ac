import { Link, useNavigate } from 'react-router-dom';

export default function InterfaceTypeChoice() {
  const navigate = useNavigate();

  const handleSelect = (type: 'built-in' | 'add') => {
    if (type === 'built-in') {
      navigate('/create/built-in/interfaces');
    } else {
      navigate('/create/add-interface');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center text-center">
      <h1 className="text-black text-5xl font-semibold mb-8 mr-85">Chose the Interface Type</h1>
      <p className="text-gray-600 mb-10 mr-65">
Chose an ai interface type on basis of which you will create interface for your own chat.      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Unique Card */}
        <div
          onClick={() => handleSelect('built-in')}
          className="mt-10 border border-blue-600 rounded-xl p-20 cursor-pointer hover:shadow-lg transition group relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="rotate-45 w-6 h-6 bg-blue-600 border-1 border-white" />
          </div>
          <img
            src="/crete_interface icon.png"
            alt="Unique AI"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h2 className="text-black text-xl font-bold mb-2">Built-in Interfaces</h2>
          <p className="text-sm text-gray-600 mb-4">
           In AI Catalog, there are 3 built-in types of interfaces that user can use to create chat, such as  Classic chat interface, Model response interface and push-button interface
          </p>
          <div className="text-left">
            <p className="text-black font-medium">Pros:</p>
            <ul className="text-green-600 text-sm list-disc ml-5">
              <li>Fast</li>
              <li>Essay</li>
            </ul>
            <p className="text-black font-medium mt-2">Cons:</p>
            <ul className="text-red-600 text-sm list-disc ml-5">
              <li>Not fully customizable</li>
              <li>Not unique </li>
            </ul>
          </div>
        </div>

        {/* Add Foundation Card */}
        <div
          onClick={() => handleSelect('add')}
          className="mt-10 border border-blue-600 rounded-xl p-20 cursor-pointer hover:shadow-lg transition group relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="rotate-45 w-6 h-6 bg-blue-600 border-1 border-white" />
          </div>
          <img
            src="/uniqueness icon.png"
            alt="Add Foundation"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h2 className="text-black text-xl font-bold mb-2">Add Interface</h2>
          <p className="text-sm text-gray-600 mb-4">The user adds a fully customized interface tailored to user's needs.</p>
          <div className="text-left">
            <p className="text-black font-medium">Pros:</p>
            <ul className="text-green-600 text-sm list-disc ml-5">
              <li>Highly customizable</li>
              <li>Unique design</li>
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
      <div className="ml-200 mt-10">
        <Link
          to={`/create/foundation`}
          className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          Back
        </Link>
      </div>
    </div>
  );
}