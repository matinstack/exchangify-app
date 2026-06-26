import React from "react";
import Logo from "@/components/shared/Logo";

const Header = ({ title, subTitle }: { title: string; subTitle?: string }) => {
  return (
    <header className={"flex flex-col mb-6 gap-6"}>
      {/*<Logo className={""} href={"/auth/register"} />*/}
      <div className={"flex flex-col gap-2"}>
        <h1
          className={
            "text-3xl font-light tracking-tighter bg-linear-to-r from-brand via-purple-500 to-pink-500 bg-clip-text text-transparent"
          }
        >
          {title}
        </h1>
        {subTitle && <p className={"text-foreground/75 text-sm"}>{subTitle}</p>}
      </div>
    </header>
  );
};
export default Header;
