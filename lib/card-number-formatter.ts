export function formatCardNumber(cardNumber: string) {
  return cardNumber
    .slice(0, 4)
    .concat(" **** **** ")
    .concat(cardNumber.slice(-4));
}
