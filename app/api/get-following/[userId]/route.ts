import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const following = await prisma.follow.findMany({
      where: {
        followerId: String(userId),
      },
      include: {
        following: true,
      },
    });

    return NextResponse.json(following, { status: 200 });
  } catch (error) {
    console.error("Error fetching following list:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Error fetching following list" },
      { status: 500 }
    );
  }
}
