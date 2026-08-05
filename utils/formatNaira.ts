export function formatNairaInput(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("en-NG").format(Number(digits));
}

/** Strips formatting back down to a plain number, for storing/submitting. */
export function parseNairaInput(formatted: string): number {
  const digits = formatted.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

/** Formats a plain number as a displayable Naira string, e.g. 189000 -> "₦189,000". */
export function formatNairaDisplay(amount: number): string {
  return `₦${new Intl.NumberFormat("en-NG").format(amount)}`;
}