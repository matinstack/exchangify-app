import CardsSlider from "@/components/application/cards/CardsSlider";
import { getCardsById } from "@/data/cards";
import { getSession } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";

const Cards = async () => {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  const cards = await getCardsById(session.user?.id);
  return (
    <div>
      <CardsSlider cardsArray={cards} />
    </div>
  );
};
export default Cards;
