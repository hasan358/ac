import React from "react";

interface ChatCardProps {
  title?: string;
  description?: string;
  logoUrl: string;
  className?: string;
  imgClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  fallbackLogoUrl?: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const ChatCard: React.FC<ChatCardProps> = ({
  title = "Untitled",
  description = "No description available",
  logoUrl,
  className = "",
  imgClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  fallbackLogoUrl = "/default-logo.png",
  onClick,
  onKeyDown,
}) => {
  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-gray-200 ${onClick ? "cursor-pointer" : ""} ${className}`}
      role={onClick ? "button" : "article"}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={onClick ? `Open chat ${title}` : undefined}
    >
      <div className="flex items-center gap-3">
        <img
          src={logoUrl}
          alt={`Logo for ${title}`}
          className={`w-10 h-10 rounded-full ${imgClassName}`}
          onError={(e) => (e.currentTarget.src = fallbackLogoUrl)}
        />
        <div>
          <h3 className={`text-md font-semibold ${titleClassName}`}>
            {title}
          </h3>
          <p className={`text-sm text-gray-500 line-clamp-2 ${descriptionClassName}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatCard);