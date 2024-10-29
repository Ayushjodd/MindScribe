/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unathorized",
        },
        { status: 401 }
      );
    }

    const { id } = context.params;
    const blogId = Number(id);

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      select: {
        id: true,
        title: true,
        description: true,
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
        content: true,
        authorId: true,
        createdAt: true,
        likes: true,
        likedBy: true,
        category: true,
        imageUrl: true,
      },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
