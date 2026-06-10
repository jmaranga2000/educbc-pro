import type { CbcBand, Role, TimetableDay } from "@/lib/types";

export const cbcBands: CbcBand[] = [
  { label: "EE", name: "Exceeding Expectations", min: 90, max: 100, range: "90 - 100" },
  { label: "ME", name: "Meeting Expectations", min: 75, max: 89, range: "75 - 89" },
  { label: "AE", name: "Approaching Expectations", min: 50, max: 74, range: "50 - 74" },
  { label: "BE", name: "Below Expectations", min: 0, max: 49, range: "0 - 49" }
];

export const dashboards: Array<{
  role: Role;
  title: string;
  summary: string;
  scope: string;
  icon: "ShieldCheck" | "Users" | "ClipboardCheck" | "GraduationCap" | "BookOpen" | "BarChart3" | "Medal" | "WalletCards" | "Library" | "Activity" | "MessageSquare";
  features: string[];
}> = [
  {
    role: "SUPER_ADMIN",
    title: "Super Admin",
    summary: "Whole-school command center for school setup, staff, learners, CBC settings, finance, transport, and analytics.",
    scope: "All schools",
    icon: "ShieldCheck",
    features: ["School setup", "Academic years", "Staff and learner records", "Fees and payments", "Reports and analytics", "Notifications"]
  },
  {
    role: "TEACHER",
    title: "Teacher",
    summary: "Subject teacher workspace for learners, attendance, assignments, resources, parent communication, and CBC records.",
    scope: "Assigned classes",
    icon: "Users",
    features: ["Assigned subjects", "Attendance marking", "Assignments", "Learning resources", "Parent messages", "Competency records"]
  },
  {
    role: "CLASS_TEACHER",
    title: "Class Teacher",
    summary: "Class ownership dashboard for discipline, attendance summaries, parent contacts, and learner progress monitoring.",
    scope: "One stream",
    icon: "ClipboardCheck",
    features: ["Class profile", "Discipline records", "Parent meetings", "Communication logs", "Weak learners", "Top performers"]
  },
  {
    role: "PARENT",
    title: "Parent",
    summary: "Parent view for children only, including profiles, academics, attendance, fee balance, communication, and events.",
    scope: "Linked children",
    icon: "GraduationCap",
    features: ["CBC reports", "Exam results", "Homework", "Fee statement", "Teacher messages", "Performance trend"]
  },
  {
    role: "STUDENT",
    title: "Student",
    summary: "Learner portal for assignments, homework, notes, CBC projects, timetable, results, attendance, and resources.",
    scope: "Own records",
    icon: "BookOpen",
    features: ["Assignments", "Homework", "Notes", "CBC projects", "Timetable", "Learning resources"]
  },
  {
    role: "EXAMS_OFFICER",
    title: "Exams Department",
    summary: "CBC assessment office for grade-level assessment areas, marks, competency scoring, positions, and trend analysis.",
    scope: "Assessment office",
    icon: "BarChart3",
    features: ["CBC setup", "Subject analysis", "Teacher analysis", "Stream performance", "Rankings", "Report cards"]
  },
  {
    role: "SPORTS_OFFICER",
    title: "Sports Department",
    summary: "Sports desk for team registration, training schedules, player profiles, results, and tournaments.",
    scope: "Sports teams",
    icon: "Medal",
    features: ["Team registration", "Training schedule", "Player profiles", "Match results", "Tournament tracking", "Fixtures"]
  },
  {
    role: "ACCOUNTANT",
    title: "Finance",
    summary: "Finance office for fee structures, payments, arrears, collection reports, and payment integration readiness.",
    scope: "Finance office",
    icon: "WalletCards",
    features: ["Fee structures", "Payment records", "Arrears", "Daily collection", "Monthly reports", "M-Pesa readiness"]
  },
  {
    role: "LIBRARIAN",
    title: "Library",
    summary: "Library management for inventory, borrowing, returns, fines, and digital learning materials.",
    scope: "Library desk",
    icon: "Library",
    features: ["Book inventory", "Borrowing", "Returns", "Fines", "Digital library", "Resource uploads"]
  },
  {
    role: "NURSE",
    title: "Health",
    summary: "Health office for medical records, allergies, clinic visits, emergency contacts, and alerts.",
    scope: "Clinic",
    icon: "Activity",
    features: ["Medical records", "Allergies", "Clinic visits", "Emergency contacts", "Health alerts", "Visit history"]
  },
  {
    role: "SECRETARY",
    title: "Secretary",
    summary: "Front office workspace for school communication, documents, visitor records, and operational notices.",
    scope: "Front office",
    icon: "MessageSquare",
    features: ["Bulk notices", "Documents", "Parent alerts", "Event reminders", "Records", "Communication logs"]
  }
];

