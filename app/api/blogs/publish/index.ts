/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Fetch the session, passing both the request and authOptions
    const session = await getServerSession(req, authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please sign in to create a blog.",
        },
        { status: 401 }
      );
    }

    const userId = session.user.id; // Assuming your session object includes the user ID

    // Parse the request body
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

    // Validate required fields
    if (!title || !description || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Create a new blog post
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        content,
        published,
        author: { connect: { id: userId } }, // Use 'connect' to link to the existing User
      },
    });

    // Return a success response
    return NextResponse.json({
      success: true,
      message: "Blog created successfully.",
      blog, // Optionally return the created blog
    });
  } catch (e) {
    console.error("Error creating blog:", e);
    return NextResponse.json(
      { success: false, message: "Failed to create blog. Please try again." },
      { status: 500 }
    );
  }
}
