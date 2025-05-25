import React from "react";
import { Link } from "react-router-dom";

// Use more specific type for avatarUrl
interface AvatarOrSignInProps {
  isSignedIn: boolean;
  avatarUrl?: string | null;
  fallbackAvatar?: string; // Added for customizable fallback
  className?: string; // Allow custom styling
}

const AvatarOrSignIn: React.FC<AvatarOrSignInProps> = ({
  isSignedIn,
  avatarUrl,
  fallbackAvatar = "/default-avatar.png",
  className = "",
}) => {
  // Consistent styling variables
  const avatarStyles = `w-10 h-10 rounded-full border border-gray-300 object-cover ${className}`;
  const linkStyles = `text-blue-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors ${className}`;

  return isSignedIn ? (
    <img
      src={avatarUrl ?? fallbackAvatar} // Use nullish coalescing for cleaner fallback
      alt="User avatar" // More descriptive alt text
      className={avatarStyles}
      loading="lazy" // Optimize image loading
      onError={(e) => {
        // Fallback on error
        e.currentTarget.src = fallbackAvatar;
      }}
      aria-label="User profile" // Accessibility
    />
  ) : (
    <Link
      to="/signin"
      className={linkStyles}
      aria-label="Sign in to your account" // Accessibility
    >
      Sign In
    </Link>
  );
};

export default AvatarOrSignIn;