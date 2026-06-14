"use client";
import OfferService from "@/services/offer-service";
import { Offer } from "@/types/offer";
import { useQuery } from "@tanstack/react-query";

type GetExpiringOffersOptions = {
  page: number;
  limit: number;
};

export const getExpiringOffers = async ({
  page,
  limit,
}: GetExpiringOffersOptions): Promise<Offer[]> => {
  const result = await OfferService.expiringOffers(page, limit);
  return result.data;
};

export const useExpiringOffers = ({
  page = 1,
  limit = 8,
}: GetExpiringOffersOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["expiringOffers"],
    queryFn: () => getExpiringOffers({ page, limit }),
    initialData: [],
  });

  return { data, isFetching, isFetched };
};
