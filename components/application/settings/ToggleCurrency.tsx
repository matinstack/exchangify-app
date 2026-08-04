import { changeCurrency, getCurrentCurrency } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToggleCurrencyClient from "./ToggleCurrencyClient";

export type Currency = {
  currentCurrency: "USD" | "EUR" | "IRR";
};

const ToggleCurrency = async () => {
  const currentCurrency = await getCurrentCurrency();
  if (!currentCurrency.success) return null;
  const cur = currentCurrency.data.currency;

  return <ToggleCurrencyClient currentCurrency={cur} />;
};

export default ToggleCurrency;
