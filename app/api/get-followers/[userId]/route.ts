"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;
  console.log(userId);

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: true,
      },
    });

    return NextResponse.json(followers, { status: 200 });
  } catch (error) {
    console.error("Error fetching followers:", error);
    return NextResponse.json(
      { error: "Error fetching followers" },
      { status: 500 }
    );
  }
}
