interface PriceDropValue {
  normalPrice: string;
  awoofPrice: string;
}

export function parsePriceDropValue(value: string): PriceDropValue | null {
  const parts = value.split(" - ");
  if (parts.length !== 2) return null;

  const [normalPrice, awoofPrice] = parts.map((p) => p.trim());
  if (!normalPrice || !awoofPrice) return null;

  return { normalPrice, awoofPrice };
}