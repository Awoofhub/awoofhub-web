"use client";
import OfferService from "@/services/offer-service";
import { ApiResponse } from "@/types/api-response";
import { Offer, UpdateOfferData } from "@/types/offer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateOfferOptions = {
  onSuccess?: (offer: Offer) => void;
};

export const UpdateOffer = async (
  id: string,
  payload: UpdateOfferData,
): Promise<Offer> => {
  const result: ApiResponse<Offer> = await OfferService.updateOffer(id, payload);
  return result.data;
};

export const useUpdateOffer = ({ onSuccess = () => {} }: UpdateOfferOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateOfferData }) =>
      UpdateOffer(id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["offer", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["offers", "mine"] });
      // UNCONFIRMED key — swap once useMyOffersTabsCount.ts is confirmed
      queryClient.invalidateQueries({ queryKey: ["offers", "mine", "tabs-count"] });
      onSuccess?.(data);
    },
  });

  return {
    submit: (id: string, payload: UpdateOfferData) => mutate({ id, payload }),
    isPending,
  };
};