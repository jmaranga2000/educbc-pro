export const USER_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "TEACHER",
  "CLASS_TEACHER",
  "PARENT",
  "STUDENT",
  "EXAMS_OFFICER",
  "SPORTS_OFFICER",
  "ACCOUNTANT",
  "LIBRARIAN",
  "NURSE",
  "SECRETARY"
] as const;

export const WORKER_ROLES = ["ACCOUNTANT", "LIBRARIAN", "SECRETARY", "NURSE", "DRIVER", "STORE_KEEPER"] as const;

export const ROLE_LABELS = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  TEACHER: "Teacher",
  CLASS_TEACHER: "Class Teacher",
  PARENT: "Parent",
  STUDENT: "Student",
  EXAMS_OFFICER: "Exams Officer",
  SPORTS_OFFICER: "Sports Officer",
  ACCOUNTANT: "Accountant",
  LIBRARIAN: "Librarian",
  NURSE: "Nurse",
  SECRETARY: "Secretary"
} as const;

export const ROLE_PERMISSIONS = {
  SUPER_ADMIN: ["*"],
  ADMIN: ["people:manage", "reports:view", "notifications:send"],
  TEACHER: ["students:view", "attendance:mark", "assignments:manage", "cbc:record"],
  CLASS_TEACHER: ["class:manage", "parents:contact", "cbc:view", "discipline:manage"],
  PARENT: ["children:view", "fees:view", "messages:view"],
  STUDENT: ["assignments:view", "resources:view", "results:view"],
  EXAMS_OFFICER: ["cbc:manage", "exams:manage", "reports:publish"],
  SPORTS_OFFICER: ["sports:manage"],
  ACCOUNTANT: ["fees:manage", "payments:record", "reports:finance"],
  LIBRARIAN: ["library:manage"],
  NURSE: ["health:manage"],
  SECRETARY: ["documents:manage", "notifications:send"]
} as const;
