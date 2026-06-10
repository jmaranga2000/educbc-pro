import { NextResponse } from "next/server";
import { getCbcAssessmentLevels } from "@/services";

export function GET() {
  return NextResponse.json(getCbcAssessmentLevels());
}
