import { prisma } from "@/lib/prisma";
import UserDashboard from "@/components/UserDashboard";

// Force dynamic rendering so we always get fresh data on page load
export const dynamic = "force-dynamic";

export default async function Page() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
  });

  return <UserDashboard initialUsers={users} />;
}
