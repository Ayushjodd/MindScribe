/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/seperator";
import { Bookmark, MessageCircle, Feather } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import axios from "axios";
import { useParams } from "next/navigation";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import Footer from "@/components/shared/Footer";
import { useSession } from "next-auth/react";

interface BlogPost {
  title: string;
  author: Author;
  date: string;
  category: string;
  content: string;
  authorBio: string;
  imageUrl: string;
  createdAt: string;
  likes: number;
}

interface Author {
  id: string;
  username: string;
  name: string;
  profilePicture: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
  bio: string;
  twitter: string;
  linkedIn: string;
  Telegram: string;
  personalWebsite: string;
}

const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const textLength = content.split(/\s+/).length; // Split content by whitespace
  const readingTime = Math.ceil(textLength / wordsPerMinute); // Calculate reading time
  return `${readingTime} min read`;
};

export default function BlogPost() {
  const [claps, setClaps] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [blogData, setBlogData] = useState<BlogPost | null>(null);
  const { id } = useParams();
  const session: any = useSession();

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`/api/blogs/${id}`);
      //@ts-ignore
      setBlogData(data.data?.blog);
    }
    fetchData();
  }, [id]);

  if (!blogData) {
    return;
  }

  async function handleFollow() {
    if (!session?.data.user?.id) {
      console.log("User must be logged in to follow");
      return;
    }

    try {
      const response = await axios.post("/api/follow", {
        followerId: session.data.user.id,
        followingId: blogData?.author.id,
      });

      if (response.data.message.includes("Unfollowed")) {
        setIsFollowing(false);
      } else {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  }

  return (
    <>
      <div className={`min-h-screen `}>
        <div className="bg-white dark:bg-[#0e1119] text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <NavBar />
          <main className="container mx-auto px-4 py-8 max-w-3xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                {blogData?.title || ""}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <Avatar>
                  <AvatarImage
                    src={blogData.author.image}
                    alt={blogData.author.image}
                  />
                  <AvatarFallback>{blogData.author.image}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">
                    {blogData.author.name}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(blogData.createdAt).toLocaleDateString()}
                    </span>
                    <span className="mx-2">·</span>
                    <span>{calculateReadingTime(blogData.content)}</span>
                  </div>
                </div>
                <Button
                  variant={isFollowing ? "secondary" : "default"}
                  size="sm"
                  onClick={handleFollow}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <Badge variant="secondary">{blogData.category}</Badge>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.open(`https://x.com/${blogData.author.twitter}`);
                    }}
                  >
                    <BsTwitterX className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.open(`https://t.me/${blogData.author.Telegram}`);
                    }}
                  >
                    <FaTelegramPlane className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.open(blogData.author.linkedIn);
                    }}
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      window.open(blogData.author.personalWebsite);
                    }}
                  >
                    <FaLink />
                  </Button>
                </div>
              </div>

              <img
                src={blogData.imageUrl}
                alt={blogData.title}
                width={1200}
                height={600}
                className="w-full h-[400px] object-cover rounded-lg mb-8"
              />

              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blogData.content }}
              />

              <Separator className="my-8" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setClaps(claps + 1)}
                  >
                    👏 {claps}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>

              <Separator className="my-8" />

              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={blogData.author.image}
                    alt={blogData.author.image}
                  />
                  <AvatarFallback>{blogData.author.image}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    Written by {blogData.author.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {blogData.author.bio}
                  </p>
                  <Button
                    variant={isFollowing ? "secondary" : "default"}
                    size="sm"
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            </motion.article>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
