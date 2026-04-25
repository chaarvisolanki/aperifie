import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tasks = await prisma.task.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, description, priority, category, deadline, estimatedMinutes, flowTag } = await request.json();
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const task = await prisma.task.create({
      data: { title, description, priority: priority || "medium", category: category || "Personal", deadline: deadline ? new Date(deadline) : null, estimatedMinutes, flowTag, userId: user.id },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Failed to create task:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}