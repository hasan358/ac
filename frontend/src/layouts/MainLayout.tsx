import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-full bg-gray-50">
      {children}
    </div>
  );
};

export default MainLayout;