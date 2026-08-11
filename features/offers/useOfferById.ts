"use client";
import OfferService from "@/services/offer-service";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";
import { useQuery } from "@tanstack/react-query";

type UseOfferByIdOptions = {
  id?: string;
};

export const GetOfferById = async (id: string): Promise<Offer> => {
  const result: ApiResponse<Offer> = await OfferService.offerById(id);
  return result.data;
};

export const useOfferById = ({ id }: UseOfferByIdOptions) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["offer", id],
    queryFn: () => GetOfferById(id as string),
    enabled: Boolean(id),
  });

  return { data, isLoading, isError };
};