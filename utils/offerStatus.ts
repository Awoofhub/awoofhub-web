import { Offer } from "@/types/offer";

export type DisplayStatus = "active" | "pending" | "rejected" | "suspended" | "expired";

export function getDisplayStatus(offer: Offer): DisplayStatus {
  if (offer.status === "pending") return "pending";
  if (offer.status === "rejected") return "rejected";
  if (offer.status === "suspended") return "suspended";

  const isExpired = new Date(offer.endDate) < new Date();
  return isExpired ? "expired" : "active";
}