import { Schema, model, models } from "mongoose";

export type SchoolBusDocument = {
  registrationNumber: string;
  capacity: number;
  driverId?: string;
  active: boolean;
};

const schoolBusSchema = new Schema<SchoolBusDocument>(
  {
    registrationNumber: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true, min: 1 },
    driverId: { type: String },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const SchoolBus = models.SchoolBus || model<SchoolBusDocument>("SchoolBus", schoolBusSchema);
