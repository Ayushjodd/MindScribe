"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
export async function GET(
  req: NextRequest,
  { params }: { params: { authorId: string } }
) {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { authorId } = params;

    if (!authorId) {
      return NextResponse.json(
        { message: "Author ID is required" },
        { status: 400 }
      );
    }

    const author = await prisma.user.findUnique({
      where: { id: authorId },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        imageUrl: true,
        profilePicture: true,
        bio: true,
        twitter: true,
        linkedIn: true,
        personalWebsite: true,
        Telegram: true,
        posts: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            description: true,
            content: true,
            published: true,
            createdAt: true,
            likes: true,
            category: true,
            likedBy: {
              select: {
                userId: true,
              },
            },
            bookmarks: {
              select: {
                userId: true,
              },
            },
          },
        },
        likes: {
          select: {
            blog: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
                description: true,
              },
            },
          },
        },
        bookmarks: {
          select: {
            blog: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
                description: true,
              },
            },
          },
        },
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                name: true,
                username: true,
                imageUrl: true,
              },
            },
          },
        },
        following: {
          select: {
            following: {
              select: {
                id: true,
                name: true,
                username: true,
                imageUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            posts: true,
            likes: true,
            bookmarks: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!author) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 }
      );
    }

    const responseData = {
      ...author,
      followers: author.followers.map((f) => f.follower),
      following: author.following.map((f) => f.following),
      likes: author.likes.map((l) => l.blog),
      bookmarks: author.bookmarks.map((b) => b.blog),
      stats: author._count,
    };

    const { _count, ...authorDataWithoutCount } = responseData;
    return NextResponse.json(authorDataWithoutCount, { status: 200 });
  } catch (error) {
    console.error("Error fetching author details:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the author details" },
      { status: 500 }
    );
  }
}
