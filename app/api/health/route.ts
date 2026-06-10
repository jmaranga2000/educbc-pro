import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name: "EduCBC Pro",
    status: "ok",
    modules: ["cbc", "timetable", "finance", "notifications", "documents", "analytics"]
  });
}
