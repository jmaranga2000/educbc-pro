import { Schema, model, models } from "mongoose";

export type TransportStop = {
  name: string;
  pickupTime?: string;
  dropoffTime?: string;
};

export type TransportRouteDocument = {
  name: string;
  busId: string;
  driverId?: string;
  studentIds: string[];
  stops: TransportStop[];
};

const transportStopSchema = new Schema<TransportStop>(
  {
    name: { type: String, required: true },
    pickupTime: { type: String },
    dropoffTime: { type: String }
  },
  { _id: false }
);

const transportRouteSchema = new Schema<TransportRouteDocument>(
  {
    name: { type: String, required: true },
    busId: { type: String, required: true, index: true },
    driverId: { type: String },
    studentIds: [{ type: String }],
    stops: [transportStopSchema]
  },
  { timestamps: true }
);

export const TransportRoute =
  models.TransportRoute || model<TransportRouteDocument>("TransportRoute", transportRouteSchema);
