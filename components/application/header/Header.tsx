"use client";
import HeaderTitle from "@/components/application/header/HeaderTitle";
import TimeDate from "@/components/application/header/TimeDate";
import Notifications from "@/components/application/header/Notifications";
import UserProfile from "@/components/application/header/UserProfile";

type HeaderProps = {
  userName?: string;
};
const Header = ({ userName = "Matin" }: HeaderProps) => {
  return (
    <header className={"flex justify-between"}>
      <div>
        <h1 className=" mb-2 text-2xl font-normal">Welcome {userName} 👋</h1>
        <HeaderTitle />
      </div>
      <div className={"flex gap-24"}>
        <TimeDate />
        <div className={"flex gap-8"}>
          <Notifications />
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
