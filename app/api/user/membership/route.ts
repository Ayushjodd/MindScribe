"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/db/db";
import { NextResponse } from "next/server";

const MEMBERSHIP_PRICES = {
  BASIC: 299,
  ADVANCE: 799,
  PRO: 1499,
};

type PaymentMethod = "upi" | "solana";

interface MembershipUpdateRequest {
  userId: string;
  membershipType: "BASIC" | "ADVANCE" | "PRO";
  paymentMethod: PaymentMethod;
  transactionId?: string;
}

export async function PUT(request: Request) {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Please login to access this content" },
        { status: 401 }
      );
    }

    const body: MembershipUpdateRequest = await request.json();
    const { userId, membershipType, paymentMethod, transactionId } = body;

    if (!userId || !membershipType || !paymentMethod) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: userId, membershipType, or paymentMethod",
        },
        { status: 400 }
      );
    }

    if (!Object.keys(MEMBERSHIP_PRICES).includes(membershipType)) {
      return NextResponse.json(
        { message: "Invalid membership type" },
        { status: 400 }
      );
    }

    if (!["upi", "solana"].includes(paymentMethod)) {
      return NextResponse.json(
        { message: "Invalid payment method" },
        { status: 400 }
      );
    }

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const existingMembership = await prisma.membership.findUnique({
      where: {
        userId: userId,
      },
    });

    let updatedMembership;

    if (existingMembership) {
      updatedMembership = await prisma.membership.update({
        where: {
          userId: userId,
        },
        data: {
          type: membershipType,
          startDate: new Date(),
          endDate: endDate,
          updatedAt: new Date(),
        },
      });
    } else {
      updatedMembership = await prisma.membership.create({
        data: {
          userId: userId,
          type: membershipType,
          startDate: new Date(),
          endDate: endDate,
        },
      });
    }

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        membership: true,
      },
    });

    return NextResponse.json(
      {
        message: "Membership updated successfully",
        user: updatedUser,
        membership: updatedMembership,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating membership:", error);
    return NextResponse.json(
      {
        message: "An error occurred while updating membership",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
