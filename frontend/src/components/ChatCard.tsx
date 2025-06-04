import React from "react";

interface ChatCardProps {
  title: string;
  description: string;
  logoUrl: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ title, description, logoUrl }) => {
  return (
    <div className="bg-white shadow-sm hover:shadow-md w-[455px] h-[125px]">
      <div className="flex items-center gap-5 px-5 py-9">
        <img
          src={logoUrl}
          alt={title}
          className="w-12 h-12 rounded-full border border-gray-300 object-cover"
        />
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      {false && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default ChatCard;