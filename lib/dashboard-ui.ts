import type { Role } from "@/types";

export type IconName =
  | "Activity"
  | "Archive"
  | "BarChart3"
  | "Bell"
  | "BookOpen"
  | "BriefcaseBusiness"
  | "Bus"
  | "CalendarDays"
  | "ClipboardCheck"
  | "FileText"
  | "GraduationCap"
  | "HeartPulse"
  | "Library"
  | "LineChart"
  | "Medal"
  | "MessageSquare"
  | "NotebookTabs"
  | "Receipt"
  | "ShieldCheck"
  | "Trophy"
  | "Users"
  | "WalletCards";

export type DashboardProfile = {
  role: Role;
  title: string;
  scope: string;
  summary: string;
  icon: IconName;
  metrics: Array<{
    label: string;
    value: string;
    delta: string;
    icon: IconName;
  }>;
  workbench: string[];
  records: Array<{
    label: string;
    value: string;
    status: string;
  }>;
  quickActions: string[];
};

export const dashboardProfiles: DashboardProfile[] = [
  {
    role: "SUPER_ADMIN",
    title: "Super Admin",
    scope: "All schools",
    summary: "Whole-school control room for setup, people, CBC, finance, transport, documents, notifications, and analytics.",
    icon: "ShieldCheck",
    metrics: [
      { label: "Students", value: "1,284", delta: "+8.6% enrollment", icon: "Users" },
      { label: "Teachers", value: "74", delta: "12 JSS specialists", icon: "GraduationCap" },
      { label: "Revenue", value: "KES 8.4M", delta: "82% collected", icon: "WalletCards" },
      { label: "Attendance", value: "94.2%", delta: "+2.1% this week", icon: "ClipboardCheck" }
    ],
    workbench: ["School setup", "Academic calendar", "Users and roles", "CBC settings", "Fees and billing", "System reports"],
    records: [
      { label: "Academic years", value: "2026 active", status: "Term 2 ongoing" },
      { label: "Classes", value: "36 streams", status: "Grade 1-9 mapped" },
      { label: "Notifications", value: "1,920 SMS", status: "98% delivered" }
    ],
    quickActions: ["Add school user", "Create academic year", "Publish report", "Send notice"]
  },
  {
    role: "ADMIN",
    title: "Admin",
    scope: "School office",
    summary: "Operational administration for learners, staff, streams, communication, documents, and reports.",
    icon: "BriefcaseBusiness",
    metrics: [
      { label: "Admissions", value: "46", delta: "12 pending approval", icon: "Users" },
      { label: "Documents", value: "318", delta: "R2-backed files", icon: "FileText" },
      { label: "Messages", value: "242", delta: "today", icon: "MessageSquare" },
      { label: "Reports", value: "18", delta: "ready", icon: "BarChart3" }
    ],
    workbench: ["Learner registry", "Teacher registry", "Parent contacts", "Documents", "Announcements", "Reports"],
    records: [
      { label: "New learners", value: "46", status: "Admission review" },
      { label: "Parent contacts", value: "1,061", status: "93% verified" },
      { label: "Office notices", value: "7", status: "Scheduled" }
    ],
    quickActions: ["Register learner", "Upload document", "Update stream", "Send announcement"]
  },
  {
    role: "TEACHER",
    title: "Teacher",
    scope: "Assigned classes",
    summary: "Subject teacher workspace for classes, attendance, assignments, resources, parent communication, and CBC records.",
    icon: "Users",
    metrics: [
      { label: "Classes", value: "5", delta: "assigned", icon: "NotebookTabs" },
      { label: "Assignments", value: "14", delta: "4 due this week", icon: "BookOpen" },
      { label: "CBC records", value: "186", delta: "term entries", icon: "ClipboardCheck" },
      { label: "Messages", value: "22", delta: "parent threads", icon: "MessageSquare" }
    ],
    workbench: ["Assigned subjects", "Attendance marking", "Assignments", "Learning resources", "CBC competencies", "Parent messages"],
    records: [
      { label: "Grade 7 North", value: "Mathematics", status: "Next lesson 10:30" },
      { label: "Grade 6 East", value: "Science", status: "8 submissions pending" },
      { label: "Resources", value: "32 files", status: "Notes, PDFs, videos" }
    ],
    quickActions: ["Mark attendance", "Create assignment", "Record competency", "Upload resource"]
  },
  {
    role: "CLASS_TEACHER",
    title: "Class Teacher",
    scope: "One stream",
    summary: "Class ownership dashboard for profile, discipline, attendance summaries, parent meetings, and learner monitoring.",
    icon: "ClipboardCheck",
    metrics: [
      { label: "Learners", value: "42", delta: "Grade 6 East", icon: "Users" },
      { label: "Attendance", value: "92%", delta: "weekly average", icon: "CalendarDays" },
      { label: "Watch list", value: "6", delta: "needs support", icon: "Activity" },
      { label: "Parent meetings", value: "9", delta: "this month", icon: "MessageSquare" }
    ],
    workbench: ["Class profile", "Discipline records", "Attendance summary", "Parent contacts", "Weak learners", "Top performers"],
    records: [
      { label: "Top performer", value: "Amani Otieno", status: "91% mean" },
      { label: "Support needed", value: "6 learners", status: "AE/BE trend" },
      { label: "Discipline", value: "3 records", status: "2 resolved" }
    ],
    quickActions: ["Log meeting", "Add discipline note", "Open class profile", "Message parents"]
  },
  {
    role: "PARENT",
    title: "Parent",
    scope: "Linked children",
    summary: "Parent view for child profile, academics, attendance, fees, communication, events, and progress.",
    icon: "GraduationCap",
    metrics: [
      { label: "Children", value: "2", delta: "linked learners", icon: "Users" },
      { label: "Fee balance", value: "KES 18K", delta: "Term 2", icon: "WalletCards" },
      { label: "Attendance", value: "96%", delta: "this term", icon: "CalendarDays" },
      { label: "Messages", value: "5", delta: "teacher updates", icon: "MessageSquare" }
    ],
    workbench: ["CBC reports", "Exam results", "Homework", "Fee statement", "Payment history", "Teacher messages"],
    records: [
      { label: "Amani Otieno", value: "Grade 4 West", status: "EE trend" },
      { label: "Neema Achieng", value: "Grade 3 Blue", status: "Homework due" },
      { label: "Events", value: "2 upcoming", status: "Sports day, clinic review" }
    ],
    quickActions: ["View statement", "Read report", "Message teacher", "Open homework"]
  },
  {
    role: "STUDENT",
    title: "Student",
    scope: "Own records",
    summary: "Learner portal for assignments, homework, notes, CBC projects, timetable, results, attendance, and resources.",
    icon: "BookOpen",
    metrics: [
      { label: "Assignments", value: "8", delta: "2 due soon", icon: "BookOpen" },
      { label: "CBC projects", value: "3", delta: "active", icon: "ClipboardCheck" },
      { label: "Resources", value: "41", delta: "available", icon: "Archive" },
      { label: "Attendance", value: "97%", delta: "this term", icon: "CalendarDays" }
    ],
    workbench: ["Assignments", "Homework", "Notes", "CBC projects", "Timetable", "Exam results"],
    records: [
      { label: "Mathematics", value: "78%", status: "ME" },
      { label: "Agriculture project", value: "Due Friday", status: "In progress" },
      { label: "Today", value: "5 lessons", status: "Timetable ready" }
    ],
    quickActions: ["Open assignment", "View notes", "Check timetable", "Read results"]
  },
  {
    role: "EXAMS_OFFICER",
    title: "Exams Department",
    scope: "Assessment office",
    summary: "CBC assessment engine for marks, competencies, positions, subject analysis, teacher analysis, and report cards.",
    icon: "BarChart3",
    metrics: [
      { label: "Assessments", value: "2,418", delta: "Term 2 records", icon: "ClipboardCheck" },
      { label: "Mean score", value: "74%", delta: "AE upper band", icon: "LineChart" },
      { label: "Reports", value: "316", delta: "ready to publish", icon: "FileText" },
      { label: "Subjects", value: "17", delta: "CBC mapped", icon: "BookOpen" }
    ],
    workbench: ["CBC setup", "Exam results", "Subject analysis", "Teacher analysis", "Class ranking", "Report cards"],
    records: [
      { label: "Grade 7", value: "Integrated Science", status: "ME mean" },
      { label: "Grade 4", value: "Mathematics", status: "12 BE alerts" },
      { label: "Report cards", value: "316", status: "Drafted" }
    ],
    quickActions: ["Record scores", "Publish reports", "Analyze subject", "Generate comments"]
  },
  {
    role: "SPORTS_OFFICER",
    title: "Sports Department",
    scope: "Sports teams",
    summary: "Sports management for teams, training schedules, player profiles, match results, and tournaments.",
    icon: "Medal",
    metrics: [
      { label: "Teams", value: "11", delta: "5 sports", icon: "Trophy" },
      { label: "Players", value: "162", delta: "registered", icon: "Users" },
      { label: "Fixtures", value: "8", delta: "this month", icon: "CalendarDays" },
      { label: "Results", value: "14", delta: "season records", icon: "Medal" }
    ],
    workbench: ["Team registration", "Training schedule", "Player profiles", "Match results", "Tournament tracking", "Fixtures"],
    records: [
      { label: "Football U13", value: "28 players", status: "Training Tuesday" },
      { label: "Athletics", value: "41 players", status: "Meet scheduled" },
      { label: "Basketball", value: "3 fixtures", status: "Awaiting results" }
    ],
    quickActions: ["Register team", "Add fixture", "Record result", "Update players"]
  },
  {
    role: "ACCOUNTANT",
    title: "Finance",
    scope: "Finance office",
    summary: "Finance dashboard for fee structures, payments, arrears, collection reports, and payment integration readiness.",
    icon: "WalletCards",
    metrics: [
      { label: "Expected", value: "KES 10.2M", delta: "current term", icon: "Receipt" },
      { label: "Collected", value: "KES 8.4M", delta: "82%", icon: "WalletCards" },
      { label: "Arrears", value: "KES 1.8M", delta: "reminder queue", icon: "Bell" },
      { label: "Today", value: "KES 326K", delta: "daily collection", icon: "LineChart" }
    ],
    workbench: ["Fee structures", "Payment records", "Arrears", "Daily collection", "Monthly reports", "M-Pesa readiness"],
    records: [
      { label: "M-Pesa", value: "Future integration", status: "Ready boundary" },
      { label: "Bank payments", value: "62 records", status: "Reconciliation" },
      { label: "Waivers", value: "8 learners", status: "Approval required" }
    ],
    quickActions: ["Record payment", "Create fee item", "Send reminder", "Export report"]
  },
  {
    role: "LIBRARIAN",
    title: "Library",
    scope: "Library desk",
    summary: "Library module for book inventory, borrowing, returns, fines, and digital learning materials.",
    icon: "Library",
    metrics: [
      { label: "Books", value: "4,820", delta: "inventory", icon: "Library" },
      { label: "Borrowed", value: "318", delta: "active loans", icon: "BookOpen" },
      { label: "Returns", value: "44", delta: "due today", icon: "ClipboardCheck" },
      { label: "Fines", value: "KES 7.2K", delta: "outstanding", icon: "Receipt" }
    ],
    workbench: ["Book inventory", "Borrowing", "Returns", "Fines", "Digital library", "Resource uploads"],
    records: [
      { label: "Digital library", value: "128 PDFs", status: "Available" },
      { label: "Late returns", value: "19", status: "Fine notices ready" },
      { label: "New stock", value: "74 books", status: "Cataloging" }
    ],
    quickActions: ["Add book", "Issue book", "Process return", "Upload resource"]
  },
  {
    role: "NURSE",
    title: "Health",
    scope: "Clinic",
    summary: "Health dashboard for student medical records, allergies, clinic visits, emergency contacts, and alerts.",
    icon: "HeartPulse",
    metrics: [
      { label: "Medical records", value: "1,184", delta: "student files", icon: "HeartPulse" },
      { label: "Allergies", value: "46", delta: "flagged", icon: "Activity" },
      { label: "Visits", value: "17", delta: "this week", icon: "ClipboardCheck" },
      { label: "Alerts", value: "3", delta: "emergency contacts", icon: "Bell" }
    ],
    workbench: ["Medical records", "Allergies", "Clinic visits", "Emergency contacts", "Health alerts", "Visit history"],
    records: [
      { label: "Clinic visits", value: "17", status: "6 follow-ups" },
      { label: "Allergy list", value: "46 learners", status: "Visible to staff" },
      { label: "Emergency contacts", value: "1,120", status: "96% complete" }
    ],
    quickActions: ["Open record", "Log visit", "Send health alert", "Update contact"]
  },
  {
    role: "SECRETARY",
    title: "Secretary",
    scope: "Front office",
    summary: "Front office workspace for communication, documents, visitor records, events, and operational notices.",
    icon: "MessageSquare",
    metrics: [
      { label: "Notices", value: "12", delta: "scheduled", icon: "Bell" },
      { label: "Documents", value: "204", delta: "processed", icon: "FileText" },
      { label: "Events", value: "6", delta: "this month", icon: "CalendarDays" },
      { label: "Messages", value: "390", delta: "front office", icon: "MessageSquare" }
    ],
    workbench: ["Bulk notices", "Documents", "Parent alerts", "Event reminders", "Records", "Communication logs"],
    records: [
      { label: "Event reminders", value: "6", status: "SMS queued" },
      { label: "Certificates", value: "38", status: "Ready" },
      { label: "Communication logs", value: "390", status: "This week" }
    ],
    quickActions: ["Send notice", "Add event", "Upload file", "Open logs"]
  }
];

