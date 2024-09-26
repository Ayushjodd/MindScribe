"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please sign in to create a blog.",
        },
        { status: 401 }
      );
    }

    const email = session.user.email;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to identify the user.",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    const userId = user.id;

    const {
      title,
      description,
      content,
      published,
    }: {
      title: string;
      description: string;
      content: string;
      published: boolean;
    } = await req.json();

    if (!title || !description || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        content,
        published,
        author: { connect: { id: userId } },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Blog created successfully.",
      blog,
    });
  } catch (e) {
    console.error("Error creating blog:", e);
    return NextResponse.json(
      { success: false, message: "Failed to create blog. Please try again." },
      { status: 500 }
    );
  }
}
