"use client";
import { authClient } from "@/lib/auth-client";
import DarkModeToggle from "@/components/shared/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import NewCategoryForm from "@/components/application/settings/NewCategoryForm";
const SettingsPage = () => {
  const router = useRouter();
  return (
    <div>
      SettingsPage
      <DarkModeToggle />
      <NewCategoryForm />
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
    </div>
  );
};

export default SettingsPage;
