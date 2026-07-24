// import {
//   LayoutDashboard,
//   ArrowLeftRight,
//   ReceiptText,
//   Target,
//   CreditCard,
//   LineChart,
//   ScrollText,
//   LifeBuoy,
//   Settings,
//   Wallet,
//   TrendingUp,
//   TrendingDown,
//   ArrowDownCircle,
//   ArrowUpCircle,
//   Bell,
//   Clock,
//   MoreVertical,
//   Tag,
// } from "lucide-react";
//
// const nav = {
//   General: [
//     { label: "Dashboard", icon: LayoutDashboard, active: true },
//     { label: "Transactions", icon: ArrowLeftRight },
//     { label: "Bills & Subscriptions", icon: ReceiptText },
//     { label: "Goals", icon: Target },
//     { label: "Cards", icon: CreditCard },
//   ],
//   Tools: [
//     { label: "Analytics", icon: LineChart },
//     { label: "Activity Log", icon: ScrollText },
//   ],
//   Other: [
//     { label: "Help & Support", icon: LifeBuoy },
//     { label: "Settings", icon: Settings },
//   ],
// };
//
// const stats = [
//   {
//     label: "Account Balance",
//     value: "$973,652",
//     icon: Wallet,
//     delta: "6% more than last month",
//     up: true,
//   },
//   {
//     label: "Monthly Expenses",
//     value: "$473,652",
//     icon: ArrowUpCircle,
//     delta: "2% less than last month",
//     up: true,
//   },
//   {
//     label: "Monthly Income",
//     value: "$820,140",
//     icon: ArrowDownCircle,
//     delta: "9% more than last month",
//     up: true,
//   },
//   {
//     label: "Total Savings",
//     value: "$126,900",
//     icon: Target,
//     delta: "3% less than last month",
//     up: false,
//   },
// ];
//
// // paired bars: [primary, muted]
// const bars = [
//   [58, 34],
//   [30, 40],
//   [96, 22],
//   [46, 32],
//   [96, 24],
//   [44, 33],
//   [96, 22],
//   [42, 34],
// ];
// const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
//
// const donut = [
//   { label: "Laptops", value: 250, color: "var(--chart-1)" },
//   { label: "Phones", value: 150, color: "oklch(0.85 0.16 92)" },
//   { label: "Shirts", value: 180, color: "oklch(0.82 0.02 200)" },
//   { label: "Shoes", value: 120, color: "oklch(0.5 0.01 200)" },
//   { label: "Fruits", value: 120, color: "oklch(0.68 0.19 40)" },
//   { label: "Vegetables", value: 80, color: "oklch(0.6 0.21 20)" },
// ];
//
// const rows = [
//   {
//     sn: "01",
//     amount: "$2,100.00",
//     cat: "Shopping",
//     sub: "Amazon",
//     date: "31 May 2025",
//   },
//   {
//     sn: "02",
//     amount: "$860.00",
//     cat: "Dining",
//     sub: "Uber Eats",
//     date: "28 May 2025",
//   },
//   {
//     sn: "03",
//     amount: "$1,240.00",
//     cat: "Travel",
//     sub: "Airbnb",
//     date: "24 May 2025",
//   },
//   {
//     sn: "04",
//     amount: "$320.00",
//     cat: "Utilities",
//     sub: "Comcast",
//     date: "21 May 2025",
//   },
// ];
//
// function Donut() {
//   const total = donut.reduce((s, d) => s + d.value, 0);
//   const R = 42;
//   const C = 2 * Math.PI * R;
//   let offset = 0;
//   return (
//     <svg viewBox="0 0 120 120" className="size-32 -rotate-90">
//       {donut.map((d) => {
//         const len = (d.value / total) * C;
//         const seg = (
//           <circle
//             key={d.label}
//             cx="60"
//             cy="60"
//             r={R}
//             fill="none"
//             stroke={d.color}
//             strokeWidth="14"
//             strokeDasharray={`${len - 3} ${C - len + 3}`}
//             strokeDashoffset={-offset}
//             strokeLinecap="round"
//           />
//         );
//         offset += len;
//         return seg;
//       })}
//     </svg>
//   );
// }
//
// export function DashboardMockup() {
//   return (
//     <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50 ring-1 ring-white/5">
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="hidden w-52 shrink-0 flex-col border-r border-border bg-sidebar/80 p-4 lg:flex">
//           <div className="flex items-center gap-0.5 px-1 pb-6 text-lg font-bold tracking-tight">
//             <span className="text-primary">EX</span>
//             <span className="text-foreground">PENSLY</span>
//           </div>
//           <nav className="flex flex-col gap-5 text-left">
//             {Object.entries(nav).map(([group, items]) => (
//               <div key={group}>
//                 <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
//                   {group}
//                 </p>
//                 <ul className="flex flex-col gap-0.5">
//                   {items.map((item) => (
//                     <li key={item.label}>
//                       <span
//                         className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
//                           item.active
//                             ? "bg-primary text-primary-foreground"
//                             : "text-muted-foreground"
//                         }`}
//                       >
//                         <item.icon className="size-4 shrink-0" />
//                         <span className="truncate">{item.label}</span>
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </nav>
//         </aside>
//
//         {/* Main */}
//         <div className="min-w-0 flex-1 p-4 sm:p-5">
//           {/* Header */}
//           <div className="flex items-start justify-between gap-3">
//             <div>
//               <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
//                 Welcome back, Matin
//               </h3>
//               <p className="mt-0.5 text-xs text-muted-foreground">
//                 Track all your expenses and financial activity.
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="hidden items-center gap-1.5 rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-[11px] text-muted-foreground sm:flex">
//                 <Clock className="size-3.5" />
//                 04:57 PM · 21 Jul 2026
//               </span>
//               <span className="relative flex size-8 items-center justify-center rounded-lg border border-border bg-background/60 text-muted-foreground">
//                 <Bell className="size-4" />
//                 <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
//               </span>
//               <span className="size-8 rounded-full bg-gradient-to-br from-primary to-chart-2" />
//             </div>
//           </div>
//
//           {/* Stat cards */}
//           <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
//             {stats.map((s) => (
//               <div
//                 key={s.label}
//                 className="rounded-xl border border-border bg-background/60 p-3.5"
//               >
//                 <div className="flex items-center gap-2 text-muted-foreground">
//                   <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                     <s.icon className="size-4" />
//                   </span>
//                   <span className="text-[11px] font-medium">{s.label}</span>
//                 </div>
//                 <p className="mt-2.5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
//                   {s.value}
//                 </p>
//                 <p
//                   className={`mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium ${
//                     s.up ? "text-primary" : "text-destructive"
//                   }`}
//                 >
//                   {s.up ? (
//                     <TrendingUp className="size-3" />
//                   ) : (
//                     <TrendingDown className="size-3" />
//                   )}
//                   {s.delta}
//                 </p>
//               </div>
//             ))}
//           </div>
//
//           {/* Charts row */}
//           <div className="mt-4 grid gap-3 lg:grid-cols-5">
//             {/* Bar chart */}
//             <div className="rounded-xl border border-border bg-background/60 p-4 lg:col-span-3">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm font-semibold text-foreground">
//                   Monthly Expenses
//                 </p>
//                 <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
//                   <TrendingUp className="size-3" /> 6% vs last month
//                 </span>
//               </div>
//               <div className="mt-4 flex gap-3">
//                 <div className="flex flex-col justify-between py-1 text-[9px] text-muted-foreground/70">
//                   {["10k", "7.5k", "5k", "2.5k", "0"].map((y) => (
//                     <span key={y}>{y}</span>
//                   ))}
//                 </div>
//                 <div className="flex h-32 flex-1 items-end justify-between gap-1.5 border-l border-border pl-3">
//                   {bars.map(([a, b], i) => (
//                     <div
//                       key={months[i]}
//                       className="flex flex-1 flex-col items-center gap-1.5"
//                     >
//                       <div className="flex h-full w-full items-end justify-center gap-0.5">
//                         <span
//                           className="w-1/2 rounded-t bg-primary"
//                           style={{ height: `${a}%` }}
//                         />
//                         <span
//                           className="w-1/2 rounded-t bg-muted-foreground/25"
//                           style={{ height: `${b}%` }}
//                         />
//                       </div>
//                       <span className="text-[9px] text-muted-foreground/70">
//                         {months[i]}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//
//             {/* Donut */}
//             <div className="rounded-xl border border-border bg-background/60 p-4 lg:col-span-2">
//               <div className="mb-1 flex items-center gap-2">
//                 <Tag className="size-4 text-primary" />
//                 <p className="text-sm font-semibold text-foreground">
//                   Top Category
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="relative shrink-0">
//                   <Donut />
//                   <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <span className="text-[9px] text-muted-foreground">
//                       Total
//                     </span>
//                     <span className="text-sm font-semibold text-foreground">
//                       $900
//                     </span>
//                   </div>
//                 </div>
//                 <ul className="flex-1 space-y-1">
//                   {donut.map((d) => (
//                     <li
//                       key={d.label}
//                       className="flex items-center justify-between gap-2 text-[10px]"
//                     >
//                       <span className="flex items-center gap-1.5 text-muted-foreground">
//                         <span
//                           className="size-2 rounded-full"
//                           style={{ backgroundColor: d.color }}
//                         />
//                         {d.label}
//                       </span>
//                       <span className="font-medium text-foreground">
//                         ${d.value}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//
//           {/* Transactions table */}
//           <div className="mt-3 rounded-xl border border-border bg-background/60 p-4">
//             <div className="mb-2 flex items-center justify-between">
//               <p className="text-sm font-semibold text-foreground">
//                 Recent Transactions
//               </p>
//               <span className="text-[11px] font-medium text-primary">
//                 View all
//               </span>
//             </div>
//             <div className="overflow-hidden">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
//                     <th className="pb-2 font-medium">S.N</th>
//                     <th className="pb-2 font-medium">Amount</th>
//                     <th className="pb-2 font-medium">Category</th>
//                     <th className="hidden pb-2 font-medium sm:table-cell">
//                       Sub Category
//                     </th>
//                     <th className="hidden pb-2 font-medium sm:table-cell">
//                       Date
//                     </th>
//                     <th className="pb-2 text-right font-medium">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-border">
//                   {rows.map((r) => (
//                     <tr key={r.sn} className="text-xs text-foreground">
//                       <td className="py-2.5 text-muted-foreground">{r.sn}</td>
//                       <td className="py-2.5 font-medium">{r.amount}</td>
//                       <td className="py-2.5">
//                         <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
//                           {r.cat}
//                         </span>
//                       </td>
//                       <td className="hidden py-2.5 text-muted-foreground sm:table-cell">
//                         {r.sub}
//                       </td>
//                       <td className="hidden py-2.5 text-muted-foreground sm:table-cell">
//                         {r.date}
//                       </td>
//                       <td className="py-2.5 text-right">
//                         <MoreVertical className="ml-auto size-3.5 text-muted-foreground" />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
