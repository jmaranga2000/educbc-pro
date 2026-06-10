import type { AttendanceStatus, CbcBandLabel, CbcLevel, TimetableDay } from "@/types";

export type AcademicYearDto = {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
};

export type TermDto = {
  id: string;
  name: string;
  academicYearId: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
};

export type ClassDto = {
  id: string;
  name: string;
  grade: string;
  streamId: string;
  classTeacherId?: string;
  academicYearId: string;
};

export type SubjectDto = {
  id: string;
  name: string;
  code: string;
  level: CbcLevel;
  grades: string[];
  isCompulsory: boolean;
};

export type AttendanceDto = {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
  markedBy: string;
};

export type AssignmentDto = {
  id: string;
  title: string;
  subjectId: string;
  classId: string;
  teacherId: string;
  dueAt: string;
  attachmentIds: string[];
};

export type CbcAssessmentDto = {
  id: string;
  studentId: string;
  grade: string;
  subject: string;
  competencyScore: number;
  projectScore?: number;
  practicalScore?: number;
  overallScore: number;
  band: CbcBandLabel;
  term: string;
  academicYear: string;
};

export type RecordCbcAssessmentDto = Omit<CbcAssessmentDto, "id" | "overallScore" | "band">;

export type TimetableDto = {
  id: string;
  classId: string;
  academicYearId: string;
  termId: string;
  days: TimetableDay[];
};
