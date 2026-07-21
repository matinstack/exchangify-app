"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

const DateFilterDropDown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dateFilter = searchParams.get("dateFilter") ?? "all";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <CalendarDays />
          <span className="hidden sm:block">
            {dateFilter === "all" && "All Time"}
            {dateFilter === "thisYear" && "YTD"}
            {dateFilter === "3m" && "3M"}
            {dateFilter === "thisMonth" && "1M"}
            {dateFilter === "thisWeek" && "7D"}
            {dateFilter === "today" && "1D"}
          </span>
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
            <TabsTrigger value="today">1D</TabsTrigger>
            <TabsTrigger value="thisWeek">7D</TabsTrigger>
            <TabsTrigger value="thisMonth">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="thisYear">YTD</TabsTrigger>
            <TabsTrigger value="all">
              <Calendar />
              All Time
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateFilterDropDown;
