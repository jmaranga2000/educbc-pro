import { TIMETABLE_ALGORITHM_STEPS, TIMETABLE_CONSTRAINTS } from "@/constants";
import { generateTimetable, type TeacherProfile } from "@/lib/timetable/generator";

export type TimetableGenerationInput = {
  subjects: string[];
  teachers: TeacherProfile[];
};

export function generateSchoolTimetable(input: TimetableGenerationInput) {
  return {
    constraints: [...TIMETABLE_CONSTRAINTS],
    algorithm: [...TIMETABLE_ALGORITHM_STEPS],
    timetable: generateTimetable(input.subjects, input.teachers)
  };
}

export function createDefaultTeacherProfiles(): TeacherProfile[] {
  return [
    { name: "Mr. Kariuki", subjects: ["Mathematics"], level: "JSS", maxLessonsPerDay: 3 },
    { name: "Ms. Njeri", subjects: ["English"], level: "PRIMARY", maxLessonsPerDay: 4 },
    { name: "Ms. Auma", subjects: ["Kiswahili"], level: "PRIMARY", maxLessonsPerDay: 4 },
    { name: "Mr. Otieno", subjects: ["Integrated Science"], level: "JSS", maxLessonsPerDay: 3 },
    { name: "Mr. Barasa", subjects: ["Agriculture"], level: "JSS", maxLessonsPerDay: 3 }
  ];
}
