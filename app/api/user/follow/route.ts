import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Please login to perform this action", isFollowing: false },
        { status: 401 }
      );
    }

    let followingId;
    try {
      const body = await req.json();
      followingId = body.followingId;
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid request body", isFollowing: false },
        { status: 400 }
      );
    }

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

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });
      return NextResponse.json(
        { message: "Unfollowed the user successfully", isFollowing: false },
        { status: 200 }
      );
    }

    await prisma.follow.create({
      data: {
        followerId: session.user.id,
        followingId,
      },
    });

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
