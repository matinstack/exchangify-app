"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { handleTitle } from "@/components/application/header/header-titles";

const HeaderTitle = () => {
  const pathname = usePathname();

  const title = handleTitle(pathname);
  return <p>{title}</p>;
};

export default HeaderTitle;
