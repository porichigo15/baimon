const thaiBaht = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
});

export function formatBaht(value: number): string {
  return thaiBaht.format(value);
}