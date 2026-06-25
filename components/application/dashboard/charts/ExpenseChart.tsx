"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// نمونه داده‌ها
const data = [
  { name: "Jan", pv: 2400, uv: 4000 },
  { name: "Feb", pv: 1398, uv: 3000 },
  { name: "Mar", pv: 9800, uv: 2000 },
  { name: "Apr", pv: 3908, uv: 2780 },
];

export default function ExpenseChart() {
  return (
    // استفاده از کلاس‌های متغیر دار Shadcn برای بک‌گراند و بوردر
    <div className="w-full max-w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold tracking-tight">Expense Chart</h3>
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
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--popover-foreground)",
              }}
              cursor={{ fill: "var(--muted)", opacity: 0.15 }}
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
