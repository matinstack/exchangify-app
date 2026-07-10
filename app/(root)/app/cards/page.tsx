import Cards from "@/components/application/cards/Cards";
import { Suspense } from "react";

const cardsPage = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <Cards />
    </Suspense>
  );
};

export default cardsPage;
