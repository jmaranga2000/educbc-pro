import type { NotificationDto } from "@/dtos";

export type SmsPayload = {
  phoneNumbers: string[];
  message: string;
};

export function buildSmsPayload(phoneNumbers: string[], notification: Pick<NotificationDto, "title" | "message">): SmsPayload {
  return {
    phoneNumbers,
    message: `${notification.title}: ${notification.message}`
  };
}

export function createQueuedNotification(input: Omit<NotificationDto, "id" | "status">): NotificationDto {
  return {
    id: "queued",
    ...input,
    status: "QUEUED"
  };
}
