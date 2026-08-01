import { MoveDownLeft, MoveUpRight } from "lucide-react";

const ExpenseTypeIcon = ({ isExpense }: { isExpense: boolean }) => {
  return (
    <div
      className={`${isExpense ? "bg-expense/5" : "bg-income/5"} w-9 h-9 flex justify-center items-center rounded-full border border-border`}
    >
      {isExpense ? (
        <MoveDownLeft className="text-expense" size={18} />
      ) : (
        <MoveUpRight className="text-income" size={18} />
      )}
    </div>
  );
};

export default ExpenseTypeIcon;
