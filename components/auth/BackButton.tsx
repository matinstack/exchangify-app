import React from "react";
import Link from "next/link";

type BackButtonProps = {
  href: string;
  hrefTitle: string;
  title: string;
};

const BackButton = ({ href, hrefTitle, title }: BackButtonProps) => {
  return (
    <div className={"flex gap-1 text-sm py-4 justify-center"}>
      <span>{title}</span>
      <Link href={href} className={"text-brand font-normal"}>
        {hrefTitle}
      </Link>
    </div>
  );
};

export default BackButton;
