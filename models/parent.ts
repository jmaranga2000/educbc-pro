import { Schema, model, models } from "mongoose";

export type ParentDocument = {
  userId: string;
  relationship: string;
  studentIds: string[];
  occupation?: string;
  address?: string;
};

const parentSchema = new Schema<ParentDocument>(
  {
    userId: { type: String, required: true, unique: true },
    relationship: { type: String, required: true },
    studentIds: [{ type: String, index: true }],
    occupation: { type: String },
    address: { type: String }
  },
  { timestamps: true }
);

export const Parent = models.Parent || model<ParentDocument>("Parent", parentSchema);
