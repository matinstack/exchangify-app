import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMockup } from "./dashboard-mockup";

export function Hero() {
  return (
    <div className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
      >
        <div className="absolute left-1/2 top-[-10%] size-[640px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <a
          href="#features"
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <Sparkles className="size-3.5 text-primary" />
          Smart insights, now powered by AI
          <ArrowRight className="size-3.5" />
        </a>

        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Take control of your money with smarter expense tracking
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Expensely helps you track every expense, manage budgets that actually
          stick, and understand your spending with insights that make sense.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button className="h-11 w-full px-6 text-sm sm:w-auto">
            Start tracking for free
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full px-6 text-sm sm:w-auto"
          >
            View dashboard
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          No credit card required · Free forever plan
        </p>

        {/* mockup */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -top-6 bottom-0 -z-10 rounded-[2rem] bg-primary/5 blur-2xl"
          />
          <DashboardMockup />
        </div>
      </div>
    </div>
  );
}
