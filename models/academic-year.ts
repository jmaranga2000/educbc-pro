import { Schema, model, models } from "mongoose";

export type AcademicYearDocument = {
  name: string;
  startsAt: Date;
  endsAt: Date;
  isActive: boolean;
};

const academicYearSchema = new Schema<AcademicYearDocument>(
  {
    name: { type: String, required: true, unique: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const AcademicYear = models.AcademicYear || model<AcademicYearDocument>("AcademicYear", academicYearSchema);
