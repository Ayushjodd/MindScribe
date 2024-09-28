/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/db/db";
import { authOptions } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "You must be logged in to like or unlike a post" },
        { status: 401 }
      );
    }

    const { blogId } = await req.json();
    const userId = session.user.id;

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_blogId: { userId, blogId: parseInt(blogId) },
      },
    });

    let updatedBlog;

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      updatedBlog = await prisma.blog.update({
        where: { id: parseInt(blogId) },
        data: { likes: { decrement: 1 } },
      });

      return NextResponse.json(
        {
          message: "Blog unliked successfully",
          likes: updatedBlog.likes,
          liked: false,
        },
        { status: 200 }
      );
    } else {
      await prisma.like.create({
        data: {
          userId,
          blogId: parseInt(blogId),
        },
      });

      updatedBlog = await prisma.blog.update({
        where: { id: parseInt(blogId) },
        data: { likes: { increment: 1 } },
      });

      return NextResponse.json(
        {
          message: "Blog liked successfully",
          likes: updatedBlog.likes,
          liked: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { message: "Error toggling like" },
      { status: 500 }
    );
  }
}
