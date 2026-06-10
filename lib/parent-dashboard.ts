import type { LucideIcon } from "lucide-react";
import { Bell, BookOpenCheck, CreditCard, GraduationCap, LineChart, MessageSquareText } from "lucide-react";

export type ParentModule = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const parentProfile = {
  name: "Mary Njeri",
  phone: "+254 711 201 001",
  email: "mary.njeri@example.com",
  relationship: "Mother",
  verified: "Verified",
  childrenCount: 2,
  unreadMessages: 4,
  totalBalance: "KES 7,800"
};

export const parentModules: ParentModule[] = [
  module("children", "Children", "Linked learner profiles, class teachers, contacts, and school records.", GraduationCap),
  module("academics", "Academics", "Exam results, CBC reports, homework, assignments, and subject performance.", BookOpenCheck),
  module("fees", "Fees", "Fee balances, statements, vote heads, payments, and receipts.", CreditCard),
  module("attendance", "Attendance", "Daily attendance, absence alerts, late records, and term attendance.", Bell),
  module("communication", "Communication", "Teacher messages, school notices, events, alerts, and replies.", MessageSquareText),
  module("progress", "Progress", "Performance trends, class ranking, CBC bands, and subject movement.", LineChart)
];

export type ParentChild = {
  id: string;
  admissionNumber: string;
  name: string;
  grade: string;
  stream: string;
  classTeacher: string;
  classTeacherPhone: string;
  feeBalance: string;
  attendance: string;
  mean: number;
  cbcBand: "EE" | "ME" | "AE" | "BE";
  healthNote: string;
  transport: string;
  subjects: Array<{ subject: string; score: number; teacher: string; comment: string }>;
  progressHistory: Array<{ term: string; mean: number; rank: number }>;
  attendanceRecords: Array<{ date: string; status: string; note: string }>;
  feeStatement: Array<{ item: string; expected: string; paid: string; balance: string }>;
};

export const parentChildren: ParentChild[] = [
  child(
    "child-001",
    "G6E-001",
    "Faith Njeri",
    "Grade 6",
    "East",
    "Mr. Peter Kamau",
    "+254 700 111 201",
    "KES 0",
    "98%",
    91,
    "EE",
    "No active health flags",
    "Not enrolled",
    3
  ),
  child(
    "child-002",
    "G4W-018",
    "Ryan Mwangi",
    "Grade 4",
    "West",
    "Ms. Caroline Atieno",
    "+254 700 111 211",
    "KES 7,800",
    "93%",
    76,
    "ME",
    "Uses spectacles",
    "Route 4 - Westlands",
    12
  )
];

export const parentMessages = [
  { id: "pmsg-001", title: "CBC project reminder", from: "Mr. Peter Kamau", child: "Faith Njeri", channel: "SMS", status: "Unread", date: "2026-06-10", message: "Please help Faith submit the environment project evidence by Friday." },
  { id: "pmsg-002", title: "Fee balance reminder", from: "Finance Office", child: "Ryan Mwangi", channel: "SMS", status: "Unread", date: "2026-06-09", message: "Ryan has an outstanding balance of KES 7,800 for Term 2." },
  { id: "pmsg-003", title: "Attendance note", from: "Ms. Caroline Atieno", child: "Ryan Mwangi", channel: "In-app", status: "Read", date: "2026-06-08", message: "Ryan arrived late on Monday. Kindly confirm transport arrangements." }
];

export function getParentModule(slug: string) {
  return parentModules.find((item) => item.slug === slug);
}

export function getParentChild(childId: string) {
  return parentChildren.find((child) => child.id === childId);
}

export function getParentMessage(messageId: string) {
  return parentMessages.find((message) => message.id === messageId);
}

function module(slug: string, title: string, description: string, icon: LucideIcon): ParentModule {
  return { slug, title, description, icon };
}

function child(
  id: string,
  admissionNumber: string,
  name: string,
  grade: string,
  stream: string,
  classTeacher: string,
  classTeacherPhone: string,
  feeBalance: string,
  attendance: string,
  mean: number,
  cbcBand: "EE" | "ME" | "AE" | "BE",
  healthNote: string,
  transport: string,
  rankBase: number
): ParentChild {
  return {
    id,
    admissionNumber,
    name,
    grade,
    stream,
    classTeacher,
    classTeacherPhone,
    feeBalance,
    attendance,
    mean,
    cbcBand,
    healthNote,
    transport,
    subjects: [
      { subject: "Mathematics", score: Math.max(45, mean - 4), teacher: "Mr. Daniel Otieno", comment: "Steady practice needed." },
      { subject: "English", score: Math.min(96, mean + 3), teacher: "Ms. Irene Wambui", comment: "Strong language work." },
      { subject: "Kiswahili", score: Math.max(42, mean - 2), teacher: "Ms. Mercy Akinyi", comment: "Improve writing detail." },
      { subject: "Science", score: Math.min(94, mean + 1), teacher: "Mr. Collins Otieno", comment: "Good practical evidence." }
    ],
    progressHistory: [
      { term: "2025 T1", mean: Math.max(40, mean - 10), rank: rankBase + 5 },
      { term: "2025 T2", mean: Math.max(40, mean - 7), rank: rankBase + 3 },
      { term: "2025 T3", mean: Math.max(40, mean - 4), rank: rankBase + 2 },
      { term: "2026 T1", mean: Math.max(40, mean - 2), rank: rankBase + 1 },
      { term: "2026 T2", mean, rank: rankBase }
    ],
    attendanceRecords: [
      { date: "2026-06-10", status: "Present", note: "On time" },
      { date: "2026-06-09", status: Number(attendance.replace("%", "")) > 95 ? "Present" : "Late", note: Number(attendance.replace("%", "")) > 95 ? "On time" : "Arrived after roll call" },
      { date: "2026-06-08", status: "Present", note: "On time" }
    ],
    feeStatement: [
      { item: "Tuition", expected: "KES 18,000", paid: feeBalance === "KES 0" ? "KES 18,000" : "KES 14,000", balance: feeBalance === "KES 0" ? "KES 0" : "KES 4,000" },
      { item: "Meals", expected: "KES 8,000", paid: feeBalance === "KES 0" ? "KES 8,000" : "KES 6,200", balance: feeBalance === "KES 0" ? "KES 0" : "KES 1,800" },
      { item: "Activity", expected: "KES 2,000", paid: feeBalance === "KES 0" ? "KES 2,000" : "KES 0", balance: feeBalance === "KES 0" ? "KES 0" : "KES 2,000" }
    ]
  };
}
