import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  BookOpenCheck,
  ClipboardCheck,
  GraduationCap,
  MessageSquareText,
  ShieldAlert,
  UserRound,
  Users,
  UsersRound
} from "lucide-react";

export type ClassTeacherModule = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  stats: Array<{ label: string; value: string; detail: string }>;
  records: Array<{ title: string; detail: string; status: string }>;
  actions: string[];
};

export const classTeacherProfile = {
  teacherName: "Mr. Peter Kamau",
  className: "Grade 6 East",
  room: "Room 14",
  term: "Term 2, 2026",
  learners: 42,
  attendance: "92%",
  cbcProgress: "76%",
  parentReach: "95%"
};

export const assignedClassTeachers = [
  { name: "Mr. Peter Kamau", role: "Class Teacher", subject: "Mathematics", phone: "+254 700 111 201" },
  { name: "Ms. Irene Wambui", role: "Deputy Class Teacher", subject: "English", phone: "+254 700 111 202" },
  { name: "Mr. Collins Otieno", role: "Subject Teacher", subject: "Science and Technology", phone: "+254 700 111 203" },
  { name: "Ms. Mercy Akinyi", role: "Subject Teacher", subject: "Kiswahili", phone: "+254 700 111 204" },
  { name: "Mr. David Mutua", role: "Subject Teacher", subject: "Social Studies", phone: "+254 700 111 205" }
];

export const classLeaders = {
  prefect: "Faith Njeri",
  assistantPrefect: "Brian Otieno",
  healthMonitor: "Amina Yusuf",
  libraryMonitor: "Kevin Mwangi"
};

export type ClassStudent = {
  id: string;
  admissionNumber: string;
  name: string;
  home: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  performance: number;
  feeBalance: string;
  healthCondition: string;
  attendance: string;
  cbcBand: "EE" | "ME" | "AE" | "BE";
  records: Array<{ title: string; detail: string; status: string }>;
  performanceHistory: Array<{ year: string; term: string; mean: number; position: number }>;
  subjectScores: Array<{ subject: string; score: number; comment: string }>;
};

export const subjectPerformance = [
  { subject: "Mathematics", mean: 76, topStudent: "Faith Njeri", concern: "Fractions and word problems" },
  { subject: "English", mean: 81, topStudent: "Brian Otieno", concern: "Composition structure" },
  { subject: "Kiswahili", mean: 73, topStudent: "Amina Yusuf", concern: "Insha development" },
  { subject: "Science and Technology", mean: 69, topStudent: "Kevin Mwangi", concern: "Practical write-ups" },
  { subject: "Social Studies", mean: 78, topStudent: "Faith Njeri", concern: "Map interpretation" }
];

export const classStudents: ClassStudent[] = [
  student("stu-001", "G6E-001", "Faith Njeri", "Kangemi", "par-001", "Mary Njeri", "+254 711 201 001", 91, "KES 0", "None", "98%", "EE"),
  student("stu-002", "G6E-002", "Brian Otieno", "Westlands", "par-002", "James Otieno", "+254 711 201 002", 88, "KES 4,500", "Asthma - inhaler at office", "96%", "ME"),
  student("stu-003", "G6E-003", "Amina Yusuf", "Parklands", "par-003", "Fatuma Yusuf", "+254 711 201 003", 83, "KES 0", "Peanut allergy", "94%", "ME"),
  student("stu-004", "G6E-004", "Kevin Mwangi", "Loresho", "par-004", "Paul Mwangi", "+254 711 201 004", 79, "KES 2,100", "None", "93%", "ME"),
  student("stu-005", "G6E-005", "Sharon Wairimu", "Kileleshwa", "par-005", "Lucy Wairimu", "+254 711 201 005", 72, "KES 8,800", "Uses spectacles", "91%", "AE"),
  student("stu-006", "G6E-006", "Daniel Kiptoo", "Uthiru", "par-006", "Joseph Kiptoo", "+254 711 201 006", 64, "KES 12,400", "None", "89%", "AE"),
  student("stu-007", "G6E-007", "Grace Achieng", "Kawangware", "par-007", "Rose Achieng", "+254 711 201 007", 58, "KES 6,300", "Recurring migraines", "86%", "AE"),
  student("stu-008", "G6E-008", "Samuel Kariuki", "Mountain View", "par-008", "Peter Kariuki", "+254 711 201 008", 46, "KES 14,900", "None", "81%", "BE")
];

export const classParents = classStudents.map((student) => ({
  id: student.parentId,
  studentId: student.id,
  studentName: student.name,
  name: student.parentName,
  phone: student.parentPhone,
  email: `${student.parentName.toLowerCase().replaceAll(" ", ".")}@example.com`,
  home: student.home,
  relationship: student.parentName.split(" ")[0] === "James" || student.parentName.split(" ")[0] === "Paul" ? "Father" : "Mother",
  emergencyContact: student.parentPhone,
  communicationStatus: Number(student.attendance.replace("%", "")) >= 90 ? "Verified" : "Needs follow-up"
}));

