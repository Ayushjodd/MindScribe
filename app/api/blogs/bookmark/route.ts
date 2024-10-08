import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    //@ts-ignore

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "You must be logged in to bookmark or unbookmark a post" },
        { status: 401 }
      );
    }

    const { blogId } = await req.json();

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_blogId: { userId, blogId: parseInt(blogId) },
      },
    });

    let updatedBlog;

    if (existingBookmark) {
      // If bookmark exists, remove it
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });

      return NextResponse.json({
        message: "Bookmark removed successfully",
        blog: updatedBlog,
      });
    } else {
      // If bookmark doesn't exist, create it
      const newBookmark = await prisma.bookmark.create({
        data: {
          userId,
          blogId: parseInt(blogId),
        },
      });

      updatedBlog = await prisma.blog.update({
        where: { id: parseInt(blogId) },
        data: {
          bookmarks: {
            connect: { id: newBookmark.id },
          },
        },
        include: {
          bookmarks: true,
        },
      });

      return NextResponse.json({
        message: "Bookmark added successfully",
        blog: updatedBlog,
      });
    }
  } catch (error) {
    console.error("Error in bookmark API:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.log("Unauthorized access attempt");
      return NextResponse.json(
        { message: "You must be logged in to view your bookmarks" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    console.log("Fetching bookmarks for user:", userId);

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
      include: {
        blog: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            createdAt: true,
            category: true,
            author: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    console.log(`Found ${bookmarks.length} bookmarks for user ${userId}`);

    // Restructure the bookmarks to the format your frontend expects
    const formattedBookmarks = bookmarks.map((bookmark) => ({
      id: bookmark.blog.id,
      title: bookmark.blog.title,
      excerpt: bookmark.blog.description, // Assuming 'description' is equivalent to 'excerpt'
      image: bookmark.blog.imageUrl, // Ensure the field matches your frontend's 'image'
      author: bookmark.blog.author.name,
      date: bookmark.blog.createdAt.toISOString(), // Convert date to string format
      category: bookmark.blog.category, // You can modify this if you have categories
    }));

    return NextResponse.json({
      message: "Bookmarks retrieved successfully",
      bookmarks: formattedBookmarks, // Return structured data
    });
  } catch (error: any) {
    console.error("Detailed error in get bookmarks API:", error.message);
    return NextResponse.json(
      {
        message: "An error occurred while retrieving your bookmarks",
        error: "something bad occurred",
      },
      { status: 500 }
    );
  }
}
