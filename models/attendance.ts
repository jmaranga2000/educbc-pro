import { Schema, model, models } from "mongoose";
import type { AttendanceStatus } from "@/types";

export type AttendanceDocument = {
  studentId: string;
  classId: string;
  date: Date;
  status: AttendanceStatus;
  markedBy: string;
  notes?: string;
};

const attendanceSchema = new Schema<AttendanceDocument>(
  {
    studentId: { type: String, required: true, index: true },
    classId: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    status: { type: String, required: true, default: "PRESENT" },
    markedBy: { type: String, required: true },
    notes: { type: String }
  },
  { timestamps: true }
);

attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export const Attendance = models.Attendance || model<AttendanceDocument>("Attendance", attendanceSchema);
