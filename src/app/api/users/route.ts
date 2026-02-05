import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  if (!prisma) {
    return NextResponse.json([], { status: 200 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not ready" }, { status: 503 });
  }

  const { name, contact } = await req.json();

  if (!name || !contact) {
    return NextResponse.json(
      { error: "Name and Contact are required" },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({
    where: { contact },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Contact number already exists" },
      { status: 409 },
    );
  }

  const user = await prisma.user.create({
    data: { name, contact, status: "New" },
  });

  return NextResponse.json(user, { status: 201 });
}
