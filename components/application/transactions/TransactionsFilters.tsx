"use client";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays, Funnel, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const TransactionsFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get("type") ?? "all";
  const dateFilter = searchParams.get("dateFilter") ?? "all";

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <CalendarDays />
            {dateFilter === "all" && "All Time"}
            {dateFilter === "ytd" && "YTD"}
            {dateFilter === "3m" && "3M"}
            {dateFilter === "1m" && "1M"}
            {dateFilter === "7d" && "7D"}
            {dateFilter === "1d" && "1D"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <Tabs
            defaultValue="all"
            onValueChange={(e) => {
              const params = new URLSearchParams(searchParams);

              if (e === "all") {
                params.delete("dateFilter");
                router.replace(`?${params.toString()}`);
              } else {
                params.set("dateFilter", e);
                router.replace(`?${params.toString()}`);
              }
            }}
          >
            <TabsList>
              <TabsTrigger value="1d">1D</TabsTrigger>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="ytd">YTD</TabsTrigger>
              <TabsTrigger value="all">
                <Calendar />
                All Time
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TransactionsFilters;
