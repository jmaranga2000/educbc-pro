import { Schema, model, models } from "mongoose";

export type FeeVoteHead = {
  name: string;
  amount: number;
};

export type FeeDocument = {
  name: string;
  grade: string;
  termId: string;
  academicYearId: string;
  amount: number;
  voteHeads: FeeVoteHead[];
  dueAt?: Date;
};

const feeVoteHeadSchema = new Schema<FeeVoteHead>(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const feeSchema = new Schema<FeeDocument>(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true, index: true },
    termId: { type: String, required: true, index: true },
    academicYearId: { type: String, required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    voteHeads: [feeVoteHeadSchema],
    dueAt: { type: Date }
  },
  { timestamps: true }
);

export const Fee = models.Fee || model<FeeDocument>("Fee", feeSchema);
