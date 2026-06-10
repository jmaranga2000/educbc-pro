import { Schema, model, models } from "mongoose";
import type { CbcLevel } from "@/types";

export type SubjectDocument = {
  name: string;
  code: string;
  level: CbcLevel;
  grades: string[];
  isCompulsory: boolean;
  weeklyLessons: number;
};

const subjectSchema = new Schema<SubjectDocument>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    level: { type: String, required: true },
    grades: [{ type: String, index: true }],
    isCompulsory: { type: Boolean, default: true },
    weeklyLessons: { type: Number, default: 5 }
  },
  { timestamps: true }
);

export const Subject = models.Subject || model<SubjectDocument>("Subject", subjectSchema);
