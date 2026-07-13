"use client";
import { PatternFormat } from "react-number-format";

const CardNumber = ({ card }: { card: string }) => {
  return (
    <PatternFormat
      className={"text-xs text-foreground/40"}
      format={"#### #### #### ####"}
      value={card}
    />
  );
};

export default CardNumber;
