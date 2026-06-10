import { Schema, model, models } from "mongoose";
import type { PaymentMethod } from "@/types";

export type PaymentDocument = {
  studentId: string;
  feeId?: string;
  amount: number;
  method: PaymentMethod;
  reference: string;
  paidAt: Date;
  receivedBy?: string;
  notes?: string;
};

const paymentSchema = new Schema<PaymentDocument>(
  {
    studentId: { type: String, required: true, index: true },
    feeId: { type: String, index: true },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    paidAt: { type: Date, required: true },
    receivedBy: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

export const Payment = models.Payment || model<PaymentDocument>("Payment", paymentSchema);
