import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { CreateOfferData, Offer, UpdateOfferData } from "@/types/offer";

async function createOffer(payload: CreateOfferData): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.post('/offers/', payload)

  return res;
}

async function offers(search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/', {
    params: { search, category, minRating, createdFrom, createdTo, page, limit },
  })

  return res;
}


async function grab(id: string): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post(`/clicks/offer/${id}`)

  return res;
}


async function offersByUser(id: string, search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get(`/offers/user/${id}`, {
    params: { search, category, minRating, createdFrom, createdTo, page, limit },
  })

  return res;
}

async function offerById(id: string): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.get(`/offers/${id}`)

  return res;
}

async function offersByCategory(id: string, page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get(`/offers/category/id/${id}`, {
    params: { page, limit },
  })

  return res;
}

async function randomOffers(page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/', {
    params: { page, limit },
  })

  return res;
}

async function updateOffer(id: string, payload: UpdateOfferData): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.post(`/offers/${id}`, payload)

  return res;
}

async function deleteOffer(id: string): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.post(`/offers/${id}`)

  return res;
}

async function trendingOffers(page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/trending', {
    params: { page, limit },
  })

  return res;
}

async function expiringOffers(page: number, limit: number): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/expiring', {
    params: { page, limit },
  })

  return res;
}


const OfferService = {
  createOffer,
  offers,
  grab,
  offersByUser,
  offerById,
  offersByCategory,
  randomOffers,
  trendingOffers,
  expiringOffers,
  updateOffer,
  deleteOffer,
};

export default OfferService;
