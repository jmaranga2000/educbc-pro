import { ClassParentDetailsPage } from "@/components/dashboard/class-teacher/parents-page";

export default async function ParentDetailsRoutePage({ params }: { params: Promise<{ parentId: string }> }) {
  const { parentId } = await params;

  return <ClassParentDetailsPage parentId={parentId} />;
}