export const cbcRows = [
  { learner: "Amani Otieno", grade: "Grade 4 West", subject: "Mathematics", score: 91, band: "EE", risk: "Stable" },
  { learner: "Wanjiku Mwangi", grade: "Grade 7 North", subject: "Integrated Science", score: 78, band: "ME", risk: "Stable" },
  { learner: "Brian Kiptoo", grade: "Grade 6 East", subject: "Science & Technology", score: 63, band: "AE", risk: "Watch" },
  { learner: "Neema Achieng", grade: "Grade 3 Blue", subject: "Numeracy", score: 47, band: "BE", risk: "High" }
];

export const moduleRows = [
  { name: "People", models: "users, students, parents, teachers, workers", icon: "Users" },
  { name: "Academics", models: "classes, streams, subjects, academic_years, terms", icon: "GraduationCap" },
  { name: "CBC and Exams", models: "cbc_assessments, exams, assignments", icon: "BarChart3" },
  { name: "Finance", models: "fees, payments, arrears reports", icon: "WalletCards" },
  { name: "Timetable", models: "timetables, teacher availability, lesson constraints", icon: "CalendarDays" },
  { name: "Communication", models: "notifications, messages, SMS logs", icon: "Bell" },
  { name: "Documents", models: "documents, R2 storage keys, certificates", icon: "FileText" },
  { name: "Operations", models: "sports, teams, matches, library, health, transport", icon: "Activity" }
] satisfies Array<{ name: string; models: string; icon: IconName }>;

export const pipelineRows = [
  { step: "Types", detail: "Shared roles, CBC bands, money, attendance, documents, and timetable primitives" },
  { step: "DTOs", detail: "Request and response shapes for people, academics, finance, and operations" },
  { step: "Mappers", detail: "Database documents converted into clean dashboard/API payloads" },
  { step: "Services", detail: "CBC grading, timetable generation, finance summaries, notification payloads" },
  { step: "Actions", detail: "Server-side entry points for forms and interactive dashboard workflows" }
];
