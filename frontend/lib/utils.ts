export function formatXlm(amount: number): string {
  return `${amount.toLocaleString()} XLM`;
}

export function shortenHash(hash: string): string {
  if (!hash) return "—";
  if (hash.length <= 10) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

export function formatDate(date: Date): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
