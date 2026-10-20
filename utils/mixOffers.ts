import { Offer } from "@/types/offer";

export function mixOffers(
  organicOffers: Offer[],
  boostedOffers: Offer[],
): Offer[] {
  if (organicOffers.length === 0) {
    return [];
  }

  if (boostedOffers.length === 0) {
    return organicOffers;
  }

  const result: Offer[] = [];

  const organicBatchSize = 8;
  const boostedBatchSize = 1;
  const position = 7;

  for (
    let organicIndex = 0, boostedIndex = 0;
    organicIndex < organicOffers.length;
    organicIndex += organicBatchSize
  ) {
    const organicBatch = organicOffers.slice(
      organicIndex,
      organicIndex + organicBatchSize,
    );

    const boostedBatch = boostedOffers.slice(
      boostedIndex,
      boostedIndex + boostedBatchSize,
    );

    const mixedBatch = [...organicBatch];

    boostedBatch.forEach((offer) => {
      if (position <= organicBatch.length) {
        mixedBatch.splice(position, 0, offer);
      }
    });

    result.push(...mixedBatch);

    boostedIndex += boostedBatch.length;
  }

  return result;
}