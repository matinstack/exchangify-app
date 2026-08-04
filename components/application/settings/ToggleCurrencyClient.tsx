"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Currency } from "./ToggleCurrency";
import { changeCurrency } from "@/actions/settings";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
const currencies = [
  { name: "USD", code: "USD" },
  { name: "EUR", code: "EUR" },
  { name: "IRR", code: "IRR" },
] as const;
const ToggleCurrencyClient = ({ currentCurrency }: Currency) => {
  const [isPending, startTransition] = useTransition();
  const [newCurrency, setNewCurrency] =
    useState<(typeof currencies)[number]["code"]>(currentCurrency);

  const handleChangeCurrency = (code: "USD" | "EUR" | "IRR") => {
    if (code === newCurrency) return;

    startTransition(async () => {
      const res = await changeCurrency(code);

      if (!res.success) {
        toast.error(res.error?.message || "An error occurred", {
          position: "top-center",
        });
      } else {
        toast.success("Currency changed successfully", {
          position: "top-center",
        });
        setNewCurrency(code);
      }
    });
  };

  return (
    <DropdownMenu>
      <ButtonGroup>
        <Button variant="outline">{newCurrency}</Button>

        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={isPending}>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
      </ButtonGroup>
      <DropdownMenuContent>
        {currencies.map((currency) => (
          <DropdownMenuItem
            disabled={isPending}
            key={currency.code}
            onClick={() => handleChangeCurrency(currency.code)}
          >
            {currency.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToggleCurrencyClient;
