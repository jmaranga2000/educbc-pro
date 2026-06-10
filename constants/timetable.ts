export const SCHOOL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export const DEFAULT_LESSON_TIMES = ["8:00", "9:00", "10:30", "11:30", "2:00"] as const;

export const TIMETABLE_CONSTRAINTS = [
  "teacher availability",
  "subject requirements",
  "maximum lessons/day",
  "break time",
  "lunch time"
] as const;

export const TIMETABLE_ALGORITHM_STEPS = [
  "Calculate total lessons needed",
  "Allocate compulsory subjects first",
  "Allocate specialized teachers",
  "Allocate practical subjects",
  "Resolve conflicts",
  "Optimize schedule",
  "Generate timetable"
] as const;
