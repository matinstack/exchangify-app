import HeaderTitle from "@/components/application/header/HeaderTitle";
import TimeDate from "@/components/application/header/TimeDate";
import Notifications from "@/components/application/header/Notifications";
import UserProfile from "@/components/application/header/UserProfile";
import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import MobileSidebar from "@/components/application/header/MobileSidebar";
import Logo from "@/components/shared/Logo";

const Header = async () => {
  // const session = await getSession();
  // if (!session || !session.user.id) redirect("/auth/login");
  // const { name, lastName } = session.user;
  return (
    <header className={"flex justify-between items-center md:py-5 py-3 px-8"}>
      <div>
        <div className="block md:hidden">
          <Logo href={"/"} />
        </div>
        <div className=" md:mt-0 hidden md:space-y-2 md:block">
          <h1 className="hidden md:block   text-lg md:text-2xl font-normal">
            {/*Welcome {name} {lastName} 👋*/}
          </h1>
          <HeaderTitle />
        </div>
      </div>
      <div className={"gap-18 flex items-center"}>
        <TimeDate />
        <div className={"flex gap-3 sm:gap-5"}>
          <Notifications />
          <UserProfile />
          <div className="ml-2 sm:ml-0">
            <MobileSidebar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
