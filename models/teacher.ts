import { Schema, model, models } from "mongoose";
import type { TeacherLevel } from "@/types";

export type TeacherDocument = {
  userId: string;
  employeeNumber: string;
  subjects: string[];
  qualification?: string;
  tscNumber?: string;
  level: TeacherLevel;
  assignedClassIds: string[];
  availableDays: string[];
  maxLessonsPerDay: number;
};

const teacherSchema = new Schema<TeacherDocument>(
  {
    userId: { type: String, required: true, unique: true },
    employeeNumber: { type: String, required: true, unique: true },
    subjects: [{ type: String, index: true }],
    qualification: { type: String },
    tscNumber: { type: String },
    level: { type: String, enum: ["PRIMARY", "JSS"], required: true },
    assignedClassIds: [{ type: String }],
    availableDays: [{ type: String }],
    maxLessonsPerDay: { type: Number, default: 4 }
  },
  { timestamps: true }
);

export const Teacher = models.Teacher || model<TeacherDocument>("Teacher", teacherSchema);
