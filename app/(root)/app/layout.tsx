import React from "react";
import Sidebar from "@/components/application/sidebar/Sidebar";
import Header from "@/components/application/header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex bg-background min-h-screen `}>
      <aside className={`w-73.75 border-r pt-9`}>
        <Sidebar />
      </aside>
      <div className={`px-9 pt-9 w-full`}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
