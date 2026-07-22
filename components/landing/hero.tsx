import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMockup } from "./dashboard-mockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* layered background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid mask-fade" />
        <div className="absolute left-1/2 top-[-8%] size-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px] animate-glow" />
        <div className="absolute left-[12%] top-[30%] size-[320px] rounded-full bg-chart-2/10 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <a
          href="#features"
          className="group mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 py-1 pl-1 pr-3 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 font-medium text-primary">
            <Sparkles className="size-3" />
            New
          </span>
          AI-powered spending insights
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>

        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-gradient sm:text-5xl md:text-6xl">
          The finance workspace that keeps your money on track
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Expensely brings every account, budget, and transaction into one clean
          dashboard — so you always know exactly where your money goes.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button className="h-11 w-full px-6 text-sm shadow-lg shadow-primary/20 sm:w-auto">
            Start tracking for free
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full px-6 text-sm sm:w-auto"
          >
            View live demo
          </Button>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground sm:flex-row sm:gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 rounded-full bg-primary animate-soft-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            No credit card required
          </span>
          <span className="hidden sm:inline text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-current" />
              ))}
            </span>
            Loved by 40,000+ users
          </span>
        </div>

        {/* mockup */}
        <div className="relative mx-auto mt-14 max-w-6xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 -z-10 rounded-[2.5rem] bg-primary/5 blur-3xl"
          />
          <div className="[perspective:2000px]">
            <div className="[transform:rotateX(2deg)]">
              <DashboardMockup />
            </div>
          </div>
          {/* fade bottom into page */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-1 h-24 bg-gradient-to-t from-background to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
