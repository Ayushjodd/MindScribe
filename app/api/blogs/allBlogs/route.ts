/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //@ts-ignore
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
        author: true,
        createdAt: true,
        category: true,
        imageUrl: true,
        likes: true,
      },
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "An error occurred while fetching the blogs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
