import { Link } from "react-router-dom";
import { Home, Trash2 } from "lucide-react";
import { useState } from "react";
import AvatarOrSignIn from '../../components/AvatarOrSignIn';
import SearchBar from '../../components/SearchBar';


const ProjectCard = ({ name }: { name: string }) => (
  <div className="flex items-center justify-between rounded-md py-3 px-4 hover:bg-gray-50 shadow transition">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
        Ex
      </div>
      <span className="text-gray-800">{name}</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
        Public
      </span>
      <button className="text-red-500 hover:text-red-700 transition">
        <Trash2 size={20} />
      </button>
    </div>
  </div>
);

export default function ProjectsPage() {
  const isSignedIn = false;
  const [search, setSearch] = useState<string>('');
  const [projects] = useState([
    "Chat Example",
    "Chat Example to show margin between two chats",
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex justify-end items-center p-4 border-b border-gray-900">
       <nav className="flex items-center gap-5">
              <AvatarOrSignIn isSignedIn={isSignedIn}/>
              <Link
                to="/home"
                className="text-black p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Go to about page"
              >
                <Home size={20} className="text-black" />
              </Link>
            </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {/* Content Area */}
        <div className="flex-1 py-10 px-40">
          {/* Search and Create */}
          <div className="mb-6 space-y-4">
            <div className="w-full">
                          <SearchBar
                            value={search}
                            onChange={setSearch}
                            aria-label="Search AI chats"
                          /></div>
            <button className="w-full py-2 text-black border border-black rounded-lg font-medium hover:bg-gray-100 transition">
              + Create Chat
            </button>
          </div>

          {/* Chat List */}
          <Link to={`/settings`}><div className="space-y-4">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} name={project} />
            ))}
          </div></Link>
        </div>
      </div>
    </div>
  );
}
