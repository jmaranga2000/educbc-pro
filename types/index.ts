import type {
  ATTENDANCE_STATUSES,
  DOCUMENT_TYPES,
  ENTITY_STATUSES,
  PAYMENT_METHODS,
  SPORTS,
  USER_ROLES,
  WORKER_ROLES
} from "@/constants";

export type Role = (typeof USER_ROLES)[number];
export type WorkerRole = (typeof WORKER_ROLES)[number];
export type EntityStatus = (typeof ENTITY_STATUSES)[number];
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export type DocumentType = (typeof DOCUMENT_TYPES)[number];
export type SportName = (typeof SPORTS)[number];

export type CbcBandLabel = "EE" | "ME" | "AE" | "BE";

export type CbcBand = {
  label: CbcBandLabel;
  name: string;
  min: number;
  max: number;
  range: string;
};

export type CbcLevel = "LOWER_PRIMARY" | "UPPER_PRIMARY" | "JUNIOR_SECONDARY";

export type TeacherLevel = "PRIMARY" | "JSS";

export type TimetableLesson = {
  time: string;
  subject: string;
  teacher: string;
};

export type TimetableDay = {
  day: string;
  lessons: TimetableLesson[];
};

export type DateRange = {
  startsAt: Date;
  endsAt: Date;
};

export type Money = {
  amount: number;
  currency: "KES";
};

export type AuditFields = {
  createdAt?: Date;
  updatedAt?: Date;
};
