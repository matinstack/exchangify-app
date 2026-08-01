import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignOutButton from "./SignOutButton";
import React from "react";
import { TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const SignOutDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Log out</DialogTitle>
          <Separator />
          <DialogDescription className="flex gap-2 items-center py-3">
            <TriangleAlert className="w-6 h-6 text-warning" />{" "}
            <span> Are you sure you want to logout?</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <DialogClose asChild>
            <Button className="w-[calc(50%_-_6px)]" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <SignOutButton
            text="Sign Out"
            loadingText="Signing out"
            className="w-[calc(50%_-_6px)]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
