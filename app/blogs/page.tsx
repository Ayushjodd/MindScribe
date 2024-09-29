/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Heart, MessageCircle, Search } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

interface Author {
  id: string;
  username: string;
  name: string;
  profilePicture: string;
}

interface Blog {
  id: string;
  title: string;
  description: string;
  author: Author;
  createdAt: string;
  likes: number;
  category: string;
  imageUrl: string;
}

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      toast.error("Login required");
    }
  }, [session, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/blogs/allBlogs");
        console.log(response);
        if (response.status === 200) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        toast.error("Error fetching blogs");
      }
    }
    fetchData();
  }, []);

  const handleLike = async (blogId: string, index: number) => {
    try {
      const response = await axios.post("/api/blogs/like", { blogId });
      if (response.status === 200) {
        const updatedBlogs = [...blogs];
        updatedBlogs[index].likes = response.data.likes;
        setBlogs(updatedBlogs);
        toast.success("Liked!");
      }
    } catch (error) {
      toast.error("Error liking the blog");
    }
  };

  if (status === "loading") {
    return null;
  }

  const filteredPosts = blogs.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Toaster />
      <NavBar />
      <div className="container mx-auto px-4 py-8 ">
        <motion.h1
          className="text-4xl mb-8 text-center pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Blogs
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search blogs by title or description..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`overflow-hidden ${index === 0 ? "lg:flex" : ""}`}
              >
                <div className={`${index === 0 ? "lg:w-2/3" : "w-full"}`}>
                  <div className="w-full h-64  flex items-center justify-center text-gray-500">
                    <img src={post.imageUrl || ""} />
                  </div>
                </div>
                <div className={`${index === 0 ? "lg:w-1/3" : "w-full"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={
                            post.author.profilePicture ||
                            `https://i.pravatar.cc/150?u=${post.author.id}`
                          }
                          alt={post.author.name || post.author.username}
                        />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {post.author.name || post.author.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                      {/* Like Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id, index)}
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes} {/* Display the current likes count */}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />0
                        {/* Placeholder for comments */}
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Link href={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
