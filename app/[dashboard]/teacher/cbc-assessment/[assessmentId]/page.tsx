import { CbcAssessmentDetailsPage } from "@/components/dashboard/teacher/teacher-pages";

export default async function CbcAssessmentDetailsRoutePage({ params }: { params: Promise<{ assessmentId: string }> }) {
  const { assessmentId } = await params;

  return <CbcAssessmentDetailsPage id={assessmentId} />;
}
