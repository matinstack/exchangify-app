export type CardType = "visa" | "masterCard" | "iranianBank" | "cashWallet";

export const formatCurrency = (amount: number, cardType: CardType) => {
  switch (cardType) {
    case "visa":
    case "masterCard":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

    case "iranianBank":
      return new Intl.NumberFormat("fa-IR").format(amount) + " ریال";

    case "cashWallet":
      return new Intl.NumberFormat("fa-IR").format(amount);

    default:
      return amount.toString();
  }
};
