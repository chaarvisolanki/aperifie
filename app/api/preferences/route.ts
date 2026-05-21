import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { soundEnabled, hapticsEnabled, aiCoachEnabled } = body;

    const preferences = await prisma.userPreferences.upsert({
      where: { userId: session.user.id },
      update: {
        ...(soundEnabled !== undefined && { soundEnabled }),
        ...(hapticsEnabled !== undefined && { hapticsEnabled }),
        ...(aiCoachEnabled !== undefined && { aiCoachEnabled }),
      },
      create: {
        userId: session.user.id,
        soundEnabled: soundEnabled ?? true,
        hapticsEnabled: hapticsEnabled ?? true,
        aiCoachEnabled: aiCoachEnabled ?? true,
      },
    });

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error("Failed to update preferences:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error("Failed to fetch preferences:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
