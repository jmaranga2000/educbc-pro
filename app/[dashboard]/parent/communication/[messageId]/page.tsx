import { ParentMessageDetailsPage } from "@/components/dashboard/parent/parent-pages";

export default async function MessageDetailsRoutePage({ params }: { params: Promise<{ messageId: string }> }) {
  const { messageId } = await params;

  return <ParentMessageDetailsPage messageId={messageId} />;
}
