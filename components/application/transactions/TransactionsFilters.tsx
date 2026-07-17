"use client";

import { Button } from "@/components/ui/button";
import { Funnel, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import DateFilterDropDown from "@/components/shared/DateFilterDropDown";

const TransactionsFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get("type") ?? "all";

  return (
    <>
      <InputGroup className="max-w-72 min-w-60">
        <InputGroupInput placeholder="Search ..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            {filter === "all" && (
              <>
                <Funnel />
                Filter
              </>
            )}
            {filter === "expense" && (
              <>
                <Funnel className="fill-background" />
                Expenses
              </>
            )}
            {filter === "income" && (
              <>
                <Funnel className="fill-background" />
                Incomes
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
                router.replace(`?${params.toString()}`);
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
      <DateFilterDropDown />
    </>
  );
};

export default TransactionsFilters;
