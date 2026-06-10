import { Schema, model, models } from "mongoose";

export type NotificationDocument = {
  type: string;
  title: string;
  message: string;
  recipientUserIds: string[];
  channel: "SMS" | "EMAIL" | "IN_APP";
  status: "DRAFT" | "QUEUED" | "SENT" | "FAILED";
  sentAt?: Date;
  failureReason?: string;
};

const notificationSchema = new Schema<NotificationDocument>(
  {
    type: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    recipientUserIds: [{ type: String, index: true }],
    channel: { type: String, required: true, default: "SMS" },
    status: { type: String, required: true, default: "DRAFT" },
    sentAt: { type: Date },
    failureReason: { type: String }
  },
  { timestamps: true }
);

export const Notification = models.Notification || model<NotificationDocument>("Notification", notificationSchema);
