import React from "react";
import AuthComponent from "@/components/auth/AuthComponent";
import { Toaster } from "sonner";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-full flex-1">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;