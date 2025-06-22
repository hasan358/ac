import { Link, useParams } from "react-router-dom";
import { Star, Home } from "lucide-react";
import AvatarOrSignIn from "../../components/AvatarOrSignIn";
import { useEffect, useState } from "react";

interface ChatSettingsPage {
  name: string;
  logo: string; // could be a URL or base64
  isPublic: boolean;
  description: string;
  foundation: string;
  interfaceType: string;
  monetizationType: string;
}
interface RatingItem {
  id: number;
  rating: number;
  count: number;
}

export default function ChatSettingsPage() {
  const { chatId } = useParams();
  const isSignedIn = false;
  const [chat, setChat] = useState<ChatSettingsPage | null>(null);
  const [ratings, setRatings] = useState<RatingItem[]>([
    { id: 10, rating: 10, count: 22390 },
    { id: 9, rating: 9, count: 22390 },
    { id: 8, rating: 8, count: 22390 },
    { id: 7, rating: 7, count: 22390 },
    { id: 6, rating: 6, count: 22390 },
    { id: 5, rating: 5, count: 22390 },
    { id: 4, rating: 4, count: 22390 },
    { id: 3, rating: 3, count: 22390 },
    { id: 2, rating: 2, count: 22390 },
    { id: 1, rating: 1, count: 22390 },
  ]);
  const [overallRating] = useState<number>(10);
  const [commentCount] = useState<string>("30k");
   const StarRating: React.FC<{ rating: number; onRatingChange: (rating: number) => void }> = ({ 
    rating, 
    onRatingChange 
  }) => {
    return (
      <div className="flex items-center">
        <Star 
          className={`w-5 h-5 cursor-pointer transition-colors ${
            rating > 0 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => onRatingChange(rating > 0 ? 0 : 1)}
        />
      </div>
    );
  };
   const updateRating = (id: number, newRating: number) => {
    setRatings(prev => 
      prev.map(item => 
        item.id === id ? { ...item, rating: newRating } : item
      )
    );
  };
  const RatingBar: React.FC<{ rating: number; maxRating: number }> = ({ rating, maxRating }) => {
    const percentage = (rating / maxRating) * 100;
    
    return (
      <div className="flex-1 mx-4">
        <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
          <div 
            className="bg-yellow-400 h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };


  useEffect(() => {
    // Здесь ты можешь подключиться к backend и получить данные по chatId
    // Пока используется мок
    setChat({
      name: "Chat example",
      logo: "Ex",
      isPublic: true,
      description: "tttttttttttttttttttttttttttttttttttttttt\ntttttttttttttttttttttttttttttttttttttttt\ntttttttttttttttttttttttttttttttttttttttt\ntttttttttttttttttttttttttttttttttttttttt",
      foundation: "ChatGPT",
      interfaceType: "Classic chat",
      monetizationType: "Paid chat",
    });
  }, [chatId]);

  if (!chat) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-end items-center p-4 border-b border-gray-900">
        <nav className="flex items-center gap-5">
          <AvatarOrSignIn isSignedIn={isSignedIn} />
          <Link
            to="/home"
            className="text-black p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Go to about page"
          >
            <Home size={20} className="text-black" />
          </Link>
        </nav>
      </div>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 pb-4 w-full">
          <img
            src="/ai-logo-placeholder.png"
            alt={chat.name}
            className="w-12 h-12 flex-shrink-0"
          />
          <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
            {chat.name}
          </h1>
          <div className="flex justify-end gap-4 flex-1">
            <Link
              to={`/chat/${chatId}`}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            >
              Test
            </Link>
          </div>
        </div>
        <hr className="border border-gray-900 w-full mb-30" />
        <p className="text-black text-4xl ml-70">Settings</p>
        <div className="flex justify-between border-b py-2">
          <span className="text-black text-2xl font-medium">Name :</span>
          <span className="text-black bg-gray-100 px-4 py-1 rounded-md">{chat.name}</span>
        </div>
        <hr className="border border-gray-300 w-full" />

        <div className="flex justify-between items-center border-b py-2">
          <span className="text-black text-2xl font-medium">Logo:</span>
          <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
            {chat.logo}
          </div>
        </div>
        <hr className="border border-gray-300 w-full" />

        <div className="flex justify-between border-b py-2 items-start">
          <span className="text-black text-2xl font-medium pt-1">Description:</span>
          <div className="text-black bg-gray-100 p-3 rounded-md whitespace-pre-wrap">
            {chat.description}
          </div>
        </div>
        <hr className="border border-gray-300 w-full" />

        <div className="flex justify-between border-b py-2">
          <span className="text-black text-2xl font-medium">Foundation :</span>
          <span className="text-black bg-gray-100 px-4 py-1 rounded-md">{chat.foundation}</span>
        </div>
        <hr className="border border-gray-300 w-full" />

        <div className="flex justify-between border-b py-2">
          <span className="text-black text-2xl font-medium">Interface type :</span>
          <span className="text-black bg-gray-100 px-4 py-1 rounded-md">{chat.interfaceType}</span>
        </div>
          {chat.isPublic ? (
         <div className="flex-1 p-8">
          <div className="max-w-4xl">
            {/* Rating Indicator Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Rating indicator:</h2>
              
              <div className="space-y-6">
                {ratings.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-8 text-right font-medium text-gray-700">
                      {item.id}
                    </div>
                    
                    <div className="ml-4">
                      <StarRating 
                        rating={item.rating > 0 ? 1 : 0}
                        onRatingChange={(newRating) => updateRating(item.id, newRating)}
                      />
                    </div>
                    
                    <RatingBar rating={item.rating} maxRating={10} />
                    
                    <div className="w-20 text-right font-medium text-gray-700">
                      {item.count.toLocaleString()}
                    </div>
                  </div>
                ))}
                
                {/* Overall Rating */}
                <div className="flex items-center pt-4 border-t border-gray-200">
  <div className="text-right font-medium text-gray-700 mr-4">
    Overall:
  </div>
  
  <div className="flex items-center space-x-1">
    <span className="font-semibold text-gray-900">{overallRating}</span>
    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
  </div>
</div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">The number of comments:</h2>
                <div className="text-3xl font-bold text-gray-900">{commentCount}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8 ml-35">Subscription validaty period</h2>
              
              <div className="space-y-6">
                  <div className="flex items-center">
                    <img
    src="/sub-validity-period.png"
    className="w-100 h-100 ml-23"
  />
                    </div>
                
                {/* Overall Rating */}
                <div className="flex items-center pt-4 border-t border-gray-200">
  <div className="text-right font-medium text-gray-700 mr-4">
The day of subscription registration:
  </div>
  
  <div className="flex items-center space-x-1">
    <span className="font-semibold text-gray-900">DD/MM/YYYY</span>
  </div>
</div>
<div className="flex items-center pt-4 border-t border-gray-200">
  <div className="text-right font-medium text-gray-700 mr-4">
The end date of the subscription period:
  </div>
  
  <div className="flex items-center space-x-1">
    <span className="font-semibold text-gray-900">DD/MM/YYYY</span>
  </div>
</div>
              </div>
            </div>
          </div>
          </div>):(
            <p></p>
          )}
      </div>
    </div>
  );
}
