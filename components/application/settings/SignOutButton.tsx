"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignOutButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: async () => {
              router.push("/auth/login");
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
