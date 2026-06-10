import type { FinanceSummaryDto, PaymentDto } from "@/dtos";
import { toFinanceSummary } from "@/mappers";

export function summarizeFees(expected: number, payments: Pick<PaymentDto, "amount">[]): FinanceSummaryDto {
  const collected = payments.reduce((total, payment) => total + payment.amount, 0);

  return toFinanceSummary(expected, collected);
}

export function calculateStudentFeeBalance(expected: number, payments: Pick<PaymentDto, "amount">[]) {
  const collected = payments.reduce((total, payment) => total + payment.amount, 0);

  return Math.max(0, expected - collected);
}
