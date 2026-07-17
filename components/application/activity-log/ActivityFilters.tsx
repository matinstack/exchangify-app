"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import DateFilterDropDown from "@/components/shared/DateFilterDropDown";

const ActivityFilters = () => {
  return (
    <>
      <InputGroup className="max-w-72 min-w-60">
        <InputGroupInput placeholder="Search ..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>

      <DateFilterDropDown />
    </>
  );
};

export default ActivityFilters;
