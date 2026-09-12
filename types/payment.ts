import { User } from "./user";

export interface Payment {
  id: string;
  user: User;
  reference: string;
  amount: number;
  purpose: string;
  targetId: string;
  transactionStatus: string | null;
  status: string;
  createdAt: string;
}

export interface PaymentData {
  payment: Payment;
  paymentLink: string;
  accessCode: string;
}