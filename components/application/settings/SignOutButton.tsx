"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { ComponentPropsWithoutRef, useTransition } from "react";

type Props = {
  text: string;
  loadingText: string;
} & ComponentPropsWithoutRef<"button">;

const SignOutButton = ({ text, loadingText, ...props }: Props) => {
  const [isPending, startTransition] = useTransition();
  const handleSignOut = async () => {
    startTransition(() => {
      authClient.signOut({
        fetchOptions: {
          onSuccess: async () => {
            window.location.href = "/";
          },
        },
      });
    });
  };
  return (
    <Button
      {...props}
      variant={"destructive"}
      disabled={isPending}
      onClick={handleSignOut}
    >
      {isPending && `${loadingText} ${(<Spinner />)}`}

      {!isPending && `${text}`}
    </Button>
  );
};

export default SignOutButton;
