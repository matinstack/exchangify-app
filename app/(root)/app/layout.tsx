import React, { Suspense } from "react";
import Sidebar from "@/components/application/sidebar/Sidebar";
import Header from "@/components/application/header/Header";
import Logo from "@/components/shared/Logo";
import HeaderSkeleton from "@/components/application/header/HeaderSkeleton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-73.75 border-r flex flex-col">
        <div className="ml-6 pt-7 mb-9 shrink-0">
          <Logo href="/app/dashboard" />
        </div>

        <div className="flex-1 overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-9 pt-7 shrink-0">
          <Suspense fallback={<HeaderSkeleton />}>
            <Header />
          </Suspense>
        </div>

        <main className="flex-1 overflow-y-auto px-9">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
