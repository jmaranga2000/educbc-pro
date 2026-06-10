export const DATABASE_COLLECTIONS = [
  "users",
  "students",
  "parents",
  "teachers",
  "workers",
  "classes",
  "streams",
  "subjects",
  "attendance",
  "fees",
  "payments",
  "exams",
  "cbc_assessments",
  "assignments",
  "timetables",
  "sports",
  "teams",
  "matches",
  "notifications",
  "documents",
  "academic_years",
  "terms"
] as const;

export const DOCUMENT_TYPES = [
  "BIRTH_CERTIFICATE",
  "REPORT_CARD",
  "CBC_ASSESSMENT",
  "ASSIGNMENT_FILE",
  "PHOTO",
  "TEACHER_DOCUMENT",
  "CERTIFICATE"
] as const;

export const NOTIFICATION_TYPES = ["FEE_REMINDER", "EXAM_RESULT", "ATTENDANCE_ALERT", "EVENT_REMINDER", "EMERGENCY_ALERT"] as const;

export const PAYMENT_METHODS = ["CASH", "BANK", "MPESA", "AIRTEL_MONEY", "CARD", "WAIVER"] as const;

export const SPORTS = ["Football", "Volleyball", "Basketball", "Athletics", "Rugby"] as const;

export const ENTITY_STATUSES = ["ACTIVE", "INACTIVE", "ARCHIVED"] as const;
