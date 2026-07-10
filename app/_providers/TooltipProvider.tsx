import { TooltipProvider as ShadcnTooltipProvider } from "@/components/ui/tooltip";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <ShadcnTooltipProvider>{children}</ShadcnTooltipProvider>;
};

export default TooltipProvider;
