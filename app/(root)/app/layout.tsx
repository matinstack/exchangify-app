import React from "react";
import Sidebar from "@/components/application/sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex bg-background min-h-screen `}>
      <aside className={`w-73.75 border-r pt-9`}>
        <Sidebar />
      </aside>
      <main className={`px-9 pt-9`}>{children}</main>
    </div>
  );
};

export default Layout;
