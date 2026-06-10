import { CBC_ASSESSMENT_LEVELS } from "@/constants";
import type { CbcAssessmentDto, RecordCbcAssessmentDto } from "@/dtos";
import { gradeFromScore, meanScore } from "@/lib/cbc";

export function getCbcAssessmentLevels() {
  return CBC_ASSESSMENT_LEVELS;
}

export function calculateCbcOverallScore(input: {
  competencyScore: number;
  projectScore?: number;
  practicalScore?: number;
}) {
  return meanScore([
    input.competencyScore,
    input.projectScore ?? input.competencyScore,
    input.practicalScore ?? input.competencyScore
  ]);
}

export function previewCbcAssessment(input: RecordCbcAssessmentDto): CbcAssessmentDto {
  const overallScore = calculateCbcOverallScore(input);

  return {
    id: "preview",
    ...input,
    overallScore,
    band: gradeFromScore(overallScore).label
  };
}

export function rankLearners<T extends { studentId: string; overallScore: number }>(results: T[]) {
  return [...results]
    .sort((left, right) => right.overallScore - left.overallScore)
    .map((result, index) => ({
      ...result,
      position: index + 1
    }));
}
