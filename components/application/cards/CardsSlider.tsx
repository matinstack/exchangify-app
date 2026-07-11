"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARD_THEMES, type CardThemes } from "@/constants/card-themes";
import AddNewCardForm from "@/components/application/cards/AddNewCardForm";
import { type CardsType } from "@/db/schema";

interface CardsSliderProps {
  cardsArray: CardsType[];
}

export default function CardsSlider({ cardsArray }: CardsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleNext = () => {
    setActiveIndex((prev) => (prev === cardsArray.length - 1 ? 0 : prev + 1));
  };

  const orderedCards = [
    ...cardsArray.slice(activeIndex),
    ...cardsArray.slice(0, activeIndex),
  ];

  return (
    <div className="flex flex-col items-center justify-center w-fit min-h-fit gap-8 bg-card px-9 py-5 rounded-xl text-foreground shadow-xs border border-border">
      <h3 className="font-normal">My Cards</h3>

      <AddNewCardForm />

      <div className="relative w-76 h-44.5 md:w-95 md:h-57.5 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {orderedCards.map((card, index) => {
            const isFront = index === 0;

            const positionY = index * -16;
            const scale = 1 - index * 0.05;
            const opacity = 1 - index * 0.25;

            const currentTheme =
              CARD_THEMES[card.cardColor as CardThemes] ||
              CARD_THEMES["purple-indigo"];

            return (
              <motion.div
                key={card.id}
                animate={{
                  y: positionY,
                  scale,
                  opacity,
                  zIndex: orderedCards.length - index,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 26,
                }}
                className={`
                  absolute 
                  w-full 
                  h-full 
                  ${currentTheme.bg}
                  rounded-2xl 
                  p-6 
                  shadow-xl 
                  border 
                  flex 
                  flex-col 
                  justify-between 
                  cursor-pointer
                `}
                onClick={isFront ? handleNext : undefined}
              >
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none rounded-2xl" />

                <div className="flex justify-between items-start z-10">
                  <div>
                    <p
                      className={`
                        text-[10px]
                        ${currentTheme.subText}
                        uppercase
                        tracking-wider
                        font-semibold
                      `}
                    >
                      {card.bankName}
                    </p>

                    <h4
                      className={`
                        font-bold
                        text-base
                        ${currentTheme.text}
                      `}
                    >
                      {card.customName || card.bankName}
                    </h4>
                  </div>

                  <div
                    className={`
                      w-9
                      h-7
                      ${currentTheme.chip}
                      rounded-md
                      border
                    `}
                  />
                </div>

                <div
                  className={`
                    font-mono
                    text-xl
                    tracking-[0.15em]
                    text-center
                    z-10
                    ${currentTheme.text}
                  `}
                >
                  {card.cardNumber}
                </div>

                <div className="flex justify-between items-end z-10">
                  <div>
                    <p
                      className={`
                        text-xs
                        ${currentTheme.subText}
                      `}
                    >
                      balance
                    </p>

                    <p
                      className={`
                        font-bold
                        text-sm
                        ${currentTheme.text}
                      `}
                    >
                      {card.currency === "IRR" &&
                        new Intl.NumberFormat("en-US").format(
                          Math.trunc(Number(card.balance)),
                        )}
                    </p>
                  </div>

                  <div className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-black italic">
                    {card.type === "iranianBank"
                      ? "SHETAB"
                      : card.type.toUpperCase()}
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
