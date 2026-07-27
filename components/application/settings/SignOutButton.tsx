"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SignOutButton = () => {
  return (
    <Button
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: async () => {
              window.location.href = "/";
            },
          },
        });
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
