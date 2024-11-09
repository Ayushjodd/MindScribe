"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextResponse } from "next/server";
import Error from "next/error";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Please login to access this content",
        },
        { status: 401 }
      );
    }

    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            profilePicture: true,
            membership: {
              select: {
                type: true,
              },
            },
          },
        },
        createdAt: true,
        category: true,
        imageUrl: true,
        likes: true,
      },
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "An error occurred while fetching the blogs",
      },
      { status: 500 }
    );
  }
}
