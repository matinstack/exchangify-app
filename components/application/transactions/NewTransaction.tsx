import NewTransactionDialog from "@/components/application/transactions/NewTransactionDialog";
import { getNewTransactionDataByUserId } from "@/data/transactions";
import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";

const NewTransaction = async () => {
  const session = await getSession();
  if (!session || !session.user.id) {
    redirect("/auth/login");
  }
  const { cards, categories, subCategories, success } =
    await getNewTransactionDataByUserId(session.user.id);
  return (
    <NewTransactionDialog
      cards={cards}
      categories={categories}
      subCategories={subCategories}
      success={success}
    />
  );
};

export default NewTransaction;
