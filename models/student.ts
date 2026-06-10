import { Schema, model, models } from "mongoose";

export type StudentDocument = {
  admissionNumber: string;
  firstName: string;
  lastName: string;
  grade: string;
  stream: string;
  parentIds: string[];
  feeBalance: number;
};

const studentSchema = new Schema<StudentDocument>(
  {
    admissionNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    grade: { type: String, required: true },
    stream: { type: String, required: true },
    parentIds: [{ type: String }],
    feeBalance: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Student = models.Student || model<StudentDocument>("Student", studentSchema);
