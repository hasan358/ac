import React from "react";
import { Filter } from "lucide-react";

interface FilterButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  iconSize?: number;
  isActive?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  className = "",
  iconSize = 18,
  isActive = false,
  onKeyDown,
  icon = <Filter size={iconSize} aria-hidden="true" />,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`p-2 rounded-lg border border-gray-300 ${
        isActive ? "bg-blue-100 border-blue-500" : "bg-white hover:bg-gray-100"
      } ${className}`}
      aria-label={isActive ? "Close filters" : "Open filters"}
      aria-pressed={isActive}
    >
      {icon}
    </button>
  );
};

export default React.memo(FilterButton);