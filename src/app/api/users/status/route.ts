import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not ready" }, { status: 503 });
  }

  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 },
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updatedUser);
}
