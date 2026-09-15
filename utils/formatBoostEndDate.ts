export function formatBoostExpiry(endDate: string): string {
  const endsAt = new Date(endDate);
  const now = new Date();

  const diffMs = endsAt.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const formattedDate = endsAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (daysRemaining <= 0) {
    return `Ended ${formattedDate}`;
  }

  return `${daysRemaining} days remaining, Ends ${formattedDate}`;
}