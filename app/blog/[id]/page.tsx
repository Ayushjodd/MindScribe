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

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`/api/blogs/${id}`);
      console.log(data);
      //@ts-ignore
      setBlogData(data.data?.blog);
    }
    fetchData();
  }, [id]);

  if (!blogData) {
    return <p>Loading...</p>;
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
                  onClick={() => setIsFollowing(!isFollowing)}
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
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            </motion.article>
          </main>

          <footer className="bg-gray-100 dark:bg-gray-800 mt-12 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <Link className="flex items-center" href="#">
                    <Feather className="h-8 w-8 text-primary" />
                    <span className="ml-2 text-xl font-bold text-primary">
                      MindScribe
                    </span>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Exploring ideas, one post at a time.
                  </p>
                </div>
                <nav className="flex space-x-4">
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground"
                  >
                    Contact Us
                  </Link>
                </nav>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
