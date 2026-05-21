import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { calculateCognitiveLoad, trackTaskCompletion, getOptimalTaskTimes } from "@/lib/analytics/cognitive-load";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cognitiveLoad = await calculateCognitiveLoad(session.user.id);
    const optimalTimes = await getOptimalTaskTimes(session.user.id);

    return NextResponse.json({
      ...cognitiveLoad,
      optimalTimes: optimalTimes.slice(0, 3), // Top 3 hours
    });
  } catch (error) {
    console.error("Failed to get cognitive load:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Track task completion when a task is completed
    // This would typically be called from the task completion endpoint
    // but we provide an endpoint for explicit tracking
    const { estimatedMinutes } = await new Response().json().catch(() => ({ estimatedMinutes: 30 }));

    await trackTaskCompletion(session.user.id, estimatedMinutes || 30);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track completion:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
