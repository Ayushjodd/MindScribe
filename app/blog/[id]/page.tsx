/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/seperator";
import {
  Twitter,
  Facebook,
  Linkedin,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import axios from "axios";
import { useParams } from "next/navigation";

interface BlogPost {
  title: string;
  author: Author;
  date: string;
  readingTime: string;
  category: string;
  content: string;
  authorBio: string;
}

interface Author {
  id: string;
  username: string;
  name: string;
  profilePicture: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
}

export default function BlogPost() {
  const [claps, setClaps] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [blogData, setBlogData] = useState<BlogPost | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`/api/blogs/${id}`);
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
                    src={`https://i.pravatar.cc/150?u=${blogData.author}`}
                    alt={blogData.author.image}
                  />
                  <AvatarFallback>{blogData.author.image}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">
                    {blogData.author.name}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{blogData.date}</span>
                    <span className="mx-2">·</span>
                    <span>{blogData.readingTime}</span>
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
                  <Button variant="ghost" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <img
                src={
                  "https://images.unsplash.com/photo-1727365179327-b69df6a52fed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
                }
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
                    {blogData.author.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {blogData.authorBio}
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
                  <h3 className="text-xl font-bold text-primary dark:text-primary-foreground mb-2">
                    MyBlog
                  </h3>
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
              <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                © 2023 MyBlog. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
