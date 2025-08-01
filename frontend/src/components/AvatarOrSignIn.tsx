import React from "react";
import { Link } from "react-router-dom";

interface AvatarOrSignInProps {
  isSignedIn: boolean;
  avatarUrl?: string;
}

const AvatarOrSignIn: React.FC<AvatarOrSignInProps> = ({ isSignedIn, avatarUrl }) => {
  return isSignedIn ? (
    <img
      src={avatarUrl || "/user-avatar.png"}
      alt="User"
      className="w-10 h-10 rounded-full border border-gray-300"
    />
  ) : (
    <Link
      to="/login"
      className="font-semibold whitespace-nowrap px-4 py-2 border border-black rounded-lg"
    >
       <span className="text-black">Log In</span>
    </Link>
  );
};

export default AvatarOrSignIn;