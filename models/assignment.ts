import { Schema, model, models } from "mongoose";

export type AssignmentDocument = {
  title: string;
  instructions?: string;
  subjectId: string;
  classId: string;
  teacherId: string;
  dueAt: Date;
  resourceIds: string[];
  attachmentIds: string[];
  published: boolean;
};

const assignmentSchema = new Schema<AssignmentDocument>(
  {
    title: { type: String, required: true },
    instructions: { type: String },
    subjectId: { type: String, required: true, index: true },
    classId: { type: String, required: true, index: true },
    teacherId: { type: String, required: true, index: true },
    dueAt: { type: Date, required: true },
    resourceIds: [{ type: String }],
    attachmentIds: [{ type: String }],
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Assignment = models.Assignment || model<AssignmentDocument>("Assignment", assignmentSchema);
