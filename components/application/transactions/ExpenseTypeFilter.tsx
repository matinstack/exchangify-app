"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Funnel } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const ExpenseTypeFilter = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get("type") ?? "all";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isPending}>
          {filter === "all" && (
            <>
              <Funnel />
              <span className="hidden sm:block">Filter</span>
            </>
          )}
          {filter === "expense" && (
            <>
              <Funnel className="fill-background" />
              <span className="hidden sm:block">Expenses</span>
            </>
          )}
          {filter === "income" && (
            <>
              <Funnel className="fill-background" />
              <span className="hidden sm:block">Incomes</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select A Filter</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={filter}
            onValueChange={(val) => {
              const params = new URLSearchParams(searchParams);

              if (val === "all") {
                params.delete("type");
              } else {
                params.set("type", val);
              }
              startTransition(() => {
                router.replace(`?${params.toString()}`);
              });
            }}
          >
            <DropdownMenuRadioItem value={"all"}>All</DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="expense">
              Expenses
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="income">
              Incomes
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
