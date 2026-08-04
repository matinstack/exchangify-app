"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, ChevronDownIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ButtonGroup } from "../ui/button-group";
function DarkModeToggle() {
  const { setTheme, theme } = useTheme();
  const selectedTheme = theme || "";
  return (
    <DropdownMenu>
      <ButtonGroup>
        <Button
          variant="outline"
          className="bg-transparent relative hover:bg-transparent active:bg-transparent"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="sr-only">Toggle theme</span>
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
      </ButtonGroup>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DarkModeToggle;
