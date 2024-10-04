import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const posts = await prisma.blog.findMany({
      where: {
        authorId: String(id),
      },
    });

    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "No posts found for this user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the posts", error });
  }
}
