import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ConfigurationBlock: React.FC = () => {
  const aiFoundationOptions = ['ChatGPT', 'Claude', 'Mistral', 'Perplexity ai'];
  const [model, setModel] = useState('ChatGPT');
  const [temperature, setTemperature] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [personality, setPersonality] = useState('');
  const [memory, setMemory] = useState(false);
  const [functions, setFunctions] = useState('');
  const [dataSources, setDataSources] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ model, temperature, systemPrompt, personality, memory, functions, dataSources });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-black text-4xl font-bold text-center mb-6">Configuration block</h2>
      <p className="text-center text-gray-500 mb-8">Create your unique ai foundation using ai constructor.</p>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model:
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {aiFoundationOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature:
          </label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Enter temperature"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            System_prompt:
          </label>
          <input
            type="text"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Enter system prompt"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personality:
          </label>
          <input
            type="text"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            placeholder="Enter personality"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Memory:
          </label>
          <input
            type="checkbox"
            checked={memory}
            onChange={(e) => setMemory(e.target.checked)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Functions:
          </label>
          <input
            type="text"
            value={functions}
            onChange={(e) => setFunctions(e.target.value)}
            placeholder="Enter functions"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data_sources:
          </label>
          <input
            type="text"
            value={dataSources}
            onChange={(e) => setDataSources(e.target.value)}
            placeholder="Enter data sources"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-8">
    <Link
        to={`/create/foundation`}
        className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50"
      >
        Back
      </Link>
    <Link to={"/create/interface"}>
    <button className="px-6 py-2 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600">
      Create
    </button>
    </Link>
    </div>
      </form>
    </div>
  );
};

export default ConfigurationBlock;