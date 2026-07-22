import {
  Receipt,
  Lightbulb,
  BarChart3,
  Tags,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { Reveal } from "./reveal";

const features = [
  {
    icon: Receipt,
    title: "Track expenses effortlessly",
    desc: "Log purchases in seconds or let Expensely auto-import transactions and categorize them for you.",
  },
  {
    icon: Lightbulb,
    title: "Smart spending insights",
    desc: "Get personalized nudges that spot overspending trends before they become a problem.",
  },
  {
    icon: BarChart3,
    title: "Beautiful analytics dashboard",
    desc: "Visualize income, spending, and net worth with clean, interactive charts you actually enjoy.",
  },
  {
    icon: Tags,
    title: "Category management",
    desc: "Organize every transaction with flexible categories, tags, and budgets that fit your life.",
  },
  {
    icon: ShieldCheck,
    title: "Secure financial data",
    desc: "Bank-grade 256-bit encryption and read-only connections keep your money data private.",
  },
  {
    icon: CreditCard,
    title: "Multiple accounts & cards",
    desc: "Connect every bank, card, and wallet to see your complete financial picture in one place.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade-b opacity-60"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            Features
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything you need to master your money
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Powerful tools wrapped in a calm, intuitive interface — so managing
            finances finally feels good.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="relative flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="size-5" />
                </span>
                <h3 className="relative mt-5 text-base font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
