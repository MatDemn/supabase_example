import React from "react";
import AuthComponent from "@/components/auth/AuthComponent";
import SidebarLeft from "@/components/sidebar/sidebarLeft";
import ContentHeader from "@/components/content/ContentHeader";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import SidebarRight from "@/components/sidebar/sidebarRight";
import SidebarPremium from "@/components/sidebar/sidebarPremium";
import SidebarRecentArticles from "@/components/sidebar/sidebarRecentArticles";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  return (
    <div className="w-screen h-screen">
      <div className="max-w-7xl mx-auto h-full flex flex-row flex-1 ">
        <div className="">
          <SidebarLeft>
            <AuthComponent />
          </SidebarLeft>
        </div>
        <div className="w-full bg-slate-500 flex-1">
          <ContentHeader />
          {children}
        </div>
        <div>
          <SidebarRight>
            <SidebarPremium />
            <SidebarRecentArticles />
          </SidebarRight>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;