
export function formatNairaDisplay(amount: number): string {
  return `₦${new Intl.NumberFormat("en-NG").format(amount)}`;
}