"use client";
import BoostService from "@/services/boost-service";
import { Offer } from "@/types/offer";
import { useQuery } from "@tanstack/react-query";


export const getBoostedOffers = async (): Promise<Offer[]> => {
  const result = await BoostService.getBoostedOffers();
  return result.data;
};

export const useBoostedOffers = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['boost', 'offer'],
    queryFn: () => getBoostedOffers(),
    initialData: []
  });

  return {
    data,
    isFetching,
    isLoading,
    refetch
  };
};

