"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  EllipsisVertical,
  HandCoins,
  UserIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const data = [
  { name: "Jan", pv: 2400, uv: 4000 },
  { name: "Feb", pv: 1398, uv: 3000 },
  { name: "Mar", pv: 9800, uv: 2000 },
  { name: "Apr", pv: 3908, uv: 2780 },
  { name: "Mar", pv: 9800, uv: 2000 },
  { name: "Apr", pv: 3908, uv: 2780 },
  { name: "ss", pv: 9800, uv: 2000 },
  { name: "A23", pv: 3908, uv: 2780 },
];

export default function ExpenseChart() {
  return (
    <div className="w-full max-w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-7 flex justify-between">
        <h5 className={"flex gap-4"}>
          <span className={"text-expense"}>
            <HandCoins />
          </span>
          <span>Monthly Expenses</span>
        </h5>
        <div className={"flex gap-8 items-center"}>
          <p
            className={`flex text-income gap-2 text-xs font-normal items-center`}
          >
            <span>
              <TrendingUpIcon />
            </span>
            <span>6% more than last month</span>
          </p>

          <DropDownMenuChart />
        </div>
      </div>

      <div className="h-55  w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 0 }}
            barGap={6}
          >
            {/* خطوط پس‌زمینه که با رنگ بوردر چادسی‌ان هماهنگه */}

            {/* محورها با رنگ متن ثانویه سیستم (muted-foreground) */}
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              className="text-xs fill-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-xs fill-muted-foreground"
            />

            {/* کامپوننت Tooltip با کلاس‌های کامپوننت پاپ‌آپِ Shadcn */}
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--popover-foreground)",
              }}
              cursor={{ fill: "var(--muted)", opacity: 0.15 }}
              labelStyle={{
                color: "var(--muted-foreground)",
                fontWeight: "600",
                fontSize: "12px",
              }}
              itemStyle={{
                color: "var(--foreground)" /* یا var(--card-foreground) */,
                fontSize: "15px",
              }}
            />

            {/* ستون اول: رنگ اصلی تم شما (Primary) */}
            <Bar
              dataKey="pv"
              className="fill-brand"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              activeBar={{ opacity: 0.85 }}
            />

            {/* ستون دوم: یک رنگ ثانویه جذاب (مثلا متمایز یا دایورسیفاید شده) */}
            <Bar
              dataKey="uv"
              fill="var(--chart-1, #06b6d4)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              activeBar={{ opacity: 0.85 }}
            />
          </BarChart>
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
