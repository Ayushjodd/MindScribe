import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Please log in to perform this action", isFollowing: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { followingId } = body;

    if (!followingId) {
      return NextResponse.json(
        { message: "Following ID is required", isFollowing: false },
        { status: 400 }
      );
    }

    if (followingId === session.user.id) {
      return NextResponse.json(
        { message: "You cannot follow yourself", isFollowing: false },
        { status: 400 }
      );
    }

    const existingFollowing = await prisma.userFollowing.findUnique({
      where: {
        userId_followingId: {
          userId: session.user.id,
          followingId,
        },
      },
    });

    if (existingFollowing) {
      await prisma.$transaction([
        prisma.userFollowing.delete({
          where: {
            id: existingFollowing.id,
          },
        }),
        prisma.userFollowers.delete({
          where: {
            userId_followerId: {
              userId: followingId,
              followerId: session.user.id,
            },
          },
        }),
      ]);

      return NextResponse.json(
        { message: "Unfollowed the user successfully", isFollowing: false },
        { status: 200 }
      );
    }

    await prisma.$transaction([
      prisma.userFollowing.create({
        data: {
          userId: session.user.id,
          followingId: followingId,
        },
      }),
      prisma.userFollowers.create({
        data: {
          userId: followingId,
          followerId: session.user.id,
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Followed the user successfully", isFollowing: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Follow operation error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while processing your request",
        isFollowing: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