export const disciplineCategories = [
  "Stealing",
  "Fighting",
  "Exam Cheating",
  "Disrespect",
  "Bullying",
  "Substance Abuse"
];

export const parentMessages = [
  { id: "msg-001", title: "Attendance follow-up", audience: "Parents of absent learners", status: "Queued", channel: "SMS", createdAt: "2026-06-08" },
  { id: "msg-002", title: "CBC project reminder", audience: "Grade 6 East parents", status: "Sent", channel: "SMS", createdAt: "2026-06-07" },
  { id: "msg-003", title: "Discipline meeting notice", audience: "Selected parents", status: "Draft", channel: "SMS", createdAt: "2026-06-06" }
];

export const classTeacherModules: ClassTeacherModule[] = [
  module("complete-class", "Complete Class", "Full stream overview, learner balance, prefects, and class operations.", ClipboardCheck, [
    ["Learners", "42", "Grade 6 East roll"],
    ["Streams", "1", "Primary assigned stream"],
    ["Support Cases", "6", "Learners under close follow-up"]
  ], [
    ["Class register", "Learner list, admission numbers, gender balance, and stream identity.", "Current"],
    ["Leadership", "Class prefect, assistant prefect, group leaders, and class responsibilities.", "Assigned"],
    ["Class notes", "Daily observations, support notes, and follow-up priorities.", "Open"]
  ], ["Update class notes", "Print register", "Review support list"]),
  module("profile", "Profile", "Class teacher profile, assigned class, subjects, contacts, and responsibilities.", UserRound, [
    ["Teacher", "1", "Class teacher assigned"],
    ["Subjects", "4", "Teaching load"],
    ["Office Hours", "3", "Parent meeting windows"]
  ], [
    ["Teacher details", "Contact information, staff number, subjects, and assigned responsibilities.", "Verified"],
    ["Class assignment", "Grade 6 East, room allocation, timetable link, and class handover notes.", "Active"],
    ["Availability", "Parent consultation hours and internal meeting slots.", "Published"]
  ], ["Edit profile", "Update availability", "View timetable"]),
  module("students", "Students", "Learners in the assigned stream with support flags and quick profile access.", Users, [
    ["Active Learners", "42", "Current stream"],
    ["New Admissions", "3", "This term"],
    ["Watch List", "6", "Academic or welfare support"]
  ], [
    ["Learner profiles", "Student identity, guardian contacts, health flags, and performance snapshot.", "Ready"],
    ["Support tracking", "Weak learners, top performers, welfare flags, and intervention notes.", "Active"],
    ["Transfers", "Incoming and outgoing learner movement for the class stream.", "Updated"]
  ], ["Add note", "View learner profile", "Export class list"]),
  module("academics", "Academics and Exams", "Exam summaries, academic performance, weak learners, and top performers.", BookOpenCheck, [
    ["Mean Score", "74%", "Latest exam cycle"],
    ["Top Performers", "8", "EE or strong ME trend"],
    ["Weak Learners", "6", "Need targeted support"]
  ], [
    ["Exam summary", "Subject means, ranking movement, and assessment completion status.", "Published"],
    ["Subject performance", "Mathematics, English, Kiswahili, Science, and Social Studies trends.", "Monitoring"],
    ["Intervention plan", "Learners needing remediation and teacher follow-up ownership.", "Active"]
  ], ["Record intervention", "Generate academic report", "Review subject trend"]),
  module("discipline-records", "Discipline Records", "Incident records, interventions, conduct notes, and resolved cases.", ShieldAlert, [
    ["Open Cases", "4", "Require follow-up"],
    ["Resolved", "11", "This term"],
    ["Parent Calls", "5", "Logged conduct calls"]
  ], [
    ["Incident log", "Date, learner, severity, staff note, and corrective action.", "Active"],
    ["Interventions", "Guidance, parent meetings, restorative action, and monitoring notes.", "In progress"],
    ["Resolved records", "Closed discipline records and conduct improvement history.", "Filed"]
  ], ["Add incident", "Schedule parent meeting", "Close record"]),
  module("parents", "Parents", "Parents and guardians linked to learners in this stream.", UsersRound, [
    ["Parents", "67", "Linked contacts"],
    ["Verified", "95%", "Reachable contacts"],
    ["Emergency Gaps", "2", "Need confirmation"]
  ], [
    ["Parent directory", "Primary parent, secondary guardian, phone, email, and relationship.", "Verified"],
    ["Linked learners", "Parent-to-student mapping for the complete class stream.", "Synced"],
    ["Emergency contacts", "Contacts to use for urgent welfare or attendance cases.", "Needs review"]
  ], ["Update contact", "Send class message", "Export directory"]),
  module("cbc-progress", "CBC Progress Tracking", "Track EE, ME, AE, and BE movement across the stream.", BarChart3, [
    ["EE", "9", "Exceeding expectations"],
    ["ME", "18", "Meeting expectations"],
    ["AE/BE", "15", "Need closer support"]
  ], [
    ["Competency bands", "Learner movement across EE, ME, AE, and BE by learning area.", "Live"],
    ["Evidence tracking", "Projects, practicals, observations, and teacher comments.", "Collecting"],
    ["Progress notes", "Narrative notes for report cards and parent conversations.", "Draft"]
  ], ["Add CBC note", "Review evidence", "Export progress"]),
  module("notifications", "Notifications to Parents", "Attendance, discipline, academic, and general parent communication.", MessageSquareText, [
    ["Queued", "18", "Messages ready"],
    ["Sent", "126", "This month"],
    ["Replies", "23", "Parent responses"]
  ], [
    ["Attendance alerts", "Absence, lateness, and return-to-school notifications.", "Ready"],
    ["Academic updates", "Weak learner follow-up, improvement notes, and exam notices.", "Draft"],
    ["Class announcements", "Events, meeting reminders, and class-wide notices.", "Scheduled"]
  ], ["Compose message", "Send attendance alert", "View message log"]),
  module("attendance", "Attendance", "Daily attendance marking, absence tracking, and attendance summaries.", Bell, [
    ["Today", "39/42", "Present learners"],
    ["Weekly", "92%", "Attendance average"],
    ["Late", "3", "Today"]
  ], [
    ["Daily register", "Present, absent, late, excused, and follow-up status.", "Open"],
    ["Absence follow-up", "Parent notification, reason, return date, and class teacher notes.", "Active"],
    ["Attendance trend", "Daily, weekly, and term summaries for the assigned stream.", "Updated"]
  ], ["Mark attendance", "Notify parents", "Download summary"])
];

