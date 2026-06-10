import { Schema, model, models } from "mongoose";

export type ClassDocument = {
  name: string;
  grade: string;
  streamId: string;
  classTeacherId?: string;
  academicYearId: string;
  studentIds: string[];
};

const classSchema = new Schema<ClassDocument>(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true, index: true },
    streamId: { type: String, required: true, index: true },
    classTeacherId: { type: String },
    academicYearId: { type: String, required: true, index: true },
    studentIds: [{ type: String }]
  },
  { timestamps: true }
);

classSchema.index({ grade: 1, streamId: 1, academicYearId: 1 }, { unique: true });

export const SchoolClass = models.Class || model<ClassDocument>("Class", classSchema);
