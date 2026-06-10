import type { Role } from "@/types";

export const roleRoutes: Array<{
  role: Role;
  slug: string;
  label: string;
}> = [
  { role: "SUPER_ADMIN", slug: "super-admin", label: "Super Admin" },
  { role: "ADMIN", slug: "admin", label: "Admin" },
  { role: "TEACHER", slug: "teacher", label: "Teacher" },
  { role: "CLASS_TEACHER", slug: "class-teacher", label: "Class Teacher" },
  { role: "PARENT", slug: "parent", label: "Parent" },
  { role: "STUDENT", slug: "student", label: "Student" },
  { role: "EXAMS_OFFICER", slug: "exams-officer", label: "Exams Officer" },
  { role: "SPORTS_OFFICER", slug: "sports-officer", label: "Sports Officer" },
  { role: "ACCOUNTANT", slug: "accountant", label: "Accountant" },
  { role: "LIBRARIAN", slug: "librarian", label: "Librarian" },
  { role: "NURSE", slug: "nurse", label: "Nurse" },
  { role: "SECRETARY", slug: "secretary", label: "Secretary" }
];

export const dashboardSections = [
  { slug: "people", label: "People", description: "Students, parents, teachers, workers, classes, and streams" },
  { slug: "academics", label: "Academics", description: "Subjects, assignments, learning resources, exams, and reports" },
  { slug: "cbc", label: "CBC", description: "Competency bands, assessments, analytics, and report comments" },
  { slug: "attendance", label: "Attendance", description: "Daily marking, history, summaries, and alerts" },
  { slug: "finance", label: "Finance", description: "Fee structures, payments, arrears, and collection reports" },
  { slug: "timetable", label: "Timetable", description: "Teacher constraints, lessons, breaks, lunch, and generated schedules" },
  { slug: "communication", label: "Communication", description: "SMS, parent alerts, events, teacher messages, and logs" },
  { slug: "documents", label: "Documents", description: "R2 uploads for certificates, reports, photos, and assignment files" },
  { slug: "sports", label: "Sports", description: "Teams, player profiles, training schedules, matches, and tournaments" },
  { slug: "library", label: "Library", description: "Inventory, borrowing, returns, fines, and digital library" },
  { slug: "transport", label: "Transport", description: "School buses, routes, drivers, and student tracking" },
  { slug: "health", label: "Health", description: "Medical records, allergies, clinic visits, and emergency contacts" },
  { slug: "analytics", label: "Analytics", description: "School, CBC, attendance, and financial analytics" }
] as const;

export type DashboardSectionSlug = (typeof dashboardSections)[number]["slug"];

export function roleFromSlug(slug: string) {
  return roleRoutes.find((route) => route.slug === slug)?.role;
}

export function slugFromRole(role: Role) {
  return roleRoutes.find((route) => route.role === role)?.slug ?? "super-admin";
}

export function sectionFromSlug(slug: string) {
  return dashboardSections.find((section) => section.slug === slug);
}
