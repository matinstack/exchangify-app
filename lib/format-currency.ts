export type Currency = "USD" | "EUR" | "IRR";

export const formatCurrency = (amount: number, cardType: Currency) => {
  console.log(amount, cardType);
  switch (cardType) {
    case "EUR":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

    case "IRR":
      return new Intl.NumberFormat("fa-IR").format(amount) + " Rial";

    case "USD":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

    default:
      return amount.toString();
  }
};
