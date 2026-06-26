import { GithubIcon, GoogleIcon } from "@/components/shared/SocialIcons";
import { Button } from "@/components/ui/button";
const OAth = () => {
  return (
    <div className={"flex flex-col gap-4 items-center "}>
      <p className="text-sm relative before:absolute before:h-px before:w-32 before:bg-border before:top-1/2 before:right-32 after:absolute after:h-px after:w-32 after:bg-border after:top-1/2 after:-right-35">
        Or continue with
      </p>
      <div className={"flex gap-4"}>
        <Button
          className={"rounded-full border border-border"}
          variant={"ghost"}
          size={"icon-lg"}
          aria-label={"Continue with Github"}
        >
          <GithubIcon className={"size-5"} />
        </Button>
        <Button
          className={"rounded-full border border-border"}
          variant={"ghost"}
          size={"icon-lg"}
          aria-label={"Continue with Google"}
        >
          <GoogleIcon className={"size-5"} />
        </Button>
      </div>
    </div>
  );
};

export default OAth;
