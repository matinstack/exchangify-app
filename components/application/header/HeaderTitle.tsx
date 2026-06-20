"use client";
import React from "react";
import { usePathname } from "next/navigation";

const HeaderTitle = () => {
  const pathname = usePathname();

  const handleTitle = () => {
    switch (pathname) {
      case "/app/dashboard":
        return "Track all your expenses and transactions";
    }
  };

  const title = handleTitle();
  return <p>{title}</p>;
};

export default HeaderTitle;
