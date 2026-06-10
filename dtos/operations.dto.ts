import type { DocumentType, SportName } from "@/types";

export type NotificationDto = {
  id: string;
  type: string;
  title: string;
  message: string;
  recipientUserIds: string[];
  sentAt?: string;
  status: "DRAFT" | "QUEUED" | "SENT" | "FAILED";
};

export type DocumentDto = {
  id: string;
  ownerType: "STUDENT" | "TEACHER" | "SCHOOL" | "ASSIGNMENT";
  ownerId: string;
  type: DocumentType;
  fileName: string;
  storageKey: string;
  url?: string;
};

export type TeamDto = {
  id: string;
  name: string;
  sport: SportName;
  coachId?: string;
  playerIds: string[];
};

export type MatchDto = {
  id: string;
  teamId: string;
  opponent: string;
  playedAt: string;
  venue: string;
  scoreFor?: number;
  scoreAgainst?: number;
};

export type HealthRecordDto = {
  id: string;
  studentId: string;
  allergies: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
};
