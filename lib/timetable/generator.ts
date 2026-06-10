import type { TimetableDay, TimetableLesson } from "@/lib/types";
import { DEFAULT_LESSON_TIMES, SCHOOL_DAYS } from "@/constants";

export type TeacherProfile = {
  name: string;
  subjects: string[];
  level: "PRIMARY" | "JSS";
  maxLessonsPerDay: number;
  unavailable?: string[];
};

export function generateTimetable(subjects: string[], teachers: TeacherProfile[]): TimetableDay[] {
  const teacherLoad = new Map<string, number>();

  return SCHOOL_DAYS.map((day) => ({
    day,
    lessons: DEFAULT_LESSON_TIMES.map((time, index) => {
      const subject = subjects[index % subjects.length];
      const teacher = pickTeacher(subject, teachers, day, teacherLoad);
      teacherLoad.set(`${day}:${teacher.name}`, (teacherLoad.get(`${day}:${teacher.name}`) ?? 0) + 1);

      return {
        time,
        subject,
        teacher: teacher.name
      };
    })
  }));
}

function pickTeacher(subject: string, teachers: TeacherProfile[], day: string, load: Map<string, number>): TeacherProfile {
  const available = teachers.filter((teacher) => {
    const dayLoad = load.get(`${day}:${teacher.name}`) ?? 0;
    return teacher.subjects.includes(subject) && !teacher.unavailable?.includes(day) && dayLoad < teacher.maxLessonsPerDay;
  });

  return available[0] ?? {
    name: "Unassigned",
    subjects: [subject],
    level: "PRIMARY",
    maxLessonsPerDay: 0
  };
}

export function flattenTimetable(daysToFlatten: TimetableDay[]): TimetableLesson[] {
  return daysToFlatten.flatMap((day) => day.lessons);
}
