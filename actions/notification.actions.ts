"use server";

import type { NotificationDto } from "@/dtos";
import { buildSmsPayload, createQueuedNotification } from "@/services";

export async function previewSmsNotificationAction(phoneNumbers: string[], notification: Pick<NotificationDto, "title" | "message">) {
  return buildSmsPayload(phoneNumbers, notification);
}

export async function queueNotificationAction(input: Omit<NotificationDto, "id" | "status">) {
  return createQueuedNotification(input);
}
