"use server";

import type { RecordCbcAssessmentDto } from "@/dtos";
import { gradeFromScore } from "@/lib/cbc";
import { previewCbcAssessment } from "@/services";

export async function calculateCbcBandAction(score: number) {
  return gradeFromScore(score);
}

export async function previewCbcAssessmentAction(input: RecordCbcAssessmentDto) {
  return previewCbcAssessment(input);
}
