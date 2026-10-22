export type ServicePrice = {
  amount: number;
  kind: "fixed" | "from";
};

const amountFormatter = new Intl.NumberFormat("ro-RO", {
  maximumFractionDigits: 2,
});

export function formatServicePrice(price: ServicePrice | null) {
  if (!price || !Number.isFinite(price.amount) || price.amount < 0) return null;
  return `${price.kind === "from" ? "de la " : ""}${amountFormatter.format(price.amount)} lei`;
}
