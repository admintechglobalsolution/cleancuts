import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "asc" },
        });

        console.log("GET /api/users returning:", users);

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 },
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, contact } = body;

        if (!name || !contact) {
            return NextResponse.json(
                { error: "Name and Contact are required" },
                { status: 400 }
            );
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                contact,
                status: "New",
            },
        });

        return NextResponse.json(newUser);
    } catch (error) {
        console.error("CREATE USER ERROR:", error);
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
}
