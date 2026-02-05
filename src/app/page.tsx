import { prisma } from "@/lib/prisma";
import UserDashboard from "@/components/UserDashboard";

export const dynamic = "force-dynamic";

export default async function Page() {
  const users = prisma
    ? await prisma.user.findMany({
        orderBy: { createdAt: "asc" },
      })
    : [];

  return <UserDashboard initialUsers={users} />;
}
