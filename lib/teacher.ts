import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  Library,
  MessageSquareText,
  Users
} from "lucide-react";

export type TeacherModule = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const teacherProfile = {
  name: "Ms. Irene Wambui",
  staffNo: "TSC-447812",
  department: "Languages",
  subjects: "English, Creative Arts",
  classes: "Grade 5 North, Grade 6 East, Grade 7 South",
  weeklyLessons: 28,
  pendingAssignments: 6,
  cbcEntries: 142
};

export const teacherModules: TeacherModule[] = [
  module("assignments", "Assignments", "Create, track, grade, and review assignment submissions.", ClipboardList),
  module("assigned-subjects", "Assigned Subjects", "Subjects taught across the school with workload and class coverage.", BookOpen),
  module("classes", "Classes", "Assigned streams, class lists, lesson coverage, and class-level notes.", GraduationCap),
  module("students", "Students", "Students taught by this teacher with academic, attendance, and support details.", Users),
  module("attendance", "Attendance", "Mark lesson attendance and review attendance patterns for assigned classes.", Bell),
  module("learning-resources", "Learning Resources", "Notes, PDFs, videos, schemes, and lesson resources.", Library),
  module("communications", "Communications", "Messages to learners, parents, class teachers, and administrators.", MessageSquareText),
  module("cbc-assessment", "CBC Assessment", "Record competencies, projects, practical tasks, and CBC comments.", ClipboardCheck)
];

export const teacherAssignments = [
  assignment("asg-001", "English Composition", "Grade 6 East", "English", "2026-06-14", "38/42", "Open", "Write a 250-word composition on environmental conservation."),
  assignment("asg-002", "Reading Log", "Grade 5 North", "English", "2026-06-12", "31/39", "Grading", "Submit weekly reading log with parent signature."),
  assignment("asg-003", "Oral Presentation", "Grade 7 South", "Creative Arts", "2026-06-18", "0/36", "Draft", "Prepare a two-minute oral presentation with visual aid.")
];

export const assignedSubjects = [
  { id: "sub-001", subject: "English", classes: ["Grade 5 North", "Grade 6 East", "Grade 7 South"], lessons: 18, mean: 78, coverage: "82%" },
  { id: "sub-002", subject: "Creative Arts", classes: ["Grade 6 East", "Grade 7 South"], lessons: 6, mean: 81, coverage: "76%" },
  { id: "sub-003", subject: "Life Skills", classes: ["Grade 5 North"], lessons: 4, mean: 84, coverage: "91%" }
];

export const teacherClasses = [
  { id: "cls-001", name: "Grade 5 North", learners: 39, subject: "English", attendance: "94%", nextLesson: "Reading comprehension", support: 5 },
  { id: "cls-002", name: "Grade 6 East", learners: 42, subject: "English", attendance: "92%", nextLesson: "Composition writing", support: 6 },
  { id: "cls-003", name: "Grade 7 South", learners: 36, subject: "Creative Arts", attendance: "89%", nextLesson: "Oral presentation", support: 4 }
];

export type TeacherStudent = {
  id: string;
  admissionNumber: string;
  name: string;
  className: string;
  subject: string;
  mean: number;
  attendance: string;
  assignmentStatus: string;
  supportNeed: string;
  parentPhone: string;
  records: Array<{ title: string; value: string; detail: string }>;
};

export const teacherStudents: TeacherStudent[] = [
  student("tstu-001", "G6E-001", "Faith Njeri", "Grade 6 East", "English", 91, "98%", "Complete", "Extension writing tasks", "+254 711 201 001"),
  student("tstu-002", "G6E-002", "Brian Otieno", "Grade 6 East", "English", 84, "96%", "Complete", "Oral fluency", "+254 711 201 002"),
  student("tstu-003", "G6E-007", "Grace Achieng", "Grade 6 East", "English", 58, "86%", "Missing 1", "Reading comprehension", "+254 711 201 007"),
  student("tstu-004", "G5N-014", "Peter Maina", "Grade 5 North", "English", 64, "90%", "Late", "Vocabulary support", "+254 711 201 014"),
  student("tstu-005", "G7S-006", "Asha Mohamed", "Grade 7 South", "Creative Arts", 88, "95%", "Complete", "Performance portfolio", "+254 711 201 106")
];

