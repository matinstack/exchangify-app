import { Bug, Rocket, UserRound } from "lucide-react";
import Link from "next/link";

export const QuickActions = () => {
  return (
    <div className="flex gap-5 lg:flex-row flex-col">
      <div className="flex flex-col gap-3 p-6 bg-card border border-border rounded-md">
        <div className="flex  justify-center items-center w-16 h-16 rounded-sm border border-border mb-2">
          <Rocket size={32} />
        </div>
        <h5 className="text-xl font-semibold">Getting Started</h5>
        <p>Browes guides and learn how to get the most out of Expensely.</p>
        <Link
          className="w-fit mt-4 border-b brder-border font-semibold"
          href={"#"}
        >
          Learn more
        </Link>
      </div>
      <div className="flex  flex-col gap-3 p-6 bg-card border border-border rounded-md">
        <div className="flex justify-center items-center w-16 h-16 rounded-sm border border-border mb-2">
          <UserRound size={32} />
        </div>
        <h5 className="text-xl font-semibold">Contact Support</h5>
        <p>Get in touch with our support team for presonalized assistance.</p>
        <Link
          className="w-fit mt-4 border-b brder-border font-semibold"
          href={"#"}
        >
          Get in touch
        </Link>
      </div>
      <div className="flex  flex-col gap-3 p-6 bg-card border border-border rounded-md">
        <div className="flex justify-center items-center w-16 h-16 rounded-sm border border-border mb-2">
          <Bug size={32} />
        </div>
        <h5 className="text-xl font-semibold">Report a Bug</h5>
        <p>Found an assue? Let us know so we can fix it quickly.</p>
        <Link
          className="w-fit mt-4 border-b brder-border font-semibold"
          href={"#"}
        >
          Report
        </Link>
      </div>
    </div>
  );
};
