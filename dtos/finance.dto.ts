import type { PaymentMethod } from "@/types";

export type FeeStructureDto = {
  id: string;
  name: string;
  grade: string;
  termId: string;
  amount: number;
  voteHeads: Array<{
    name: string;
    amount: number;
  }>;
};

export type PaymentDto = {
  id: string;
  studentId: string;
  amount: number;
  method: PaymentMethod;
  reference: string;
  paidAt: string;
  receivedBy?: string;
};

export type FinanceSummaryDto = {
  expected: number;
  collected: number;
  arrears: number;
  collectionRate: number;
};
