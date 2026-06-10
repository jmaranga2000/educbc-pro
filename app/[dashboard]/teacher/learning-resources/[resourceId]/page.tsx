import { LearningResourceDetailsPage } from "@/components/dashboard/teacher/teacher-pages";

export default async function LearningResourceDetailsRoutePage({ params }: { params: Promise<{ resourceId: string }> }) {
  const { resourceId } = await params;

  return <LearningResourceDetailsPage id={resourceId} />;
}
