export type SubscriptionPlan = 'growth' | "starter" | "pro-plan"

export interface SubscriptionPlanData {
  id: SubscriptionPlan;
  title: string;
  price: number;
  features: string[];
  recommended?: boolean;
}