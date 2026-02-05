import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getUsers(): Promise<User[]> {
  if (!prisma) {
    return [];
  }

  return prisma.user.findMany({
    orderBy: { createdAt: "asc" },
  });
}
