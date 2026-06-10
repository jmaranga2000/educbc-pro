import { Schema, model, models } from "mongoose";

export type CbcAssessmentDocument = {
  studentId: string;
  grade: string;
  subject: string;
  competencyScore: number;
  projectScore?: number;
  practicalScore?: number;
  term: string;
  academicYear: string;
};

const cbcAssessmentSchema = new Schema<CbcAssessmentDocument>(
  {
    studentId: { type: String, required: true },
    grade: { type: String, required: true },
    subject: { type: String, required: true },
    competencyScore: { type: Number, min: 0, max: 100, required: true },
    projectScore: { type: Number, min: 0, max: 100 },
    practicalScore: { type: Number, min: 0, max: 100 },
    term: { type: String, required: true },
    academicYear: { type: String, required: true }
  },
  { timestamps: true }
);

export const CbcAssessment = models.CbcAssessment || model<CbcAssessmentDocument>("CbcAssessment", cbcAssessmentSchema);
