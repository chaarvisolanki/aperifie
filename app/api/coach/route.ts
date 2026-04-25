import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCoachMessage, getCompletionCelebration } from "@/lib/ai/coach";

export async function POST(request: Request) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { type, taskTitle, streak } = await request.json();

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { streakData: true, tasks: { where: { completed: false } } },
    });

    if (!fullUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const now = new Date();
    const hour = now.getHours();
    const timeOfDay = hour < 12 ? "morning" : hour < 17 ? "afternoon" : hour < 21 ? "evening" : "night";

    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const tasksCompletedToday = await prisma.task.count({
      where: { userId: user.id, completed: true, completedAt: { gte: todayStart } },
    });

    let response;
    if (type === "celebration" && taskTitle) {
      const text = await getCompletionCelebration(taskTitle, streak || fullUser.streakData?.currentStreak || 0);
      response = { text, type: "celebration" };
    } else {
      const body = await request.json();
      response = await getCoachMessage({
        userName: fullUser.name || "there",
        currentStreak: fullUser.streakData?.currentStreak || 0,
        tasksCompletedToday,
        tasksRemaining: fullUser.tasks.length,
        timeOfDay,
        isProcrastinating: body.isProcrastinating || false,
      });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("AI Coach API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}