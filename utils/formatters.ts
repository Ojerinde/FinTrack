export const formatCurrency = (
  amount: number,
  currency: string = "NGN"
): string => {
  const isDollar = currency === "USD";
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
  }).format(Math.abs(amount));

  return isDollar ? `$${formattedAmount}` : `${currency} ${formattedAmount}`;
};

export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value}%`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
