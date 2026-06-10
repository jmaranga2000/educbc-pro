import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Layers3,
  LineChart,
  Settings2,
  ShieldAlert,
  Stamp
} from "lucide-react";

export type ExamsModule = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const examsProfile = {
  officer: "Mrs. Beatrice Auma",
  department: "Exams Department",
  activePeriod: "Term 2 Continuous Assessment",
  assessments: 2418,
  completion: "86%",
  reportsReady: 316,
  pendingApprovals: 42
};

export const examsModules: ExamsModule[] = [
  module("cbc-assessment-engine", "CBC Assessment Engine", "Curriculum hierarchy, competencies, scoring, workflow, reports, and analytics.", ClipboardCheck),
  module("assessment-periods", "Assessment Periods", "Create and manage assessment windows, terms, and exam cycles.", BookOpenCheck),
  module("lower-primary", "Lower Primary", "Grade 1-3 learning areas, strands, outcomes, and indicators.", GraduationCap),
  module("upper-primary", "Upper Primary", "Grade 4-6 curriculum assessment structure and completion status.", Layers3),
  module("junior-secondary", "Junior Secondary", "Grade 7-9 assessment structure, subjects, teachers, and trends.", Layers3),
  module("grading-system", "Grading System", "CBC achievement levels, configurable boundaries, and remarks templates.", Settings2),
  module("performance-analytics", "Performance Analytics", "Learner, class, grade, stream, subject, and school performance analytics.", LineChart),
  module("subject-analysis", "Subject Analysis", "Subject means, teacher comparison, grade performance, and trend analysis.", BarChart3),
  module("report-cards", "Report Cards", "Generate, review, approve, publish, and export CBC report cards.", FileText),
  module("approvals", "Approvals", "Class teacher reviews, head teacher approvals, publishing, and parent visibility.", Stamp),
  module("at-risk-learners", "At-Risk Learners", "Detect learners needing intervention using BE ratings, attendance, and trends.", ShieldAlert)
];

export const cbcEngineSpec = {
  hierarchy: ["Learning Area", "Strand", "Sub-Strand", "Learning Outcome", "Indicator", "Assessment"],
  competencies: [
    "Communication and Collaboration",
    "Critical Thinking and Problem Solving",
    "Creativity and Imagination",
    "Citizenship",
    "Learning to Learn",
    "Self-Efficacy",
    "Digital Literacy"
  ],
  assessmentTypes: [
    "Observation",
    "Oral Assessment",
    "Written Assessment",
    "Practical Assessment",
    "Project Assessment",
    "Portfolio Assessment",
    "Peer Assessment",
    "Self Assessment",
    "Continuous Assessment",
    "End Term Assessment"
  ],
  scoring: [
    { range: "90 - 100", level: "EE", value: "4", remark: "Excellent mastery of concepts and consistently demonstrates outstanding competency." },
    { range: "75 - 89", level: "ME", value: "3", remark: "Shows good understanding and demonstrates expected competencies." },
    { range: "50 - 74", level: "AE", value: "2", remark: "Progressing well but requires additional support in some areas." },
    { range: "0 - 49", level: "BE", value: "1", remark: "Requires significant support and intervention to achieve expected competencies." }
  ],
  collections: [
    "learning_areas",
    "strands",
    "sub_strands",
    "learning_outcomes",
    "indicators",
    "competencies",
    "assessments",
    "assessment_scores",
    "competency_scores",
    "student_reports",
    "class_reports",
    "school_reports",
    "remarks_templates",
    "grading_systems"
  ],
  workflow: ["Teacher creates assessment", "Teacher enters scores", "System calculates levels and remarks", "Class Teacher reviews", "Head Teacher approves", "Reports become visible to parents"]
};

export const assessmentPeriods = [
  { id: "period-001", name: "Term 2 Continuous Assessment", term: "Term 2 2026", status: "Active", completion: "86%", assessments: 1240 },
  { id: "period-002", name: "Term 2 End Term Assessment", term: "Term 2 2026", status: "Draft", completion: "12%", assessments: 420 },
  { id: "period-003", name: "Term 1 Final Reports", term: "Term 1 2026", status: "Published", completion: "100%", assessments: 2180 }
];

