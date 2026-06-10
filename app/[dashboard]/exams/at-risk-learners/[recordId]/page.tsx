import { ExamsRecordDetailsPage } from "@/components/dashboard/exams/exams-pages";

export default async function AtRiskLearnerDetailsRoutePage({ params }: { params: Promise<{ recordId: string }> }) {
  const { recordId } = await params;

  return <ExamsRecordDetailsPage id={recordId} />;
}
