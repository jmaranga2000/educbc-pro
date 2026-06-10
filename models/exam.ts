import { Schema, model, models } from "mongoose";

export type ExamScore = {
  studentId: string;
  score: number;
  grade?: string;
  comment?: string;
};

export type ExamDocument = {
  name: string;
  subjectId: string;
  classId: string;
  termId: string;
  academicYearId: string;
  maxScore: number;
  scores: ExamScore[];
  published: boolean;
};

const examScoreSchema = new Schema<ExamScore>(
  {
    studentId: { type: String, required: true },
    score: { type: Number, required: true, min: 0 },
    grade: { type: String },
    comment: { type: String }
  },
  { _id: false }
);

const examSchema = new Schema<ExamDocument>(
  {
    name: { type: String, required: true },
    subjectId: { type: String, required: true, index: true },
    classId: { type: String, required: true, index: true },
    termId: { type: String, required: true, index: true },
    academicYearId: { type: String, required: true, index: true },
    maxScore: { type: Number, default: 100 },
    scores: [examScoreSchema],
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Exam = models.Exam || model<ExamDocument>("Exam", examSchema);
