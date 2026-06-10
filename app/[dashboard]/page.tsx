import { redirect } from "next/navigation";

export default async function DashboardIndexPage({ params }: { params: Promise<{ dashboard: string }> }) {
  const { dashboard } = await params;
  redirect(`/${dashboard}/super-admin`);
}
