/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Please login to perform this action",
        },
        { status: 401 }
      );
    }

    const { followingId } = await req.json();

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
        {
          message: "Unfollowed the user successfully.",
        },
        { status: 200 }
      );
    } else {
      await prisma.follow.create({
        data: {
          followerId: session.user.id,
          followingId,
        },
      });

      return NextResponse.json(
        {
          message: "Followed the user successfully.",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "An error occurred while processing your request",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
