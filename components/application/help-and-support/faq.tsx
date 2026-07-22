"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    value: "item-1",
    trigger: "How do I add a new transaction?",
    content:
      "Create a new transaction by clicking the New Transaction button and filling in the required details.",
  },
  {
    value: "item-2",
    trigger: "How do I add a new transaction?",
    content:
      "Create a new transaction by clicking the New Transaction button and filling in the required details.",
  },
  {
    value: "item-3",
    trigger: "How do I add a new transaction?",
    content:
      "Create a new transaction by clicking the New Transaction button and filling in the required details.",
  },
];

export const FAQ = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between bg-card p-8 rounded-md border border-border">
      <div className="max-w-96 flex flex-col gap-2 mb-2 lg:mr-2">
        <h5 className="md:text-2xl font-semibold">FAQ</h5>
        <p>Find quick answers to the questions we hear most often.</p>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <Accordion type="multiple">
          {items.map((item) => (
            <AccordionItem value={item.value} key={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
