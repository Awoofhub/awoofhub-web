import { User } from "./user";

export interface Subscription {
  id: string;
  user: User;
  reference: string;
  subscriptionCode: string | null;
  planCode: string;
  amount: number;
  subscriptionStatus: string | null
  subscriptionExpiresAt: string | null,
  status: string;
  createdAt: string;
}

export interface SubscriptionData {
  payment: Subscription;
  paymentLink: string;
  accessCode: string;
}

export type SubscriptionPlan = 'growth' | "starter" | "pro"

export interface subscriptionPayload {
  planName: string;
}

export interface SubscriptionPlanData {
  id: SubscriptionPlan;
  title: string;
  price: number;
  features: string[];
  recommended?: boolean;
}