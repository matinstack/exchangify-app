import { Suspense } from "react";
import DarkModeToggle from "@/components/shared/dark-mode-toggle";
import NewCategoryForm from "@/components/application/settings/NewCategoryForm";
import NewSubCategoryDialog from "@/components/application/settings/NewSubCategoryDialog";
import SignOutButton from "@/components/application/settings/SignOutButton";
import NewSubCategoryDialogSkeleton from "@/components/application/settings/NewSubCategoryDialogSkeleton";
const SettingsPage = () => {
  return (
    <div>
      SettingsPage
      <DarkModeToggle />
      <NewCategoryForm />
      <Suspense fallback={<NewSubCategoryDialogSkeleton />}>
        <NewSubCategoryDialog />
      </Suspense>
      <SignOutButton />
    </div>
  );
};

export default SettingsPage;
