import Link from "next/link";
import { actions } from "@/constants/quick-actions";

export const QuickActions = () => {
  return (
    <div className="flex gap-5 lg:flex-row flex-col w-full">
      {actions.map((a) => (
        <div
          key={a.title}
          className="group relative h-full overflow-hidden flex flex-col justify-between gap-3 p-6 bg-card border border-border rounded-xl w-full lg:w-[33.33%] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
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
          <Link
            className="w-fit mt-4 border-b brder-border font-semibold"
            href={a.to}
          >
            {a.action}
          </Link>
        </div>
      ))}
    </div>
  );
};
