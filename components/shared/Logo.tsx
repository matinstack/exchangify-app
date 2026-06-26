import Link from "next/link";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
type LogoProps = {
  href: string;
} & ComponentPropsWithoutRef<"a">;

function Logo({ href, className, ...props }: LogoProps) {
  return (
    <Link
      {...props}
      href={href || "/"}
      className={`block w-32 h-8 overflow-hidden ${className}`}
    >
      <Image
        src="/logo-light.svg"
        alt="Expensly logo"
        width={24}
        height={24}
        className="w-full h-full object-contain dark:hidden"
        priority
      />
      <Image
        src="/logo-dark.svg"
        alt=""
        width={24}
        height={24}
        className="w-full h-full object-contain hidden dark:block"
        priority
      />
    </Link>
  );
}

export default Logo;
