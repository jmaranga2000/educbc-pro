import { Schema, model, models } from "mongoose";

export type DisciplineRecordDocument = {
  studentId: string;
  classId: string;
  incidentDate: Date;
  severity: "LOW" | "MEDIUM" | "HIGH";
  description: string;
  actionTaken?: string;
  recordedBy: string;
};

const disciplineRecordSchema = new Schema<DisciplineRecordDocument>(
  {
    studentId: { type: String, required: true, index: true },
    classId: { type: String, required: true, index: true },
    incidentDate: { type: Date, required: true },
    severity: { type: String, required: true, default: "LOW" },
    description: { type: String, required: true },
    actionTaken: { type: String },
    recordedBy: { type: String, required: true }
  },
  { timestamps: true }
);

export const DisciplineRecord =
  models.DisciplineRecord || model<DisciplineRecordDocument>("DisciplineRecord", disciplineRecordSchema);
