"use client";
import HeaderTitle from "@/components/application/header/HeaderTitle";
import TimeDate from "@/components/application/header/TimeDate";
import Notifications from "@/components/application/header/Notifications";
import UserProfile from "@/components/application/header/UserProfile";
import { type AuthUser } from "@/types";

type HeaderProps = {
  user: AuthUser;
};
const Header = ({ user }: HeaderProps) => {
  const { name, lastName } = user;
  return (
    <header className={"flex justify-between"}>
      <div>
        <h1 className=" mb-2 text-2xl font-normal">
          Welcome {name} {lastName}. 👋
        </h1>
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
