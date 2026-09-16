import { Offer } from "@/types/offer";

export function appendUniqueBoostedOffers(
  existingOffers: Offer[],
  newOffers: Offer[],
): Offer[] {
  const existingIds = new Set(
    existingOffers.map((offer) => offer.id),
  );

  const uniqueNewOffers = newOffers.filter(
    (offer) => !existingIds.has(offer.id),
  );

  return [
    ...existingOffers,
    ...uniqueNewOffers,
  ];
}