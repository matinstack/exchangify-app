import React, { Suspense } from "react";
import Sidebar from "@/components/application/sidebar/Sidebar";
import Header from "@/components/application/header/Header";
import Logo from "@/components/shared/Logo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex bg-background min-h-screen `}>
      <aside className={`w-73.75 border-r pt-7`}>
        <div className={"ml-6 mb-9"}>
          <Logo href={"/app/dashboard"} />
        </div>
        <Sidebar />
      </aside>
      <div className={`px-9 pt-7 w-full`}>
        <Suspense fallback={"Loading"}>
          <Header />
        </Suspense>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
