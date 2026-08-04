import { Suspense } from "react";
import DarkModeToggle from "@/components/shared/dark-mode-toggle";
import NewCategoryForm from "@/components/application/settings/NewCategoryForm";
import NewSubCategoryDialog from "@/components/application/settings/NewSubCategoryDialog";
import NewSubCategoryDialogSkeleton from "@/components/application/settings/NewSubCategoryDialogSkeleton";
import { SettingWrapper } from "./SettingWrapper";
import { Button } from "@/components/ui/button";
import { SignOutDialog } from "./SignOutDialog";
import ToggleCurrency from "./ToggleCurrency";
export const Settings = () => {
  return (
    <div className="flex flex-col gap-14 justify-center items-center py-8">
      <SettingWrapper
        title="Appearance"
        subTitle="Choose your preferred theme for the application."
      >
        <DarkModeToggle />
      </SettingWrapper>
      <SettingWrapper
        title="Currency"
        subTitle="You can change your currency here. this will be effact only on your dashboard"
      >
        <Suspense fallback={<p>Loading ...</p>}>
          <ToggleCurrency />
        </Suspense>
      </SettingWrapper>
      <SettingWrapper
        title="Categories"
        subTitle="Create, edit, or remove categories to organize your transactions."
      >
        <NewCategoryForm />
      </SettingWrapper>
      <SettingWrapper
        title="Subcategories"
        subTitle="Manage subcategories to better classify your income and expenses."
      >
        <Suspense fallback={<NewSubCategoryDialogSkeleton />}>
          <NewSubCategoryDialog />
        </Suspense>
      </SettingWrapper>
      <SettingWrapper
        destructive
        title="Sign Out"
        subTitle="Sign out securely from your account on this device."
      >
        <SignOutDialog
          trigger={<Button variant="destructive">Sign Out</Button>}
        />
      </SettingWrapper>
    </div>
  );
};
