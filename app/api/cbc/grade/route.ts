import { NextRequest, NextResponse } from "next/server";
import { gradeFromScore } from "@/lib/cbc";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { score?: number };
  const score = Number(body.score ?? 0);

  return NextResponse.json({
    score,
    band: gradeFromScore(score)
  });
}
