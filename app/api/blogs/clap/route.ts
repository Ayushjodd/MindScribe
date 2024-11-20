import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { blogId } = await request.json();
    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.update({
      where: {
        id: parseInt(blogId),
      },
      data: {
        claps: {
          increment: 1,
        },
      },
      select: {
        id: true,
        claps: true,
      },
    });

    return NextResponse.json(
      { message: "clap registered", claps: blog.claps },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating claps:", error);
    return NextResponse.json(
      { message: "An error occurred while updating claps" },
      { status: 500 }
    );
  }
}
