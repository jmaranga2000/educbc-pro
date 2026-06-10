import { Schema, model, models } from "mongoose";
import type { SportName } from "@/types";

export type SportDocument = {
  name: SportName;
  season: string;
  officerId?: string;
  active: boolean;
};

const sportSchema = new Schema<SportDocument>(
  {
    name: { type: String, required: true },
    season: { type: String, required: true },
    officerId: { type: String },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

sportSchema.index({ name: 1, season: 1 }, { unique: true });

export const Sport = models.Sport || model<SportDocument>("Sport", sportSchema);
