"use client";

import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import DateFilterDropDown from "@/components/shared/DateFilterDropDown";
import { ExpenseTypeFilter } from "./ExpenseTypeFilter";

const TransactionsFilters = () => {
  return (
    <>
      <InputGroup className="max-w-72 min-w-50">
        <InputGroupInput placeholder="Search ..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <ExpenseTypeFilter />
      <DateFilterDropDown />
    </>
  );
};

export default TransactionsFilters;
