import { NextRequest, NextResponse } from "next/server";
import type { TeacherProfile } from "@/lib/timetable/generator";
import { createDefaultTeacherProfiles, generateSchoolTimetable } from "@/services";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    subjects?: string[];
    teachers?: TeacherProfile[];
  };

  const subjects = body.subjects?.length ? body.subjects : ["Mathematics", "English", "Kiswahili", "Integrated Science", "Agriculture"];
  const teachers = body.teachers?.length ? body.teachers : createDefaultTeacherProfiles();

  return NextResponse.json(generateSchoolTimetable({ subjects, teachers }));
}
