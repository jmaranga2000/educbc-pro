import type { FinanceSummaryDto } from "@/dtos";

export function toFinanceSummary(expected: number, collected: number): FinanceSummaryDto {
  const arrears = Math.max(0, expected - collected);

  return {
    expected,
    collected,
    arrears,
    collectionRate: expected === 0 ? 0 : Math.round((collected / expected) * 100)
  };
}
