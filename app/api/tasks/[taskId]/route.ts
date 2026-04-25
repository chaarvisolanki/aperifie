import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { taskId } = await params;
    const updates = await request.json();

    if (updates.completed === true) {
      const task = await prisma.task.findUnique({ where: { id: taskId }, include: { user: { include: { streakData: true } } } });
      if (task?.user?.streakData) {
        const today = new Date().toISOString().split("T")[0];
        const lastDate = task.user.streakData.lastCompletedDate?.toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        let newStreak = task.user.streakData.currentStreak;

        if (lastDate !== today) {
          if (lastDate === yesterday || lastDate === null) newStreak = task.user.streakData.currentStreak + 1;
          else newStreak = 1;

          await prisma.streakData.update({
            where: { userId: user.id },
            data: { currentStreak: newStreak, longestStreak: Math.max(newStreak, task.user.streakData.longestStreak), lastCompletedDate: new Date() },
          });

          await prisma.streakHistory.upsert({
            where: { streakDataId_date: { streakDataId: task.user.streakData.id, date: today } },
            create: { streakDataId: task.user.streakData.id, date: today, completed: 1 },
            update: { completed: { increment: 1 } },
          });
        }
      }
    }

    const task = await prisma.task.update({ where: { id: taskId, userId: user.id }, data: { ...updates, completedAt: updates.completed ? new Date() : undefined } });
    return NextResponse.json(task);
  } catch (error) {
    console.error("Failed to update task:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { taskId } = await params;
    await prisma.task.delete({ where: { id: taskId, userId: user.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete task:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}