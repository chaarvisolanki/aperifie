import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { preferences: true, streakData: { include: { history: { orderBy: { date: "desc" }, take: 7 } } } },
    });

    if (!fullUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      user: { id: fullUser.id, name: fullUser.name, email: fullUser.email, avatar: fullUser.avatar, preferences: fullUser.preferences },
      streakData: fullUser.streakData,
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}