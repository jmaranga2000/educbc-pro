import { Schema, model, models } from "mongoose";
import type { SportName } from "@/types";

export type TeamDocument = {
  name: string;
  sport: SportName;
  coachId?: string;
  playerIds: string[];
  trainingSchedule: Array<{
    day: string;
    time: string;
    venue: string;
  }>;
};

const trainingScheduleSchema = new Schema(
  {
    day: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true }
  },
  { _id: false }
);

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true, index: true },
    coachId: { type: String },
    playerIds: [{ type: String }],
    trainingSchedule: [trainingScheduleSchema]
  },
  { timestamps: true }
);

export const Team = models.Team || model<TeamDocument>("Team", teamSchema);
