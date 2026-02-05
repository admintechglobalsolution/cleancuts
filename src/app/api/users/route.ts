import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, contact } = await req.json();

    if (!name || !contact) {
      return NextResponse.json(
        { error: "Name and Contact are required" },
        { status: 400 },
      );
    }

    if (!/^\d{10}$/.test(contact)) {
      return NextResponse.json(
        { error: "Contact must be exactly 10 digits" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { contact },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Contact number already exists" },
        { status: 409 },
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        contact,
        status: "New",
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