export const curriculumLevels = [
  { id: "lower-primary", level: "Lower Primary", grades: "Grade 1-3", areas: "Literacy, Numeracy, Environmental Activities, Hygiene", completion: "91%", learners: 386 },
  { id: "upper-primary", level: "Upper Primary", grades: "Grade 4-6", areas: "Mathematics, English, Kiswahili, Science, Social Studies", completion: "87%", learners: 428 },
  { id: "junior-secondary", level: "Junior Secondary", grades: "Grade 7-9", areas: "Integrated Science, Pre-Technical, Agriculture, CRE/IRE/HRE, Languages", completion: "78%", learners: 294 }
];

export const performanceRows = [
  { id: "perf-001", name: "Grade 6 East", scope: "Stream", mean: 78, achievement: "ME", completion: "92%", top: "Faith Njeri", risk: 4 },
  { id: "perf-002", name: "Grade 7 South", scope: "Stream", mean: 71, achievement: "AE", completion: "81%", top: "Asha Mohamed", risk: 9 },
  { id: "perf-003", name: "Mathematics", scope: "Subject", mean: 69, achievement: "AE", completion: "88%", top: "Grade 6 East", risk: 18 },
  { id: "perf-004", name: "Communication", scope: "Competency", mean: 82, achievement: "ME", completion: "90%", top: "Upper Primary", risk: 7 }
];

export const subjectRows = [
  { id: "subject-001", subject: "Mathematics", teacher: "Mr. Daniel Otieno", grade: "Grade 6", mean: 76, trend: "+4%", completion: "89%" },
  { id: "subject-002", subject: "English", teacher: "Ms. Irene Wambui", grade: "Grade 6", mean: 82, trend: "+6%", completion: "94%" },
  { id: "subject-003", subject: "Integrated Science", teacher: "Mr. Collins Otieno", grade: "Grade 8", mean: 68, trend: "-3%", completion: "77%" }
];

export const reportCards = [
  { id: "report-001", student: "Faith Njeri", admission: "G6E-001", grade: "Grade 6 East", status: "Ready", approval: "Class Teacher reviewed", export: "PDF, Excel" },
  { id: "report-002", student: "Ryan Mwangi", admission: "G4W-018", grade: "Grade 4 West", status: "Draft", approval: "Missing head teacher remarks", export: "Pending" },
  { id: "report-003", student: "Asha Mohamed", admission: "G7S-006", grade: "Grade 7 South", status: "Approved", approval: "Ready for parent visibility", export: "PDF, Excel" }
];

export const approvalQueue = [
  { id: "approval-001", item: "Grade 6 East report cards", owner: "Mr. Peter Kamau", stage: "Head Teacher Approval", due: "2026-06-14", status: "Pending" },
  { id: "approval-002", item: "Grade 8 Science assessments", owner: "Mr. Collins Otieno", stage: "Class Teacher Review", due: "2026-06-12", status: "Returned" },
  { id: "approval-003", item: "Term 2 publishing batch", owner: "Exams Office", stage: "Publish Results", due: "2026-06-18", status: "Ready" }
];

export const riskLearners = [
  { id: "risk-001", student: "Samuel Kariuki", grade: "Grade 6 East", reason: "Multiple BE ratings and fee stress", attendance: "81%", trend: "-8%", alert: "Teacher, Parent, Head Teacher" },
  { id: "risk-002", student: "Grace Achieng", grade: "Grade 6 East", reason: "Declining reading trend", attendance: "86%", trend: "-5%", alert: "Teacher, Class Teacher, Parent" },
  { id: "risk-003", student: "Peter Maina", grade: "Grade 5 North", reason: "Incomplete assessments", attendance: "90%", trend: "-2%", alert: "Teacher, Class Teacher" }
];

export function getExamsModule(slug: string) {
  return examsModules.find((item) => item.slug === slug);
}

export function findExamsRecord(id: string) {
  return [...assessmentPeriods, ...performanceRows, ...subjectRows, ...reportCards, ...approvalQueue, ...riskLearners].find((item) => item.id === id);
}

function module(slug: string, title: string, description: string, icon: LucideIcon): ExamsModule {
  return { slug, title, description, icon };
}
