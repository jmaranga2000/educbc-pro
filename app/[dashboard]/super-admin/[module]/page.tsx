import { SuperAdminModuleRoute } from "@/components/dashboard/super-admin-module-route";
import { superAdminModules } from "@/lib/super-admin";

export function generateStaticParams() {
  return superAdminModules.map((item) => ({
    dashboard: "dashboard",
    module: item.slug
  }));
}

export default async function SuperAdminModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;

  return <SuperAdminModuleRoute slug={module} />;
}