export function getClassTeacherModule(slug: string) {
  return classTeacherModules.find((item) => item.slug === slug);
}

export function getClassStudent(studentId: string) {
  return classStudents.find((student) => student.id === studentId);
}

export function getClassParent(parentId: string) {
  return classParents.find((parent) => parent.id === parentId);
}

export function getStudentRecord(studentId: string, recordType: string) {
  const student = getClassStudent(studentId);

  if (!student) {
    return undefined;
  }

  return student.records.find((record) => slugFromRecordTitle(record.title) === recordType);
}

export function slugFromRecordTitle(title: string) {
  return title.toLowerCase().replaceAll(" ", "-");
}

function student(
  id: string,
  admissionNumber: string,
  name: string,
  home: string,
  parentId: string,
  parentName: string,
  parentPhone: string,
  performance: number,
  feeBalance: string,
  healthCondition: string,
  attendance: string,
  cbcBand: "EE" | "ME" | "AE" | "BE"
): ClassStudent {
  return {
    id,
    admissionNumber,
    name,
    home,
    parentId,
    parentName,
    parentPhone,
    performance,
    feeBalance,
    healthCondition,
    attendance,
    cbcBand,
    performanceHistory: buildPerformanceHistory(performance),
    subjectScores: buildSubjectScores(performance),
    records: [
      { title: "Academic record", detail: `${performance}% mean score with ${cbcBand} CBC band.`, status: "Current" },
      { title: "Fee record", detail: `${feeBalance} outstanding balance.`, status: feeBalance === "KES 0" ? "Cleared" : "Pending" },
      { title: "Health record", detail: healthCondition, status: healthCondition === "None" ? "Clear" : "Flagged" },
      { title: "Attendance record", detail: `${attendance} term attendance.`, status: Number(attendance.replace("%", "")) >= 90 ? "Good" : "Follow up" }
    ]
  };
}

function buildPerformanceHistory(currentPerformance: number) {
  const scores = [
    currentPerformance - 14,
    currentPerformance - 10,
    currentPerformance - 7,
    currentPerformance - 4,
    currentPerformance - 2,
    currentPerformance
  ].map((score) => Math.max(28, Math.min(96, score)));

  return [
    { year: "2024", term: "Term 1", mean: scores[0], position: 19 },
    { year: "2024", term: "Term 2", mean: scores[1], position: 16 },
    { year: "2024", term: "Term 3", mean: scores[2], position: 14 },
    { year: "2025", term: "Term 1", mean: scores[3], position: 11 },
    { year: "2025", term: "Term 3", mean: scores[4], position: 9 },
    { year: "2026", term: "Term 2", mean: scores[5], position: Math.max(1, 12 - Math.round(currentPerformance / 10)) }
  ];
}

function buildSubjectScores(currentPerformance: number) {
  return subjectPerformance.map((subject, index) => ({
    subject: subject.subject,
    score: Math.max(30, Math.min(96, currentPerformance + (index % 2 === 0 ? 3 : -4))),
    comment: subject.concern
  }));
}

function module(
  slug: string,
  title: string,
  description: string,
  icon: LucideIcon,
  stats: string[][],
  records: string[][],
  actions: string[]
): ClassTeacherModule {
  return {
    slug,
    title,
    description,
    icon,
    stats: stats.map(([label, value, detail]) => ({ label, value, detail })),
    records: records.map(([title, detail, status]) => ({ title, detail, status })),
    actions
  };
}
