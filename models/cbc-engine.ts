import { Schema, model, models } from "mongoose";

export type CbcHierarchyLevel = "Learning Area" | "Strand" | "Sub-Strand" | "Learning Outcome" | "Indicator";

export type CbcCurriculumNodeDocument = {
  level: CbcHierarchyLevel;
  name: string;
  code: string;
  grade?: string;
  learningArea?: string;
  parentCode?: string;
  description?: string;
};

export type CbcCompetencyDocument = {
  name: string;
  description: string;
  indicators: string[];
};

export type CbcGradingBoundaryDocument = {
  level: "EE" | "ME" | "AE" | "BE";
  numericLevel: 4 | 3 | 2 | 1;
  minScore: number;
  maxScore: number;
  remarkTemplate: string;
};

export type CbcAssessmentPeriodDocument = {
  name: string;
  term: string;
  status: "Draft" | "Active" | "Closed" | "Published";
  completion: number;
  assessments: number;
};

const cbcCurriculumNodeSchema = new Schema<CbcCurriculumNodeDocument>(
  {
    level: { type: String, required: true, index: true },
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    grade: { type: String, index: true },
    learningArea: { type: String, index: true },
    parentCode: { type: String, index: true },
    description: { type: String }
  },
  { timestamps: true }
);

const cbcCompetencySchema = new Schema<CbcCompetencyDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    indicators: [{ type: String }]
  },
  { timestamps: true }
);

const cbcGradingBoundarySchema = new Schema<CbcGradingBoundaryDocument>(
  {
    level: { type: String, required: true, unique: true },
    numericLevel: { type: Number, required: true },
    minScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    remarkTemplate: { type: String, required: true }
  },
  { timestamps: true }
);

const cbcAssessmentPeriodSchema = new Schema<CbcAssessmentPeriodDocument>(
  {
    name: { type: String, required: true },
    term: { type: String, required: true, index: true },
    status: { type: String, required: true, default: "Draft" },
    completion: { type: Number, required: true, default: 0 },
    assessments: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

export const CbcCurriculumNode =
  models.CbcCurriculumNode || model<CbcCurriculumNodeDocument>("CbcCurriculumNode", cbcCurriculumNodeSchema);

export const CbcCompetency =
  models.CbcCompetency || model<CbcCompetencyDocument>("CbcCompetency", cbcCompetencySchema);

export const CbcGradingBoundary =
  models.CbcGradingBoundary || model<CbcGradingBoundaryDocument>("CbcGradingBoundary", cbcGradingBoundarySchema);

export const CbcAssessmentPeriod =
  models.CbcAssessmentPeriod || model<CbcAssessmentPeriodDocument>("CbcAssessmentPeriod", cbcAssessmentPeriodSchema);
