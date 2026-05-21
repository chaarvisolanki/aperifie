import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const fullUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { preferences: true, streakData: { include: { history: { orderBy: { date: "desc" } } } } },
    });

    if (!fullUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      user: { id: fullUser.id, name: fullUser.name, email: fullUser.email, avatar: fullUser.avatar, focusScore: fullUser.focusScore, preferences: fullUser.preferences },
      streakData: fullUser.streakData ? {
        current: fullUser.streakData.currentStreak,
        longest: fullUser.streakData.longestStreak,
        freezesAvailable: fullUser.streakData.freezesAvailable,
        history: fullUser.streakData.history,
      } : null,
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}