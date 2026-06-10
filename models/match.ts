import { Schema, model, models } from "mongoose";

export type MatchDocument = {
  teamId: string;
  opponent: string;
  playedAt: Date;
  venue: string;
  scoreFor?: number;
  scoreAgainst?: number;
  tournament?: string;
  notes?: string;
};

const matchSchema = new Schema<MatchDocument>(
  {
    teamId: { type: String, required: true, index: true },
    opponent: { type: String, required: true },
    playedAt: { type: Date, required: true },
    venue: { type: String, required: true },
    scoreFor: { type: Number },
    scoreAgainst: { type: Number },
    tournament: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

export const Match = models.Match || model<MatchDocument>("Match", matchSchema);