export const attendanceSessions = [
  { id: "att-001", className: "Grade 6 East", subject: "English", date: "2026-06-10", present: 39, absent: 2, late: 1, topic: "Composition planning" },
  { id: "att-002", className: "Grade 5 North", subject: "English", date: "2026-06-09", present: 37, absent: 1, late: 1, topic: "Reading fluency" },
  { id: "att-003", className: "Grade 7 South", subject: "Creative Arts", date: "2026-06-09", present: 32, absent: 3, late: 1, topic: "Oral presentation practice" }
];

export const learningResources = [
  { id: "res-001", title: "Composition Writing Guide", type: "PDF", subject: "English", className: "Grade 6 East", downloads: 42, status: "Published" },
  { id: "res-002", title: "Reading Fluency Audio Pack", type: "Audio", subject: "English", className: "Grade 5 North", downloads: 31, status: "Published" },
  { id: "res-003", title: "Oral Presentation Rubric", type: "Document", subject: "Creative Arts", className: "Grade 7 South", downloads: 18, status: "Draft" }
];

export const teacherMessages = [
  { id: "com-001", title: "Assignment reminder", audience: "Grade 6 East parents", channel: "SMS", status: "Queued", createdAt: "2026-06-10" },
  { id: "com-002", title: "Reading log follow-up", audience: "Grade 5 North learners", channel: "In-app", status: "Sent", createdAt: "2026-06-09" },
  { id: "com-003", title: "Creative Arts rehearsal", audience: "Grade 7 South", channel: "SMS", status: "Draft", createdAt: "2026-06-08" }
];

export const cbcAssessments = [
  { id: "cbc-001", studentId: "tstu-001", studentName: "Faith Njeri", className: "Grade 6 East", subject: "English", competency: "Writing", score: 92, evidence: "Composition portfolio", comment: "Strong structure and vocabulary." },
  { id: "cbc-002", studentId: "tstu-003", studentName: "Grace Achieng", className: "Grade 6 East", subject: "English", competency: "Reading", score: 58, evidence: "Reading conference", comment: "Needs guided comprehension practice." },
  { id: "cbc-003", studentId: "tstu-005", studentName: "Asha Mohamed", className: "Grade 7 South", subject: "Creative Arts", competency: "Presentation", score: 88, evidence: "Oral presentation", comment: "Confident delivery and clear visuals." }
];

export function getTeacherModule(slug: string) {
  return teacherModules.find((item) => item.slug === slug);
}

export function getTeacherAssignment(id: string) {
  return teacherAssignments.find((item) => item.id === id);
}

export function getTeacherSubject(id: string) {
  return assignedSubjects.find((item) => item.id === id);
}

export function getTeacherClass(id: string) {
  return teacherClasses.find((item) => item.id === id);
}

export function getTeacherStudent(id: string) {
  return teacherStudents.find((item) => item.id === id);
}

export function getAttendanceSession(id: string) {
  return attendanceSessions.find((item) => item.id === id);
}

export function getLearningResource(id: string) {
  return learningResources.find((item) => item.id === id);
}

export function getTeacherMessage(id: string) {
  return teacherMessages.find((item) => item.id === id);
}

export function getCbcAssessment(id: string) {
  return cbcAssessments.find((item) => item.id === id);
}

function module(slug: string, title: string, description: string, icon: LucideIcon): TeacherModule {
  return { slug, title, description, icon };
}

function assignment(id: string, title: string, className: string, subject: string, dueDate: string, submissions: string, status: string, brief: string) {
  return { id, title, className, subject, dueDate, submissions, status, brief };
}

function student(
  id: string,
  admissionNumber: string,
  name: string,
  className: string,
  subject: string,
  mean: number,
  attendance: string,
  assignmentStatus: string,
  supportNeed: string,
  parentPhone: string
): TeacherStudent {
  return {
    id,
    admissionNumber,
    name,
    className,
    subject,
    mean,
    attendance,
    assignmentStatus,
    supportNeed,
    parentPhone,
    records: [
      { title: "Academic Progress", value: `${mean}%`, detail: `${subject} performance and teacher support notes.` },
      { title: "Assignments", value: assignmentStatus, detail: "Submission status and grading notes." },
      { title: "Attendance", value: attendance, detail: "Lesson attendance for this teacher's classes." },
      { title: "Support Need", value: supportNeed, detail: "Teacher intervention and next action." }
    ]
  };
}
