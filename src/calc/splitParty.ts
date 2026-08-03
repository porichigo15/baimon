export function splitParty(total: number, people: number): number[] {
  if (people <= 0) return [];
  const totalSatang = Math.round(total * 100);
  if (totalSatang <= 0) return Array(people).fill(0);
  const base = Math.floor(totalSatang / people);
  const remainder = totalSatang % people;
  return Array.from({ length: people }, (_, i) =>
    i === 0 ? (base + remainder) / 100 : base / 100
  );
}