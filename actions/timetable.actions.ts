"use server";

import { createDefaultTeacherProfiles, generateSchoolTimetable, type TimetableGenerationInput } from "@/services";

export async function generateTimetableAction(input?: Partial<TimetableGenerationInput>) {
  return generateSchoolTimetable({
    subjects: input?.subjects?.length
      ? input.subjects
      : ["Mathematics", "English", "Kiswahili", "Integrated Science", "Agriculture"],
    teachers: input?.teachers?.length ? input.teachers : createDefaultTeacherProfiles()
  });
}
