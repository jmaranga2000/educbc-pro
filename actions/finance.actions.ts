"use server";

import type { PaymentDto } from "@/dtos";
import { summarizeFees } from "@/services";

export async function summarizeFeesAction(expected: number, payments: Pick<PaymentDto, "amount">[]) {
  return summarizeFees(expected, payments);
}
