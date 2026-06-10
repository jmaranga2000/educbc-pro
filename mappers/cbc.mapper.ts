import type { CbcAssessmentDto } from "@/dtos";
import { gradeFromScore, meanScore } from "@/lib/cbc";
import type { CbcAssessmentDocument } from "@/models/cbc-assessment";
import { documentId, type WithMongoId } from "./mapping-utils";

export function toCbcAssessmentDto(assessment: WithMongoId<CbcAssessmentDocument>): CbcAssessmentDto {
  const overallScore = meanScore([
    assessment.competencyScore,
    assessment.projectScore ?? assessment.competencyScore,
    assessment.practicalScore ?? assessment.competencyScore
  ]);
  const band = gradeFromScore(overallScore);

  return {
    id: documentId(assessment),
    studentId: assessment.studentId,
    grade: assessment.grade,
    subject: assessment.subject,
    competencyScore: assessment.competencyScore,
    projectScore: assessment.projectScore,
    practicalScore: assessment.practicalScore,
    overallScore,
    band: band.label,
    term: assessment.term,
    academicYear: assessment.academicYear
  };
}
