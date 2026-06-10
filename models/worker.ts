import { Schema, model, models } from "mongoose";
import type { EntityStatus, WorkerRole } from "@/types";

export type WorkerDocument = {
  userId: string;
  employeeNumber: string;
  role: WorkerRole;
  department: string;
  status: EntityStatus;
};

const workerSchema = new Schema<WorkerDocument>(
  {
    userId: { type: String, required: true, unique: true },
    employeeNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    status: { type: String, default: "ACTIVE" }
  },
  { timestamps: true }
);

export const Worker = models.Worker || model<WorkerDocument>("Worker", workerSchema);
