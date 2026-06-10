import { Schema, model, models } from "mongoose";

export type TermDocument = {
  name: string;
  academicYearId: string;
  startsAt: Date;
  endsAt: Date;
  isActive: boolean;
};

const termSchema = new Schema<TermDocument>(
  {
    name: { type: String, required: true },
    academicYearId: { type: String, required: true, index: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

termSchema.index({ name: 1, academicYearId: 1 }, { unique: true });

export const Term = models.Term || model<TermDocument>("Term", termSchema);
