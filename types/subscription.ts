import { User } from "./user";

export interface Subscription {
  id: string;
  user: User;
  reference: string;
  subscriptionCode: string | null;
  planCode: string;
  amount: number;
  subscriptionExpiresAt: string | null,
  status: 'pending' | 'active' | 'failed' | 'cancelled',
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

export interface SubscriptionPlanConfig {
  id: SubscriptionPlan;
  title: string;
  price: number;
  features: {
    name: string;
    description: string;
  }[];
  recommended?: boolean;
  description: string;
  unavailableFeatures?: string[];
}
