import React from "react";
import Sidebar from "@/components/application/sidebar/Sidebar";
import Header from "@/components/application/header/Header";
import Logo from "@/components/shared/Logo";
import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  return (
    <div className={`flex bg-background min-h-screen `}>
      <aside className={`w-73.75 border-r pt-7`}>
        <div className={"ml-6 mb-9"}>
          <Logo href={"/app/dashboard"} />
        </div>
        <Sidebar />
      </aside>
      <div className={`px-9 pt-7 w-full`}>
        <Header user={session.user} />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
