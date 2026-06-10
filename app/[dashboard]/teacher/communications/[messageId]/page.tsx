import { CommunicationDetailsPage } from "@/components/dashboard/teacher/teacher-pages";

export default async function CommunicationDetailsRoutePage({ params }: { params: Promise<{ messageId: string }> }) {
  const { messageId } = await params;

  return <CommunicationDetailsPage id={messageId} />;
}
