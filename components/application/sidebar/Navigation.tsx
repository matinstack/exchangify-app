"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Links = {
  name: string;
  href: string;
  icon: React.ReactNode;
};
type NavigationProps = {
  header: string;
  link: Links[];
  separator?: boolean;
};
const Navigation = ({ header, link, separator = true }: NavigationProps) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className={`mx-6 pb-3 mb-4 ${separator ? "border-b" : ""}`}>
      <p className="text-sm pb-2 font-light text-gray-400">{header}</p>
      <ul className={`flex flex-col gap-2 `}>
        {link.map((link) => (
          <li key={link.name}>
            <Link
              className={`${pathname === link.href && "bg-brand-accent"} transition duration-200 pl-2 hover:bg-brand-accent group py-2 flex gap-3 items-center rounded-xs`}
              href={link.href}
            >
              <span
                className={`transition duration-200 text-brand group-hover:text-foreground`}
              >
                {link.icon}
              </span>
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
