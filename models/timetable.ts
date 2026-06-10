import { Schema, model, models } from "mongoose";
import type { TimetableDay } from "@/types";

export type TimetableDocument = {
  classId: string;
  academicYearId: string;
  termId: string;
  days: TimetableDay[];
  constraints: string[];
  generatedBy?: string;
};

const timetableLessonSchema = new Schema(
  {
    time: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: String, required: true }
  },
  { _id: false }
);

const timetableDaySchema = new Schema(
  {
    day: { type: String, required: true },
    lessons: [timetableLessonSchema]
  },
  { _id: false }
);

const timetableSchema = new Schema<TimetableDocument>(
  {
    classId: { type: String, required: true, index: true },
    academicYearId: { type: String, required: true, index: true },
    termId: { type: String, required: true, index: true },
    days: [timetableDaySchema],
    constraints: [{ type: String }],
    generatedBy: { type: String }
  },
  { timestamps: true }
);

export const Timetable = models.Timetable || model<TimetableDocument>("Timetable", timetableSchema);
