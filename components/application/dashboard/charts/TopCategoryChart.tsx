"use client";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { EllipsisVertical, Tag, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const subCategories = [
  { name: "Laptops", value: 250, fill: "var(--chart-1, #e11d48)" },
  { name: "Phones", value: 150, fill: "var(--chart-2, #2563eb)" },
  { name: "Shirts", value: 180, fill: "var(--chart-3, #16a34a)" },
  { name: "Shoes", value: 120, fill: "var(--chart-4, #db2777)" },
  { name: "Fruits", value: 120, fill: "var(--chart-5, #ea580c)" },
  { name: "Vegetables", value: 80, fill: "var(--chart-1, #e11d48)" },
];

export default function TopCategoryChart() {
  return (
    <div className="w-full max-w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-7 flex justify-between">
        <h5 className={"flex  gap-4"}>
          <span className={"text-brand"}>
            <Tag />
          </span>
          <span>Top Category</span>
        </h5>
        <div className={"flex gap-8 items-center"}>
          <DropDownMenuChart />
        </div>
      </div>
      <div className="h-55 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* لایه بیرونی - زیردسته‌ها */}
            <Pie
              data={subCategories}
              dataKey="value"
              cx="20%"
              cy="50%"
              innerRadius="58%"
              outerRadius="88%"
              paddingAngle={4}
              cornerRadius={6}
              stroke="var(--card)"
              strokeWidth={3}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius)",
              }}
              itemStyle={{
                color: "var(--popover-foreground)",
                fontSize: "13px",
              }}
              cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DropDownMenuChart() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`cursor-pointer hover:text-brand transition`}>
          <EllipsisVertical size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"center"} className={"mx-1"}>
        <DropdownMenuItem>Test</DropdownMenuItem>
        <DropdownMenuItem>
          <UserIcon />
          Test
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
