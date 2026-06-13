import type { EntityStatus, Role, TeacherLevel, WorkerRole } from "@/types";

export type UserDto = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  twoFactorEnabled: boolean;
};

export type CreateUserDto = {
  name: string;
  email: string;
  phone?: string;
  role: Role;
  password: string;
};

export type StudentDto = {
  id: string;
  admissionNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  age: number;
  grade: string;
  stream: string;
  parentIds: string[];
  feeBalance: number;
  status: EntityStatus;
  homePlace?: string;
};

export type AdmitStudentDto = {
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  grade: string;
  stream: string;
  healthRecords?: string;
  parentName: string;
  parentPhone: string;
  homePlace?: string;
};

export type CreateStudentDto = {
  admissionNumber: string;
  firstName: string;
  lastName: string;
  grade: string;
  stream: string;
  parentIds?: string[];
};

export type ParentDto = {
  id: string;
  userId: string;
  relationship: string;
  studentIds: string[];
  occupation?: string;
};

export type TeacherDto = {
  id: string;
  userId: string;
  employeeNumber: string;
  subjects: string[];
  qualification?: string;
  tscNumber?: string;
  level: TeacherLevel;
  assignedClassIds: string[];
};

export type WorkerDto = {
  id: string;
  userId: string;
  employeeNumber: string;
  role: WorkerRole;
  department: string;
  status: EntityStatus;
};
