function formatCurrency(val: number) {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
  return "US" + currency;
}

export default formatCurrency;
