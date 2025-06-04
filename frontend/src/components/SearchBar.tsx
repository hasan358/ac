import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconSize?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  inputClassName = "",
  iconSize = 18,
  onKeyDown,
  onFocus,
  onBlur,
}) => {
  return (
    <div 	className="relative w-[440px]">
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <Search
        className="absolute left-3 top-3 text-gray-400"
        size={iconSize}
        aria-hidden="true"
      />
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
        aria-label={placeholder}
      />
    </div>
  );
};

export default React.memo(SearchBar);