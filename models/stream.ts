import { Schema, model, models } from "mongoose";

export type StreamDocument = {
  name: string;
  grade: string;
  capacity?: number;
};

const streamSchema = new Schema<StreamDocument>(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true, index: true },
    capacity: { type: Number }
  },
  { timestamps: true }
);

streamSchema.index({ name: 1, grade: 1 }, { unique: true });

export const Stream = models.Stream || model<StreamDocument>("Stream", streamSchema);
