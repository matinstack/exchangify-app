"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import AddNewCardForm from "@/components/application/cards/AddNewCardForm";

// دیتای نمونه با رنگ‌های زنده و پرانرژی در لایت‌مود و رنگ‌های عمیق در دارک‌مود
const CARDS_DATA = [
  {
    id: 1,
    name: "Mellat Premium",
    number: "۶۱۰۴  ••••  ••••  ۱۲۳۴",
    // لایت‌مود: قرمز زرشکی زنده | دارک‌مود: زغال‌سنگی سرخ عمیق
    color:
      "bg-gradient-to-br from-red-600 to-rose-700 dark:from-stone-900 dark:to-rose-700 border-red-500/30 dark:border-zinc-800",
    textColor: "text-white",
    subColor: "text-white/60",
    chipColor:
      "bg-white/20 dark:bg-zinc-800 border-white/10 dark:border-zinc-700",
  },
  {
    id: 2,
    name: "Melli Corporate",
    number: "۶۰۳۷  ••••  ••••  ۵۶۷۸",
    // لایت‌مود: فیروزه‌ای ارینتال زنده | دارک‌مود: سرمه‌ای/آبی تیره
    color:
      "bg-gradient-to-br from-cyan-600 to-teal-700 dark:from-slate-900 dark:to-sky-950 border-cyan-500/30 dark:border-slate-800",
    textColor: "text-white",
    subColor: "text-white/60",
    chipColor:
      "bg-white/20 dark:bg-slate-800 border-white/10 dark:border-slate-700",
  },
  {
    id: 3,
    name: "Saman Personal",
    number: "۶۲۱۹  ••••  ••••  ۹۰۱۲",
    // لایت‌مود: آبی رویال پررنگ | دارک‌مود: بنفش/سورمه‌ای تیره
    color:
      "bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-purple-950 dark:to-neutral-950 border-blue-500/30 dark:border-purple-900/40",
    textColor: "text-white",
    subColor: "text-white/60",
    chipColor:
      "bg-white/20 dark:bg-purple-900/40 border-white/10 dark:border-purple-800",
  },
];

export default function CardsSlider() {
  const [cards, setCards] = useState(CARDS_DATA);

  const handleNext = () => {
    setCards((prevCards) => {
      const [first, ...rest] = prevCards;
      return [...rest, first];
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-fit min-h-fit gap-8 bg-card px-9 py-5 rounded-xl text-foreground shadow-xs border border-border ">
      <h3 className="font-normal">My Cards</h3>
      <AddNewCardForm />
      <div className="relative w-76 h-44.5 md:w-95 md:h-57.5  flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            const isFront = index === 0;
            const positionY = index * -16;
            const scale = 1 - index * 0.05;
            const opacity = 1 - index * 0.25;

            return (
              <motion.div
                key={card.id}
                style={{ transformOrigin: "top center" }}
                animate={{
                  y: positionY,
                  scale: scale,
                  opacity: opacity,
                  zIndex: cards.length - index,
                }}
                exit={{
                  x: 220,
                  opacity: 0,
                  scale: 0.85,
                  rotate: 5,
                  transition: { duration: 0.25, ease: "easeInOut" },
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 26,
                }}
                className={`absolute w-full h-full ${card.color} rounded-2xl p-6 shadow-xl dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border flex flex-col justify-between cursor-pointer`}
                onClick={isFront ? handleNext : undefined}
              >
                {/* پترن پس‌زمینه که روی کارت‌های رنگی لایت‌مود هم بسیار شیک می‌نشیند */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none rounded-2xl" />

                {/* ظاهر داخلی کارت */}
                <div className="flex justify-between items-start z-10">
                  <div className="text-right">
                    <p
                      className={`text-[10px] ${card.subColor} uppercase tracking-wider font-semibold`}
                    >
                      Card Name
                    </p>
                    <h4
                      className={`font-bold text-base ${card.textColor} mt-0.5`}
                    >
                      {card.name}
                    </h4>
                  </div>
                  {/* شبیه‌ساز چیپست با رنگ شیشه‌ای سفید که روی هر گرادینتی می‌نشیند */}
                  <div
                    className={`w-9 h-7 ${card.chipColor} rounded-md border`}
                  />
                </div>

                {/* شماره کارت */}
                <div
                  className={`font-mono text-xl tracking-[0.15em] text-center my-4 z-10 font-medium ${card.textColor}`}
                >
                  {card.number}
                </div>

                {/* بخش پایینی کارت */}
                <div className="flex justify-between items-end z-10">
                  <div className="text-right">
                    <p className={`text-[9px] ${card.subColor} uppercase`}>
                      شبکه پرداختی
                    </p>
                    <p
                      className={`font-bold text-xs ${card.textColor} mt-0.5 tracking-wide`}
                    >
                      عضو شتاب
                    </p>
                  </div>
                  <div className="px-2 py-0.5 bg-white/10 dark:bg-white/5 text-white/80 rounded text-[10px] font-black italic tracking-tighter opacity-80">
                    SHETAB
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
