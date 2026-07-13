import { Offer } from "@/types/offer";
import { differenceInSeconds, parseISO } from "date-fns";

export type OfferVariant =
  | "trending"
  | "expiring"
  | "trending-expiring"
  | "regular";

export function getOfferVariant(offer: Offer): OfferVariant {
  const isTrending = offer.isTrending;
  const daysLeft = differenceInSeconds(parseISO(offer.endDate), new Date());
  const isExpiring = daysLeft >= 0 && daysLeft <= 259200; // 3 days in seconds

  if (isTrending && isExpiring) return "trending-expiring";
  if (isTrending) return "trending";
  if (isExpiring) return "expiring";
  return "regular";
}