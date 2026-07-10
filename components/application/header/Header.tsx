import HeaderTitle from "@/components/application/header/HeaderTitle";
import TimeDate from "@/components/application/header/TimeDate";
import Notifications from "@/components/application/header/Notifications";
import UserProfile from "@/components/application/header/UserProfile";
import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";

const Header = async () => {
  const session = await getSession();
  if (!session || !session.user.id) redirect("/auth/login");
  const { name, lastName } = session.user;
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