export const students = [
  { name: "Amani Otieno", grade: "Grade 4 West", overallScore: 91, risk: "Stable" },
  { name: "Wanjiku Mwangi", grade: "Grade 7 North", overallScore: 78, risk: "Stable" },
  { name: "Brian Kiptoo", grade: "Grade 6 East", overallScore: 63, risk: "Watch" },
  { name: "Neema Achieng", grade: "Grade 3 Blue", overallScore: 47, risk: "High" }
];

export const financeRows = [
  { label: "Expected fees", value: "KES 10.2M", caption: "Current term billing" },
  { label: "Collected", value: "KES 8.4M", caption: "Cash, bank, and mobile money" },
  { label: "Arrears", value: "KES 1.8M", caption: "Fee reminder queue ready" },
  { label: "Today", value: "KES 326K", caption: "Daily collection report" }
];

export const timetable: TimetableDay[] = [
  {
    day: "Monday",
    lessons: [
      { time: "8:00", subject: "Mathematics", teacher: "Mr. Kariuki" },
      { time: "9:00", subject: "English", teacher: "Ms. Njeri" },
      { time: "10:30", subject: "Science & Technology", teacher: "Mr. Otieno" },
      { time: "11:30", subject: "Kiswahili", teacher: "Ms. Auma" },
      { time: "2:00", subject: "Agriculture", teacher: "Mr. Barasa" }
    ]
  },
  {
    day: "Tuesday",
    lessons: [
      { time: "8:00", subject: "Integrated Science", teacher: "Ms. Chebet" },
      { time: "9:00", subject: "Social Studies", teacher: "Mr. Mwangi" },
      { time: "10:30", subject: "Pre-Technical", teacher: "Mr. Onyango" },
      { time: "11:30", subject: "CRE/IRE/HRE", teacher: "Ms. Fatuma" },
      { time: "2:00", subject: "Sports", teacher: "Coach Kamau" }
    ]
  }
];

export const moduleMap: Array<{
  name: string;
  description: string;
  icon: "Bell" | "CalendarDays" | "Library" | "Activity" | "LineChart" | "WalletCards" | "BookOpen" | "Users";
}> = [
  { name: "Notifications", description: "SMS alerts for fees, attendance, exams, events, and emergencies.", icon: "Bell" },
  { name: "Timetables", description: "Constraint-aware lesson allocation for primary and JSS teachers.", icon: "CalendarDays" },
  { name: "Library", description: "Inventory, borrowing, returns, fines, and digital resources.", icon: "Library" },
  { name: "Health", description: "Medical records, allergies, clinic visits, and emergency contacts.", icon: "Activity" },
  { name: "Analytics", description: "CBC, attendance, finance, and school performance dashboards.", icon: "LineChart" },
  { name: "Finance", description: "Fees, arrears, payment history, and collection reporting.", icon: "WalletCards" },
  { name: "Documents", description: "R2-backed storage for certificates, reports, photos, and files.", icon: "BookOpen" },
  { name: "People", description: "Students, parents, teachers, workers, classes, streams, and roles.", icon: "Users" }
];
