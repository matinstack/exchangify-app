"use client";
import { actions } from "@/constants/quick-actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReportABugForm from "./ReportABugForm";

export const QuickActions = () => {
  const [contactSupport, setContactSupport] = useState(false);
  return (
    <>
      <div className="flex gap-5 lg:flex-row flex-col w-full">
        {actions.map((a) => (
          <div
            role="button"
            aria-label={a.action}
            key={a.title}
            className="group hover:cursor-pointer relative h-full overflow-hidden flex flex-col justify-between gap-3 p-6 bg-card border border-border rounded-xl w-full lg:w-[33.33%] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            onClick={() => {
              if (a.action === "Get in touch") {
                setContactSupport(true);
              }
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-16 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="flex justify-center items-center w-16 h-16  border border-border mb-2 rounded-xl bg-primary/10">
              <a.icon className="text-primary h-6 w-6 md:h-9 md:w-9" />
            </div>
            <h5 className="text-xl font-semibold">{a.title}</h5>
            <p>{a.desc}</p>
            <Button
              variant={"ghost"}
              className="w-fit mt-4 border-b brder-border font-semibold"
            >
              {a.action}
            </Button>
          </div>
        ))}
      </div>
      <ReportABugDialog open={contactSupport} setIsOpen={setContactSupport} />
    </>
  );
};

function ReportABugDialog({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Support Ticket</DialogTitle>
          <DialogDescription>
            Submit a support request or bug report
          </DialogDescription>
        </DialogHeader>
        <ReportABugForm />
      </DialogContent>
    </Dialog>
  );
}
