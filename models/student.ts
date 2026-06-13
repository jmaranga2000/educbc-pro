import { Schema, model, models } from "mongoose";

export type StudentDocument = {
  admissionNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  grade: string;
  stream: string;
  parentIds: string[];
  feeBalance: number;
  homePlace?: string;
};

const studentSchema = new Schema<StudentDocument>(
  {
    admissionNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
    stream: { type: String, required: true },
    parentIds: [{ type: String }],
    feeBalance: { type: Number, default: 0 },
    homePlace: { type: String }
  },
  { timestamps: true }
);

export const Student = models.Student || model<StudentDocument>("Student", studentSchema);
