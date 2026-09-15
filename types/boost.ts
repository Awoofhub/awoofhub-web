import { Offer } from "./offer";

export interface BoostOfferData {
  packageType: string;
}

export interface Boost {
  id: string;
  offer: Offer;
  package: string;
  endsAt: string;
  status: string;
  createdAt: string;
}

export interface Stats {
  impressions: number;
  clicks: number;
  comments: number;
  shares: number;
}

export interface BoostData {
  boost: Boost;
  stats: Stats;
}