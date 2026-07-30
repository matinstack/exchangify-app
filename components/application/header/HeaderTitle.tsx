"use client";
import { usePathname } from "next/navigation";
import { handleTitle } from "@/components/application/header/header-titles";

const HeaderTitle = () => {
  const pathname = usePathname();

  const title = handleTitle(pathname);
  return <p className="md:text-lg text-sm">{title}</p>;
};

export default HeaderTitle;
