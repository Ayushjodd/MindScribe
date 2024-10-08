import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

export async function POST(req: NextRequest) {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    if (!email) {
      return NextResponse.json(
        { message: "can not find user" },
        { status: 500 }
      );
    }
    const {
      twitter,
      linkedIn,
      personalWebsite,
      Telegram,
      bio,
      profilePicture,
    }: {
      twitter: string;
      linkedIn: string;
      personalWebsite: string;
      Telegram: string;
      bio: string;
      profilePicture: string;
    } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        twitter,
        linkedIn,
        personalWebsite,
        Telegram,
        bio,
        profilePicture,
      },
    });

    return NextResponse.json(
      { message: "Profile updated", updatedUser },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
